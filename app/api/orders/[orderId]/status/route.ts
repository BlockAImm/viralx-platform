import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { twitterApi } from '@/lib/twitter-api';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    // Verify authentication
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // Get order
    const order = await prisma.order.findFirst({
      where: {
        id: params.orderId,
        userId: decoded.userId,
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // If order has external ID, check status with Twitter API
    if (order.externalId && order.status === 'PROCESSING') {
      try {
        const twitterStatus = await twitterApi.getOrderStatus(order.externalId);
        
        // Update order status if completed
        if (twitterStatus.completed) {
          await prisma.order.update({
            where: { id: order.id },
            data: { status: 'COMPLETED' },
          });
          order.status = 'COMPLETED';
        }
      } catch (error) {
        console.error('Twitter API status check error:', error);
      }
    }

    return NextResponse.json({
      orderId: order.id,
      status: order.status,
      service: order.service,
      quantity: order.quantity,
      price: order.price,
      createdAt: order.createdAt,
    });
  } catch (error) {
    console.error('Order status error:', error);
    return NextResponse.json({ error: 'Failed to get order status' }, { status: 500 });
  }
}