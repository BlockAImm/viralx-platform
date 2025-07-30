import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { twitterApi } from '@/lib/twitter-api';
import { calculatePrice } from '@/lib/pricing';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: NextRequest) {
  try {
    // Verify authentication
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    const { service, link, quantity, currency, txHash } = await req.json();

    // Validate input
    if (!service || !link || !quantity || !currency) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get user with discount tier
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Calculate price
    const price = calculatePrice(service as any, quantity, user.discountTier);

    // Create order in database
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        service,
        link,
        quantity,
        price,
        currency,
        txHash,
        status: 'PENDING',
      },
    });

    // Call Twitter API
    try {
      const twitterResponse = await twitterApi.createAction({
        service: service as any,
        link,
        quantity,
      });

      // Update order with external ID
      await prisma.order.update({
        where: { id: order.id },
        data: {
          externalId: twitterResponse.order_id,
          status: 'PROCESSING',
        },
      });

      return NextResponse.json({
        orderId: order.id,
        externalId: twitterResponse.order_id,
        status: 'PROCESSING',
      });
    } catch (twitterError) {
      // Update order status to failed
      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'FAILED' },
      });

      throw twitterError;
    }
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // Verify authentication
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // Get user's orders
    const orders = await prisma.order.findMany({
      where: { userId: decoded.userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}