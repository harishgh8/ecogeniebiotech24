import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export const sendOrderConfirmation = async (order) => {
    const {
        orderId,
        user,
        items,
        shippingAddress,
        shippingMethod,
        subtotal,
        shippingCost,
        tax,
        total,
    } = order;

    const itemsList = items
        .map(
            (item) =>
                `<tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">₹${item.price.toFixed(2)}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">₹${(item.price * item.quantity).toFixed(2)}</td>
                </tr>`
        )
        .join('');

    const emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #10B981; text-align: center;">Order Confirmation</h1>
            <p>Dear ${user.name},</p>
            <p>Thank you for your order! Here are your order details:</p>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 5px; margin: 20px 0;">
                <h2 style="color: #374151; margin-top: 0;">Order #${orderId}</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: #e5e7eb;">
                            <th style="padding: 10px; text-align: left;">Item</th>
                            <th style="padding: 10px; text-align: left;">Quantity</th>
                            <th style="padding: 10px; text-align: left;">Price</th>
                            <th style="padding: 10px; text-align: left;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsList}
                    </tbody>
                </table>
                
                <div style="margin-top: 20px; border-top: 2px solid #e5e7eb; padding-top: 20px;">
                    <p style="display: flex; justify-content: space-between;">
                        <span>Subtotal:</span>
                        <span>₹${subtotal.toFixed(2)}</span>
                    </p>
                    <p style="display: flex; justify-content: space-between;">
                        <span>Shipping (${shippingMethod}):</span>
                        <span>₹${shippingCost.toFixed(2)}</span>
                    </p>
                    <p style="display: flex; justify-content: space-between;">
                        <span>Tax:</span>
                        <span>₹${tax.toFixed(2)}</span>
                    </p>
                    <p style="display: flex; justify-content: space-between; font-weight: bold;">
                        <span>Total:</span>
                        <span>₹${total.toFixed(2)}</span>
                    </p>
                </div>
            </div>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 5px; margin: 20px 0;">
                <h3 style="color: #374151; margin-top: 0;">Shipping Address</h3>
                <p style="margin: 0;">
                    ${shippingAddress.street}<br>
                    ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postalCode}<br>
                    ${shippingAddress.country}
                </p>
            </div>
            
            <p>We'll send you another email when your order ships.</p>
            
            <div style="text-align: center; margin-top: 30px; color: #6B7280; font-size: 14px;">
                <p>If you have any questions, please contact our support team.</p>
                <p>© ${new Date().getFullYear()} Ecogenie Biotech. All rights reserved.</p>
            </div>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: process.env.SMTP_FROM_EMAIL,
            to: user.email,
            subject: `Order Confirmation - #${orderId}`,
            html: emailContent,
        });
        return { success: true };
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
        return { success: false, error };
    }
};
