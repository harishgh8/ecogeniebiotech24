import { connectDB } from '../../../utils/db';
import Order from '../../../models/Order';
import { verifyPayment } from '../../../utils/razorpay';
import { sendOrderConfirmation } from '../../../utils/emailService';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

        // Verify payment signature
        const verificationResponse = verifyPayment(
            razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature
        );

        if (!verificationResponse.success) {
            throw new Error(verificationResponse.error || 'Payment verification failed');
        }

        await connectDB();

        // Update order status
        const order = await Order.findOne({ orderId });
        if (!order) {
            throw new Error('Order not found');
        }

        order.payment.status = 'completed';
        order.payment.transactionId = razorpayPaymentId;
        order.status = 'processing';
        await order.save();

        // Send order confirmation email
        await sendOrderConfirmation(order);

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error verifying payment:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Error verifying payment'
        });
    }
}
