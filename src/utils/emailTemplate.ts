export const generateEmailHTML = (
  firstName: string,
  lastName: string,
  message: string,
): string => {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Danke für deine Nachricht</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #333;
          line-height: 1.5;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
        h1 {
          color: #3498DB;
        }
        .message {
          margin: 20px 0;
          padding: 10px;
          background-color: #f1f1f1;
          border-left: 4px solid #3498DB;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Vielen Dank für deine Nachricht!</h1>
        <p>Hallo ${firstName} ${lastName},</p>
        <p>Vielen Dank, dass du uns kontaktiert hast. Hier ist eine Kopie deiner Nachricht:</p>
        <div class="message">
          ${message}
        </div>
        <p>Wir melden uns so schnell wie möglich bei dir.</p>
        <p>Mit freundlichen Grüßen,<br>Dein Team</p>
      </div>
    </body>
    </html>
  `;
};
