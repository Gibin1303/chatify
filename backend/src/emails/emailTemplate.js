export function createWelcomeEmailTemplate(name, clientURL) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Georgia', 'Times New Roman', serif; background-color: #fafbfc;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafbfc; padding: 60px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 0; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
                    
                    <!-- Elegant Header with Gradient Bar -->
                    <tr>
                        <td style="height: 4px; background: linear-gradient(90deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%);"></td>
                    </tr>
                    
                    <!-- Logo/Brand Area -->
                    <tr>
                        <td style="padding: 50px 60px 30px 60px; text-align: center;">
                            <div style="width: 60px; height: 60px; margin: 0 auto; border: 2px solid #2c3e50; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">
                                <span style="font-size: 28px; color: #2c3e50;">✦</span>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Main Heading -->
                    <tr>
                        <td style="padding: 0 60px 40px 60px; text-align: center;">
                            <h1 style="margin: 0; color: #2c3e50; font-size: 36px; font-weight: 400; letter-spacing: 0.5px; line-height: 1.3;">
                                Welcome to Our Family
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Divider -->
                    <tr>
                        <td style="padding: 0 60px;">
                            <div style="width: 60px; height: 1px; background-color: #d4af37; margin: 0 auto;"></div>
                        </td>
                    </tr>
                    
                    <!-- Personal Greeting -->
                    <tr>
                        <td style="padding: 40px 60px 30px 60px;">
                            <p style="margin: 0 0 24px 0; color: #2c3e50; font-size: 18px; line-height: 1.8; text-align: center; font-family: 'Georgia', serif;">
                                Dear ${name},
                            </p>
                            <p style="margin: 0 0 24px 0; color: #556270; font-size: 16px; line-height: 1.8; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                                It is with great pleasure that we welcome you to our distinguished community. Your decision to join us marks the beginning of an exceptional journey.
                            </p>
                            <p style="margin: 0; color: #556270; font-size: 16px; line-height: 1.8; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                                We have curated an experience designed with your needs in mind, ensuring every interaction reflects our commitment to excellence.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- CTA Button -->
                    <tr>
                        <td style="padding: 30px 60px 50px 60px; text-align: center;">
                            <a href=${clientURL} style="display: inline-block; padding: 16px 48px; background-color: #2c3e50; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; transition: all 0.3s ease; border: 1px solid #2c3e50;">
                                Begin Your Journey
                            </a>
                        </td>
                    </tr>
                    
                    <!-- Features Section -->
                    <tr>
                        <td style="padding: 0 60px 50px 60px; background-color: #f8f9fa;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding: 40px 0 30px 0; text-align: center;">
                                        <h2 style="margin: 0; color: #2c3e50; font-size: 20px; font-weight: 400; letter-spacing: 0.5px;">
                                            What Awaits You
                                        </h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px 0;">
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="40" valign="top" style="padding-top: 5px;">
                                                    <div style="width: 8px; height: 8px; background-color: #d4af37; border-radius: 50%;"></div>
                                                </td>
                                                <td style="padding-bottom: 20px;">
                                                    <p style="margin: 0; color: #2c3e50; font-size: 16px; font-weight: 500; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Personalized Experience</p>
                                                    <p style="margin: 5px 0 0 0; color: #6c757d; font-size: 14px; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Tailored specifically to your preferences and goals</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="40" valign="top" style="padding-top: 5px;">
                                                    <div style="width: 8px; height: 8px; background-color: #d4af37; border-radius: 50%;"></div>
                                                </td>
                                                <td style="padding-bottom: 20px;">
                                                    <p style="margin: 0; color: #2c3e50; font-size: 16px; font-weight: 500; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Dedicated Support</p>
                                                    <p style="margin: 5px 0 0 0; color: #6c757d; font-size: 14px; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Our team is here to assist you every step of the way</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="40" valign="top" style="padding-top: 5px;">
                                                    <div style="width: 8px; height: 8px; background-color: #d4af37; border-radius: 50%;"></div>
                                                </td>
                                                <td>
                                                    <p style="margin: 0; color: #2c3e50; font-size: 16px; font-weight: 500; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Exclusive Access</p>
                                                    <p style="margin: 5px 0 0 0; color: #6c757d; font-size: 14px; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Premium features and resources at your fingertips</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Closing -->
                    <tr>
                        <td style="padding: 50px 60px; text-align: center;">
                            <p style="margin: 0 0 10px 0; color: #556270; font-size: 15px; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                                Should you require any assistance, we are merely a message away.
                            </p>
                            <p style="margin: 30px 0 0 0; color: #2c3e50; font-size: 15px; font-family: 'Georgia', serif; font-style: italic;">
                                With warmest regards,
                            </p>
                            <p style="margin: 8px 0 0 0; color: #2c3e50; font-size: 16px; font-weight: 500; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                                The Team
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer Divider -->
                    <tr>
                        <td style="height: 1px; background-color: #e9ecef;"></td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 40px 60px; text-align: center; background-color: #f8f9fa;">
                            <p style="margin: 0 0 15px 0; color: #98a2b3; font-size: 12px; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                                © 2025 Your Company · All Rights Reserved
                            </p>
                            <p style="margin: 0; color: #98a2b3; font-size: 11px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                                <a href="#" style="color: #98a2b3; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
                                <span style="color: #d4d8dd;">·</span>
                                <a href="#" style="color: #98a2b3; text-decoration: none; margin: 0 10px;">Unsubscribe</a>
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
}