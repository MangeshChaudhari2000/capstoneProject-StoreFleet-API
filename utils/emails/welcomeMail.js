// Import the necessary modules here
import nodemailer from 'nodemailer';

export const sendWelcomeEmail = async (user) => {
  // Write your code here
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "mvchaudhari2000@gmail.com",
      pass: 'ifqlrjpwzcoyjnvj'  
    },
  });
  
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'mvchaudhari2000@gmail.com', // sender address
    to:  `${user.email}`, // list of receivers
    subject: "Welcome to storefleet", // Subject line
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome Page</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f0f0f0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            .container {
                text-align: center;
            }
            h1 {
                color: #333;
            }
            p {
                color: #666;
            }
            img {
                width: 100px;
                height: 100px;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <img src="https://cdn1.iconfinder.com/data/icons/financial-shopping-2/512/trolley-512.png" alt="Shopping Cart Icon">
            <h1>Welcome to Our Website</h1>
            <p>This is a basic HTML welcome page. Feel free to explore!</p>
        </div>
    </body>
    </html>
    `, // html body
  });

};

