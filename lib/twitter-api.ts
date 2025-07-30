import axios from 'axios';

const TWITTER_API_URL = process.env.TWITTER_API_URL!;
const TWITTER_API_KEY = process.env.TWITTER_API_KEY!;

export interface TwitterActionRequest {
  service: 'likes' | 'retweets' | 'views' | 'bookmarks' | 'followers';
  link: string;
  quantity: number;
}

export interface TwitterActionResponse {
  order_id: string;
  status: string;
  message?: string;
}

export interface OrderStatusResponse {
  order_id: string;
  status: string;
  progress?: number;
  completed?: boolean;
}

export const twitterApi = {
  async createAction(data: TwitterActionRequest): Promise<TwitterActionResponse> {
    try {
      const response = await axios.post(
        `${TWITTER_API_URL}/twitter-action`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${TWITTER_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Twitter API Error:', error);
      throw error;
    }
  },

  async getOrderStatus(orderId: string): Promise<OrderStatusResponse> {
    try {
      const response = await axios.get(
        `${TWITTER_API_URL}/order-status?order_id=${orderId}`,
        {
          headers: {
            'Authorization': `Bearer ${TWITTER_API_KEY}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Twitter API Error:', error);
      throw error;
    }
  },

  async getBalance(): Promise<{ balance: number }> {
    try {
      const response = await axios.get(
        `${TWITTER_API_URL}/balance`,
        {
          headers: {
            'Authorization': `Bearer ${TWITTER_API_KEY}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Twitter API Error:', error);
      throw error;
    }
  },
};