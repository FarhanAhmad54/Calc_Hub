/**
 * Contact Route - Handles contact form submissions
 * Sends emails using Nodemailer
 */

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');

// Email configuration
const RECIPIENT_EMAIL = 'farhan056ahmad@gmail.com';

// Create transporter for sending emails
// For production, use a proper email service like SendGrid, Mailgun, or Gmail
const createTransporter = () => {
    // Check if email credentials are configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        return nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    // Fallback: Use Ethereal for testing (emails won't actually be delivered)
    return null;
};

// Validation middleware
const validateContact = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('subject')
        .trim()
        .notEmpty().withMessage('Subject is required')
        .isLength({ min: 3, max: 200 }).withMessage('Subject must be 3-200 characters'),
    body('message')
        .trim()
        .notEmpty().withMessage('Message is required')
        .isLength({ min: 10, max: 5000 }).withMessage('Message must be 10-5000 characters')
];

// POST /api/contact - Handle contact form submission
router.post('/', validateContact, async (req, res) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: errors.array()[0].msg
            });
        }

        const { name, email, subject, message } = req.body;

        // Create email content
        const emailContent = {
            from: process.env.EMAIL_USER || 'noreply@calchub.com',
            to: RECIPIENT_EMAIL,
            subject: `[CalcHub Contact] ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">🧮 CalcHub Contact Form</h1>
                    </div>
                    <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <h2 style="color: #333; margin-top: 0;">New Contact Message</h2>
                        
                        <div style="margin-bottom: 20px;">
                            <strong style="color: #667eea;">From:</strong>
                            <p style="margin: 5px 0; color: #555;">${name}</p>
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <strong style="color: #667eea;">Email:</strong>
                            <p style="margin: 5px 0; color: #555;"><a href="mailto:${email}">${email}</a></p>
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <strong style="color: #667eea;">Subject:</strong>
                            <p style="margin: 5px 0; color: #555;">${subject}</p>
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <strong style="color: #667eea;">Message:</strong>
                            <div style="margin: 5px 0; color: #555; background: #f5f5f5; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${message}</div>
                        </div>
                        
                        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                        
                        <p style="color: #999; font-size: 12px; margin: 0;">
                            This message was sent from the CalcHub contact form.<br>
                            Received at: ${new Date().toLocaleString()}
                        </p>
                    </div>
                </div>
            `,
            text: `
CalcHub Contact Form Submission
================================

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

--------------------------------
Received at: ${new Date().toLocaleString()}
            `
        };

        // Try to send email
        const transporter = createTransporter();

        if (transporter) {
            await transporter.sendMail(emailContent);
            console.log(`✅ Contact email sent successfully from ${email}`);
        } else {
            // If no email config, just log the message (for development/testing)
            console.log('📧 Contact form submission received (email not configured):');
            console.log('-------------------------------------------');
            console.log(`From: ${name} <${email}>`);
            console.log(`Subject: ${subject}`);
            console.log(`Message: ${message}`);
            console.log('-------------------------------------------');
        }

        res.json({
            success: true,
            message: 'Your message has been sent successfully!'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to send message. Please try again later.'
        });
    }
});

module.exports = router;
