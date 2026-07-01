export const otpTemplate = (otp: string) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8" />
      <title>OTP Verification</title>
  </head>
  <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
      
      <div style="
          max-width:600px;
          margin:auto;
          background:white;
          padding:30px;
          border-radius:10px;
          box-shadow:0 2px 10px rgba(0,0,0,0.1);
      ">
          
          <h2 style="color:#2563eb;">
              AI Healthcare Platform
          </h2>

          <p>Hello,</p>

          <p>
              We received a request to verify your account.
              Use the OTP below:
          </p>

          <div style="
              text-align:center;
              margin:30px 0;
          ">
              <span style="
                  font-size:32px;
                  font-weight:bold;
                  letter-spacing:8px;
                  color:#2563eb;
              ">
                  ${otp}
              </span>
          </div>

          <p>
              This OTP will expire in 5 minutes.
          </p>

          <p>
              If you did not request this verification,
              please ignore this email.
          </p>

          <hr />

          <p style="color:gray;font-size:12px;">
              © 2026 AI Healthcare Platform
          </p>

      </div>

  </body>
  </html>
  `;
};
