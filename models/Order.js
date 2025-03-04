import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    items: [{
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
    }],
    shippingMethod: {
        type: String,
        enum: ['standard', 'express'],
        required: true
    },
    payment: {
        transactionId: String,
        method: String,
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            default: 'pending'
        },
        amount: Number
    },
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Generate unique order ID
orderSchema.pre('save', async function(next) {
    if (this.isNew) {
        const date = new Date();
        const year = date.getFullYear().toString().substr(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const count = await mongoose.model('Order').countDocuments();
        this.orderId = `ECO-${year}${month}-${(count + 1).toString().padStart(4, '0')}`;
    }
    this.updatedAt = new Date();
    next();
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
