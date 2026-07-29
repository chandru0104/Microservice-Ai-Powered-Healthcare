export const appointmentPaymentSuccessTemplate = (
  patientName: string,
  doctorName: string,
  appointmentDate: string,
  appointmentTime: string,
  amount: number,
  receiptId: string
) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8" />
      <title>Appointment Confirmed</title>
  </head>

  <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">

      <div style="
          max-width:600px;
          margin:auto;
          background:#ffffff;
          padding:30px;
          border-radius:10px;
          box-shadow:0 2px 10px rgba(0,0,0,0.1);
      ">

          <h2 style="color:#16a34a;">
              ✅ AI Healthcare Platform
          </h2>

          <p>Hi <strong>${patientName}</strong>,</p>

          <p>
              Your appointment payment has been received successfully.
              Your appointment is now <strong>confirmed</strong>.
          </p>

          <div style="
              background:#f8fafc;
              border:1px solid #e5e7eb;
              border-radius:8px;
              padding:20px;
              margin:25px 0;
          ">

              <h3 style="margin-top:0;color:#2563eb;">
                  Appointment Details
              </h3>

              <table style="width:100%;font-size:15px;">
                  <tr>
                      <td><strong>Doctor</strong></td>
                      <td>${doctorName}</td>
                  </tr>

                  <tr>
                      <td><strong>Date</strong></td>
                      <td>${appointmentDate}</td>
                  </tr>

                  <tr>
                      <td><strong>Time</strong></td>
                      <td>${appointmentTime}</td>
                  </tr>

                  <tr>
                      <td><strong>Amount Paid</strong></td>
                      <td>₹${amount}</td>
                  </tr>

                  <tr>
                      <td><strong>Receipt ID</strong></td>
                      <td>${receiptId}</td>
                  </tr>
              </table>

          </div>

          <p>
              Please arrive at least
              <strong>10-15 minutes before</strong>
              your scheduled appointment.
          </p>

          <p>
              If you have any questions, please contact our support team.
          </p>

          <hr style="margin-top:30px;" />

          <p style="font-size:12px;color:#6b7280;">
              © 2026 AI Healthcare Platform. All rights reserved.
          </p>

      </div>

  </body>
  </html>
  `;
};