/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// Set up email transport (using Gmail as an example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "harshrathod7798@gmail.com",
    pass: "Harsh7798#",
  },
});

exports.sendEmail = functions.https.onRequest(async (req, res) => {
    const mailOptions = {
      from: "your-email@gmail.com",  // Sender's email address
      to: "recipient-email@gmail.com",  // Receiver's email address
      subject: "Test Email from Firebase",  // Subject of the email
      text: "Hello! This is an automated email from Firebase Cloud Functions.",  // Email body (plain text)
    };
  
    try {
      await transporter.sendMail(mailOptions);  // Sending the email
      res.status(200).send("Email sent successfully!");  // Success response
    } catch (error) {
      console.error("Error sending email:", error);  // Log error if sending fails
      res.status(500).send("Failed to send email");  // Error response
    }
  });
  