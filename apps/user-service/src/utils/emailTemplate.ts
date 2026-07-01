export const otpTemplate = (otp: string) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8" />
      <title>OTP Verification</title>
  </head>

  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">

      <div style="
          max-width: 600px;
          margin: auto;
          background-color: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      ">

          <div style="
              background-color: #000071;
              padding: 20px;
              text-align: center;
          ">
              <h2 style="color: #ffffff; margin: 0;">
                  Care Hub OTP Verification
              </h2>
          </div>

          <div style="padding: 30px;">
              <p>Hello,</p>

              <p>
                  We received a request to verify your account.
                  Please use the OTP below:
              </p>

              <div style="
                  text-align: center;
                  margin: 30px 0;
              ">
                  <span style="
                      display: inline-block;
                      background-color: #000071;
                      color: #ffffff;
                      padding: 15px 30px;
                      font-size: 28px;
                      font-weight: bold;
                      border-radius: 8px;
                      letter-spacing: 5px;
                  ">
                      ${otp}
                  </span>
              </div>

              <p>
                  This OTP is valid for 5 minutes.
              </p>

              <p>
                  If you did not request this OTP, please ignore this email.
              </p>

              <hr />

              <p style="font-size: 12px; color: #666666;">
                  © 2026 Care Hub. All rights reserved.
              </p>
          </div>

      </div>

  </body>
  </html>
  `;
};
