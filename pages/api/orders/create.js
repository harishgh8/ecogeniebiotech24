import { connectDB } from '../../../utils/db';
import Order from '../../../models/Order';
import { createOrder as createRazorpayOrder } from '../../../utils/razorpay';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        await connectDB();

        // Create order in database
        const order = new Order(req.body);
        await order.save();

        // Create Razorpay order
        const razorpayResponse = await createRazorpayOrder(order.total);
        if (!razorpayResponse.success) {
            throw new Error(razorpayResponse.error || 'Failed to create Razorpay order');
        }

        // Update order with Razorpay order ID
        order.payment.transactionId = razorpayResponse.order.id;
        await order.save();

        return res.status(200).json({
            success: true,
            orderId: order.orderId,
            razorpayOrderId: razorpayResponse.order.id
        });
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Error creating order'
        });
    }
}
