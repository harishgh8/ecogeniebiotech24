import { connectDB } from '../../../utils/db';
import Order from '../../../models/Order';

export default async function handler(req, res) {
    const { id } = req.query;

    try {
        await connectDB();

        switch (req.method) {
            case 'GET':
                const order = await Order.findOne({ orderId: id });
                if (!order) {
                    return res.status(404).json({ success: false, error: 'Order not found' });
                }
                return res.status(200).json({ success: true, order });

            case 'PUT':
                // Only allow updating certain fields
                const allowedUpdates = ['status', 'shippingAddress'];
                const updates = Object.keys(req.body)
                    .filter(key => allowedUpdates.includes(key))
                    .reduce((obj, key) => {
                        obj[key] = req.body[key];
                        return obj;
                    }, {});

                const updatedOrder = await Order.findOneAndUpdate(
                    { orderId: id },
                    { $set: updates },
                    { new: true }
                );

                if (!updatedOrder) {
                    return res.status(404).json({ success: false, error: 'Order not found' });
                }

                return res.status(200).json({ success: true, order: updatedOrder });

            default:
                return res.status(405).json({ success: false, error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Error handling order:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Error handling order'
        });
    }
}
