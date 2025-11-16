import { AxiosResponse } from 'axios';
import api from '../lib/api';

interface PaymentOrderResponse {
  success: boolean;
  message: string;
  data: {
    orderId: string;
    amount: number;
    currency: string;
    eventTitle: string;
    eventPrice: number;
  };
}

interface PaymentVerificationResponse {
  success: boolean;
  message: string;
  data: {
    paymentId: string;
    orderId: string;
  };
}

interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  emergencyContact: string;
  specialRequirements?: string;
}

export const paymentService = {
  createOrder: async (eventId: string, registrationData: RegistrationData): Promise<PaymentOrderResponse> => {
    const response: AxiosResponse = await api.post('/payment/create-order', {
      eventId,
      registrationData,
    });
    return response.data;
  },

  verifyPayment: async (paymentData: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    eventId: string;
    registrationData: RegistrationData;
  }): Promise<PaymentVerificationResponse> => {
    const response: AxiosResponse = await api.post('/payment/verify', paymentData);
    return response.data;
  },
};

export default paymentService;