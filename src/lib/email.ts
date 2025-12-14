// Email service for beta invitations and notifications
import nodemailer from 'nodemailer';

interface BetaInvitationData {
  email: string;
  name: string;
  company: string;
  invitationToken: string;
  betaTier: string;
}

interface FeedbackNotificationData {
  email: string;
  name: string;
  feedbackCount: number;
  averageRating: number;
}

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export async function sendBetaInvitation(data: BetaInvitationData) {
  const transporter = createTransporter();
  
  const invitationUrl = `${process.env.NEXTAUTH_URL}/beta/accept?token=${data.invitationToken}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>OMGsystems Beta Invitation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; }
        .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .beta-badge { background: #fbbf24; color: #92400e; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 You're Invited to OMGsystems Beta!</h1>
          <p>Help shape the future of business automation</p>
        </div>
        
        <div class="content">
          <h2>Hi ${data.name},</h2>
          
          <p>We're excited to invite you to participate in the <strong>OMGsystems Beta Program</strong>!</p>
          
          <p>As a beta tester, you'll get early access to our revolutionary business automation platform and have the opportunity to influence its development.</p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>🎯 What You'll Get:</h3>
            <ul>
              <li><strong>Early Access:</strong> Be among the first to experience our automation platform</li>
              <li><strong>Direct Impact:</strong> Your feedback will shape the final product</li>
              <li><strong>Priority Support:</strong> Dedicated support during the beta period</li>
              <li><strong>Exclusive Benefits:</strong> Special pricing and features for beta participants</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${invitationUrl}" class="button">Accept Beta Invitation</a>
          </div>
          
          <p><strong>Beta Tier:</strong> <span class="beta-badge">${data.betaTier.toUpperCase()}</span></p>
          <p><strong>Company:</strong> ${data.company}</p>
          
          <p><em>This invitation expires in 7 days. Don't miss out on this exclusive opportunity!</em></p>
        </div>
        
        <div class="footer">
          <p>Questions? Reply to this email or contact our support team.</p>
          <p>© 2025 OMGsystems. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    OMGsystems Beta Invitation
    
    Hi ${data.name},
    
    You're invited to participate in the OMGsystems Beta Program!
    
    As a beta tester, you'll get:
    - Early access to our automation platform
    - Direct influence on product development
    - Priority support during beta
    - Exclusive benefits and pricing
    
    Beta Tier: ${data.betaTier.toUpperCase()}
    Company: ${data.company}
    
    Accept your invitation: ${invitationUrl}
    
    This invitation expires in 7 days.
    
    Questions? Reply to this email.
    
    © 2025 OMGsystems
  `;

  const mailOptions = {
    from: `"OMGsystems Beta" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: data.email,
    subject: `🚀 You're Invited to OMGsystems Beta - ${data.company}`,
    text,
    html,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Beta invitation email sent:', result.messageId);
    return result;
  } catch (error) {
    console.error('Failed to send beta invitation email:', error);
    throw error;
  }
}

export async function sendFeedbackNotification(data: FeedbackNotificationData) {
  const transporter = createTransporter();
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Beta Feedback Summary</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
        .stats { display: flex; justify-content: space-around; margin: 20px 0; }
        .stat { text-align: center; }
        .stat-number { font-size: 2em; font-weight: bold; color: #10b981; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📊 Beta Feedback Summary</h1>
          <p>Weekly feedback report for ${data.name}</p>
        </div>
        
        <div class="content">
          <h2>Your Beta Testing Impact</h2>
          
          <div class="stats">
            <div class="stat">
              <div class="stat-number">${data.feedbackCount}</div>
              <div>Feedback Items</div>
            </div>
            <div class="stat">
              <div class="stat-number">${data.averageRating}/5</div>
              <div>Average Rating</div>
            </div>
          </div>
          
          <p>Thank you for your valuable feedback! Your insights are helping us build a better product.</p>
          
          <p><strong>Keep the feedback coming!</strong> Every piece of feedback helps us improve the platform.</p>
        </div>
        
        <div class="footer">
          <p>© 2025 OMGsystems. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"OMGsystems Beta" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: data.email,
    subject: `📊 Your Beta Testing Impact - ${data.feedbackCount} feedback items`,
    html,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Feedback notification email sent:', result.messageId);
    return result;
  } catch (error) {
    console.error('Failed to send feedback notification email:', error);
    throw error;
  }
}

export async function sendLaunchAnnouncement(emails: string[], launchDate: string) {
  const transporter = createTransporter();
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>OMGsystems Launch Announcement</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
        .launch-date { background: #fef3c7; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 OMGsystems is Launching!</h1>
          <p>Thank you for being part of our beta journey</p>
        </div>
        
        <div class="content">
          <div class="launch-date">
            <h2>Launch Date: ${launchDate}</h2>
            <p>Get ready for the full release!</p>
          </div>
          
          <p>Dear Beta Tester,</p>
          
          <p>We're thrilled to announce that OMGsystems will be launching on <strong>${launchDate}</strong>!</p>
          
          <p>Your feedback and participation in our beta program have been invaluable in shaping the final product. Thank you for being part of this journey.</p>
          
          <h3>What's Next?</h3>
          <ul>
            <li>Your beta access will continue until launch</li>
            <li>You'll receive early access to the full platform</li>
            <li>Special beta tester benefits and pricing</li>
            <li>Priority support and onboarding</li>
          </ul>
          
          <p>We can't wait to share the full OMGsystems experience with you!</p>
        </div>
        
        <div class="footer">
          <p>© 2025 OMGsystems. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"OMGsystems" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: emails.join(', '),
    subject: `🎉 OMGsystems Launch Announcement - ${launchDate}`,
    html,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Launch announcement email sent:', result.messageId);
    return result;
  } catch (error) {
    console.error('Failed to send launch announcement email:', error);
    throw error;
  }
}
