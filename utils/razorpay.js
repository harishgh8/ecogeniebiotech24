import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (amount) => {
    try {
        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100), // amount in paisa
            currency: 'INR',
            payment_capture: 1,
        });
        return { success: true, order };
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        return { success: false, error };
    }
};

export const verifyPayment = (razorpayOrderId, razorpayPaymentId, razorpaySignature) => {
    try {
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpayOrderId + '|' + razorpayPaymentId)
            .digest('hex');

        if (generated_signature === razorpaySignature) {
            return { success: true };
        }
        return { success: false, error: 'Invalid signature' };
    } catch (error) {
        console.error('Error verifying payment:', error);
        return { success: false, error };
    }
};
