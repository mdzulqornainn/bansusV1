import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const getVerificationEmailTemplate = (
  confirmLink: string,
  userEmail: string
) => {
  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verifikasi Email - Badan Khusus Himakom</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                padding: 20px;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            }
            .header {
                background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
                padding: 40px 30px;
                text-align: center;
                position: relative;
            }
            .header::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
                animation: pulse 3s ease-in-out infinite;
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 0.5; }
                50% { transform: scale(1.05); opacity: 0.8; }
            }
            .logo {
                font-size: 2.5rem;
                font-weight: bold;
                color: #1a1a1a;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
                position: relative;
                z-index: 1;
            }
            .subtitle {
                font-size: 1.1rem;
                color: #444;
                margin-top: 10px;
                position: relative;
                z-index: 1;
            }
            .content {
                padding: 50px 40px;
                text-align: center;
            }
            .welcome-title {
                font-size: 2rem;
                color: #2c3e50;
                margin-bottom: 20px;
                font-weight: 700;
            }
            .welcome-text {
                font-size: 1.1rem;
                color: #666;
                margin-bottom: 15px;
                line-height: 1.8;
            }
            .email-highlight {
                color: #ffd700;
                font-weight: 600;
                background: #f8f9fa;
                padding: 2px 8px;
                border-radius: 4px;
                border-left: 4px solid #ffd700;
            }
            .verify-section {
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                padding: 40px 30px;
                margin: 30px 0;
                border-radius: 15px;
                border: 2px dashed #ffd700;
            }
            .verify-icon {
                font-size: 3rem;
                margin-bottom: 20px;
            }
            .verify-text {
                font-size: 1.2rem;
                color: #495057;
                margin-bottom: 30px;
                font-weight: 500;
            }
            .verify-button {
                display: inline-block;
                background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
                color: #1a1a1a;
                text-decoration: none;
                padding: 18px 40px;
                border-radius: 50px;
                font-weight: bold;
                font-size: 1.1rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            .verify-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 15px 35px rgba(255, 215, 0, 0.4);
            }
            .verify-button::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                transition: left 0.5s ease;
            }
            .verify-button:hover::before {
                left: 100%;
            }
            .security-note {
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 10px;
                padding: 20px;
                margin: 30px 0;
                text-align: left;
            }
            .security-title {
                color: #856404;
                font-weight: bold;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .security-text {
                color: #856404;
                font-size: 0.95rem;
                line-height: 1.6;
            }
            .alternative-link {
                background: #f8f9fa;
                border-radius: 8px;
                padding: 15px;
                margin: 20px 0;
                word-break: break-all;
                font-family: 'Courier New', monospace;
                font-size: 0.9rem;
                color: #495057;
                border-left: 4px solid #6c757d;
            }
            .footer {
                background: #2c3e50;
                color: #ecf0f1;
                padding: 30px;
                text-align: center;
            }
            .footer-title {
                font-size: 1.3rem;
                margin-bottom: 15px;
                color: #ffd700;
            }
            .footer-text {
                font-size: 0.95rem;
                line-height: 1.6;
                margin-bottom: 20px;
            }
            .social-links {
                margin: 20px 0;
            }
            .social-links a {
                display: inline-block;
                margin: 0 10px;
                color: #ffd700;
                text-decoration: none;
                font-size: 1.5rem;
                transition: transform 0.3s ease;
            }
            .social-links a:hover {
                transform: scale(1.2);
            }
            .copyright {
                font-size: 0.85rem;
                color: #95a5a6;
                border-top: 1px solid #34495e;
                padding-top: 20px;
                margin-top: 20px;
            }
            @media (max-width: 600px) {
                .email-container {
                    margin: 10px;
                    border-radius: 15px;
                }
                .content {
                    padding: 30px 20px;
                }
                .welcome-title {
                    font-size: 1.6rem;
                }
                .verify-button {
                    padding: 15px 30px;
                    font-size: 1rem;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <div class="logo">🎓 Badan Khusus Himakom</div>
                <div class="subtitle">Badan Khusus Himakom - Mengelola Asisten Dosen Jurusan Ilmu Komputer</div>
            </div>
            
            <div class="content">
                <h1 class="welcome-title">Selamat Datang! 🎉</h1>
                <p class="welcome-text">
                    Terima kasih telah mendaftar di <strong>Badan Khusus Himakom</strong>. 
                    Kami senang Anda bergabung dengan komunitas kami!
                </p>
                <p class="welcome-text">
                    Email Anda: <span class="email-highlight">${userEmail}</span>
                </p>
                
                <div class="verify-section">
                    <div class="verify-icon">🔐</div>
                    <p class="verify-text">
                        Untuk mengaktifkan akun Anda dan mulai menggunakan layanan kami, 
                        silakan verifikasi alamat email Anda dengan mengklik tombol di bawah ini:
                    </p>
                    <a href="${confirmLink}" class="verify-button">
                        ✅ Verifikasi Email Saya
                    </a>
                </div>
                
                <div class="security-note">
                    <div class="security-title">
                        <span>🛡️</span>
                        <span>Catatan Keamanan</span>
                    </div>
                    <p class="security-text">
                        • Link verifikasi ini hanya berlaku selama <strong>24 jam</strong><br>
                        • Jika Anda tidak melakukan pendaftaran, abaikan email ini<br>
                        • Jangan bagikan link ini kepada siapa pun
                    </p>
                </div>
                
                <p class="welcome-text">
                    <strong>Tidak bisa mengklik tombol?</strong> Salin dan tempel link berikut ke browser Anda:
                </p>
                <div class="alternative-link">
                    ${confirmLink}
                </div>
            </div>
            
            <div class="footer">
                <h3 class="footer-title">Badan Khusus Himakom</h3>
                <p class="footer-text">
                    Universitas Lampung<br>
                    Jl. Prof. Dr. Ir. Sumantri Brojonegoro No.1<br>
                    Gedong Meneng, Bandar Lampung, Lampung 35141
                </p>
                <div class="social-links">
                    <a href="#" title="Website">🌐</a>
                    <a href="#" title="Email">📧</a>
                    <a href="#" title="Instagram">📱</a>
                    <a href="#" title="WhatsApp">💬</a>
                </div>
                <div class="copyright">
                    © 2024 Badan Khusus Himakom. All rights reserved.
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};

const getPasswordResetEmailTemplate = (
  confirmLink: string,
  userEmail: string
) => {
  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Password - Badan Khusus Himakom</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
                min-height: 100vh;
                padding: 20px;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0,0,0,0.15);
            }
            .header {
                background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);
                padding: 40px 30px;
                text-align: center;
                position: relative;
            }
            .header::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
                animation: pulse 3s ease-in-out infinite;
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 0.5; }
                50% { transform: scale(1.05); opacity: 0.8; }
            }
            .logo {
                font-size: 2.5rem;
                font-weight: bold;
                color: #ffffff;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
                position: relative;
                z-index: 1;
            }
            .subtitle {
                font-size: 1.1rem;
                color: #ffffff;
                margin-top: 10px;
                position: relative;
                z-index: 1;
                opacity: 0.9;
            }
            .content {
                padding: 50px 40px;
                text-align: center;
            }
            .alert-title {
                font-size: 2rem;
                color: #e74c3c;
                margin-bottom: 20px;
                font-weight: 700;
            }
            .alert-text {
                font-size: 1.1rem;
                color: #666;
                margin-bottom: 15px;
                line-height: 1.8;
            }
            .email-highlight {
                color: #e74c3c;
                font-weight: 600;
                background: #f8f9fa;
                padding: 2px 8px;
                border-radius: 4px;
                border-left: 4px solid #e74c3c;
            }
            .reset-section {
                background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%);
                padding: 40px 30px;
                margin: 30px 0;
                border-radius: 15px;
                border: 2px dashed #e74c3c;
            }
            .reset-icon {
                font-size: 3rem;
                margin-bottom: 20px;
            }
            .reset-text {
                font-size: 1.2rem;
                color: #742a2a;
                margin-bottom: 30px;
                font-weight: 500;
            }
            .reset-button {
                display: inline-block;
                background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
                color: #ffffff;
                text-decoration: none;
                padding: 18px 40px;
                border-radius: 50px;
                font-weight: bold;
                font-size: 1.1rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                box-shadow: 0 10px 25px rgba(231, 76, 60, 0.3);
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            .reset-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 15px 35px rgba(231, 76, 60, 0.4);
            }
            .reset-button::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                transition: left 0.5s ease;
            }
            .reset-button:hover::before {
                left: 100%;
            }
            .security-warning {
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 10px;
                padding: 20px;
                margin: 30px 0;
                text-align: left;
            }
            .warning-title {
                color: #856404;
                font-weight: bold;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .warning-text {
                color: #856404;
                font-size: 0.95rem;
                line-height: 1.6;
            }
            .not-you-section {
                background: #f8f9fa;
                border-radius: 10px;
                padding: 20px;
                margin: 30px 0;
                border-left: 4px solid #6c757d;
            }
            .not-you-title {
                color: #495057;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .not-you-text {
                color: #6c757d;
                font-size: 0.95rem;
                line-height: 1.6;
            }
            .alternative-link {
                background: #f8f9fa;
                border-radius: 8px;
                padding: 15px;
                margin: 20px 0;
                word-break: break-all;
                font-family: 'Courier New', monospace;
                font-size: 0.9rem;
                color: #495057;
                border-left: 4px solid #6c757d;
            }
            .footer {
                background: #2c3e50;
                color: #ecf0f1;
                padding: 30px;
                text-align: center;
            }
            .footer-title {
                font-size: 1.3rem;
                margin-bottom: 15px;
                color: #ff6b6b;
            }
            .footer-text {
                font-size: 0.95rem;
                line-height: 1.6;
                margin-bottom: 20px;
            }
            .social-links {
                margin: 20px 0;
            }
            .social-links a {
                display: inline-block;
                margin: 0 10px;
                color: #ff6b6b;
                text-decoration: none;
                font-size: 1.5rem;
                transition: transform 0.3s ease;
            }
            .social-links a:hover {
                transform: scale(1.2);
            }
            .copyright {
                font-size: 0.85rem;
                color: #95a5a6;
                border-top: 1px solid #34495e;
                padding-top: 20px;
                margin-top: 20px;
            }
            @media (max-width: 600px) {
                .email-container {
                    margin: 10px;
                    border-radius: 15px;
                }
                .content {
                    padding: 30px 20px;
                }
                .alert-title {
                    font-size: 1.6rem;
                }
                .reset-button {
                    padding: 15px 30px;
                    font-size: 1rem;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <div class="logo">🔒 Badan Khusus Himakom</div>
                <div class="subtitle">Reset Password Request</div>
            </div>
            
            <div class="content">
                <h1 class="alert-title">Reset Password 🔑</h1>
                <p class="alert-text">
                    Kami menerima permintaan untuk mereset password akun Anda.
                </p>
                <p class="alert-text">
                    Email: <span class="email-highlight">${userEmail}</span>
                </p>
                
                <div class="reset-section">
                    <div class="reset-icon">🔐</div>
                    <p class="reset-text">
                        Jika Anda memang ingin mereset password, silakan klik tombol di bawah ini. 
                        Anda akan diarahkan ke halaman untuk membuat password baru.
                    </p>
                    <a href="${confirmLink}" class="reset-button">
                        🔄 Reset Password Saya
                    </a>
                </div>
                
                <div class="security-warning">
                    <div class="warning-title">
                        <span>⚠️</span>
                        <span>Penting untuk Diketahui</span>
                    </div>
                    <p class="warning-text">
                        • Link reset password ini hanya berlaku selama <strong>1 jam</strong><br>
                        • Setelah menggunakan link ini, password lama Anda tidak akan bisa digunakan<br>
                        • Pastikan Anda membuat password yang kuat dan mudah diingat
                    </p>
                </div>
                
                <div class="not-you-section">
                    <div class="not-you-title">Bukan Anda yang meminta reset password?</div>
                    <p class="not-you-text">
                        Jika Anda tidak meminta reset password, abaikan email ini. 
                        Akun Anda tetap aman dan password tidak akan berubah. 
                        Namun, kami menyarankan untuk mengubah password jika Anda merasa ada yang mencurigakan.
                    </p>
                </div>
                
                <p class="alert-text">
                    <strong>Tidak bisa mengklik tombol?</strong> Salin dan tempel link berikut ke browser Anda:
                </p>
                <div class="alternative-link">
                    ${confirmLink}
                </div>
            </div>
            
            <div class="footer">
                <h3 class="footer-title">Badan Khusus Himakom</h3>
                <p class="footer-text">
                    Universitas Lampung<br>
                    Jl. Prof. Dr. Ir. Sumantri Brojonegoro No.1<br>
                    Gedong Meneng, Bandar Lampung, Lampung 35141
                </p>
                <div class="social-links">
                    <a href="#" title="Website">🌐</a>
                    <a href="#" title="Email">📧</a>
                    <a href="#" title="Instagram">📱</a>
                    <a href="#" title="WhatsApp">💬</a>
                </div>
                <div class="copyright">
                    © 2024 Badan Khusus Himakom. All rights reserved.
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.BASE_URL}/new-verification?token=${token}`;

  try {
    await resend.emails.send({
      from: "badankhusus2025@bansus.my.id",
      to: [email],
      subject: "🎓 Verifikasi Email Anda - Badan Khusus Himakom",
      html: getVerificationEmailTemplate(confirmLink, email),
    });
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.BASE_URL}/reset-password?token=${token}`;

  try {
    await resend.emails.send({
      from: "badankhusus2025@bansus.my.id",
      to: email,
      subject: "🔒 Reset Password - Badan Khusus Himakom",
      html: getPasswordResetEmailTemplate(confirmLink, email),
    });
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};
