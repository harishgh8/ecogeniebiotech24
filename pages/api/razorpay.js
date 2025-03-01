import Razorpay from 'razorpay';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({ error: 'Amount is required' });
        }

        const options = {
            amount: amount,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        console.log('Razorpay order created:', order);

        res.status(200).json(order);
    } catch (error) {
        console.error('Razorpay order creation error:', error);
        res.status(500).json({ error: 'Error creating order' });
    }
}
