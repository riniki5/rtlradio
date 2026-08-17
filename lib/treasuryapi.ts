import axios from 'axios'

const TREASURYAPI_BASE_URL = 'https://api.treasuryapi.com' // Replace with actual API URL
const API_KEY = process.env.TREASURYAPI_KEY

interface PaymentRequest {
  amount: number
  currency: string
  description: string
  userId: string
  username: string
}

interface PaymentResponse {
  success: boolean
  paymentId?: string
  error?: string
}

export class TreasuryAPI {
  private static instance: TreasuryAPI

  private constructor() {}

  public static getInstance(): TreasuryAPI {
    if (!TreasuryAPI.instance) {
      TreasuryAPI.instance = new TreasuryAPI()
    }
    return TreasuryAPI.instance
  }

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    }
  }

  /**
   * Create a payment request for advertisement
   */
  async createAdvertisementPayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await axios.post(
        `${TREASURYAPI_BASE_URL}/payments/advertisement`,
        paymentData,
        { headers: this.getHeaders() }
      )
      
      return {
        success: true,
        paymentId: response.data.paymentId,
      }
    } catch (error: any) {
      console.error('TreasuryAPI payment error:', error)
      return {
        success: false,
        error: error.response?.data?.message || 'Payment processing failed',
      }
    }
  }

  /**
   * Check payment status
   */
  async getPaymentStatus(paymentId: string): Promise<{ success: boolean; status?: string; error?: string }> {
    try {
      const response = await axios.get(
        `${TREASURYAPI_BASE_URL}/payments/${paymentId}/status`,
        { headers: this.getHeaders() }
      )
      
      return {
        success: true,
        status: response.data.status,
      }
    } catch (error: any) {
      console.error('TreasuryAPI status check error:', error)
      return {
        success: false,
        error: error.response?.data?.message || 'Status check failed',
      }
    }
  }

  /**
   * Get user balance
   */
  async getUserBalance(userId: string): Promise<{ success: boolean; balance?: number; error?: string }> {
    try {
      const response = await axios.get(
        `${TREASURYAPI_BASE_URL}/users/${userId}/balance`,
        { headers: this.getHeaders() }
      )
      
      return {
        success: true,
        balance: response.data.balance,
      }
    } catch (error: any) {
      console.error('TreasuryAPI balance check error:', error)
      return {
        success: false,
        error: error.response?.data?.message || 'Balance check failed',
      }
    }
  }

  /**
   * Process refund (admin only)
   */
  async processRefund(paymentId: string, reason: string): Promise<{ success: boolean; error?: string }> {
    try {
      await axios.post(
        `${TREASURYAPI_BASE_URL}/payments/${paymentId}/refund`,
        { reason },
        { headers: this.getHeaders() }
      )
      
      return { success: true }
    } catch (error: any) {
      console.error('TreasuryAPI refund error:', error)
      return {
        success: false,
        error: error.response?.data?.message || 'Refund processing failed',
      }
    }
  }
}

export default TreasuryAPI.getInstance()
