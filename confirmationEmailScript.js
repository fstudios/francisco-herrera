/**
 * Google Apps Script for Form Submissions to Google Sheets
 * WITH CONFIRMATION EMAIL FEATURE
 */

// The ID of your Google Sheet
const SPREADSHEET_ID = '1Zb6fq_4ZA5hbd6tsuGnHBllPVTX_Zd0KWVwq1uxQ2hM';
const SHEET_NAME = 'Francisco Herrera - Form Submissions';

/**
 * Handles GET requests - now with email confirmation
 */
function doGet(e) {
  if (e && e.parameter && (e.parameter.firstName || e.parameter.email)) {
    try {
      console.log("Received GET form submission");
      console.log("Parameters: " + JSON.stringify(e.parameter));
      
      const formData = { 
        firstName: e.parameter.firstName || '', 
        lastName: e.parameter.lastName || '', 
        email: e.parameter.email || '', 
        phone: e.parameter.phone || '', 
        message: e.parameter.message || '' 
      };
      
      // Save data to spreadsheet
      saveToSheet(formData);
      
      // Send confirmation email if email is provided
      if (formData.email && formData.email.includes('@')) {
        sendConfirmationEmail(formData);
      }
      
      // Return success page
      return HtmlService.createHtmlOutput(`
        <html>
          <head>
            <title>Form Submitted Successfully</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
              h1 { color: #4CAF50; }
              p { font-size: 18px; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Form Submitted Successfully</h1>
              <p>Thank you for your submission.</p>
              <p>A confirmation email has been sent to: ${formData.email}</p>
            </div>
          </body>
        </html>
      `);
    } catch (error) {
      console.log("Error in GET request: " + error.message);
      return HtmlService.createHtmlOutput(`
        <html>
          <head>
            <title>Error</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
              h1 { color: #f44336; }
              p { font-size: 18px; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Error</h1>
              <p>GET Error: ${error.message}</p>
            </div>
          </body>
        </html>
      `);
    }
  }
  
  return ContentService.createTextOutput(`
    <html>
      <body>
        <h1>Form Submission Endpoint</h1>
        <p>Ready for form submissions.</p>
      </body>
    </html>
  `).setMimeType(ContentService.MimeType.HTML);
}

/**
 * Handles POST requests with improved logging & email confirmation
 */
function doPost(e) {
  let responseData;
  let httpStatusCode = 200; // Default success code

  try {
    console.log("====== doPost Execution Started ======");
    console.log("Raw event object (e):", JSON.stringify(e));

    // Check for parameters carefully
    if (!e || !e.parameter) {
      console.error("Error: No event parameter object (e.parameter) received.");
      throw new Error("No form data parameters received in POST request.");
    }
    
    console.log("Received e.parameter:", JSON.stringify(e.parameter));

    // Construct formData
    const formData = {
      firstName: e.parameter.firstName || '',
      lastName: e.parameter.lastName || '',
      email: e.parameter.email || '',
      phone: e.parameter.phone || '',
      message: e.parameter.message || ''
    };
    console.log("Constructed formData:", JSON.stringify(formData));

    // Save data to spreadsheet
    console.log("Attempting to call saveToSheet...");
    const saveResult = saveToSheet(formData);
    console.log("saveToSheet completed. Result:", saveResult);

    // Send confirmation email if email is provided
    if (formData.email && formData.email.includes('@')) {
      const emailResult = sendConfirmationEmail(formData);
      console.log("Email confirmation sent. Result:", emailResult);
    }

    // Prepare success response
    responseData = {
      result: "success",
      message: "Form data saved and confirmation email sent",
      receivedData: formData
    };
    console.log("Prepared SUCCESS responseData:", JSON.stringify(responseData));

  } catch (error) {
    console.error("!!!!!! ERROR in doPost CATCH block !!!!!!");
    console.error("Error Message:", error.message);
    console.error("Error Stack:", error.stack);

    // Prepare detailed error response
    responseData = {
      result: "error",
      error: error.message,
      details: "An error occurred while processing the form submission on the server.",
      receivedParameters: e ? JSON.stringify(e.parameter) : "e object was null"
    };
    httpStatusCode = 500; // Internal Server Error
    console.log("Prepared ERROR responseData:", JSON.stringify(responseData));
  }

  // Return JSON response with CORS headers
  console.log(`====== doPost Execution Finished. Sending response with status ${httpStatusCode} ======`);
  return ContentService.createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

/**
 * Saves the form data to the Google Sheet
 */
function saveToSheet(formData) {
  try {
    console.log("saveToSheet: Opening Spreadsheet ID:", SPREADSHEET_ID);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log("saveToSheet: Getting Sheet Name:", SHEET_NAME);
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      console.warn("saveToSheet: Sheet not found, creating new sheet:", SHEET_NAME);
      sheet = ss.insertSheet(SHEET_NAME);
      // Add headers when creating a new sheet
      sheet.appendRow(['Timestamp', 'First Name', 'Last Name', 'Email', 'Phone', 'Message', 'Email Sent']);
      console.log("saveToSheet: Added headers to new sheet.");
    } else {
      console.log("saveToSheet: Found existing sheet.");
    }

    const dataToAppend = [
      new Date(),
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.phone,
      formData.message,
      "Pending" // Email status - will be updated after sending
    ];
    console.log("saveToSheet: Appending data:", JSON.stringify(dataToAppend));
    sheet.appendRow(dataToAppend);
    
    // Get the row index of the newly added row
    const lastRow = sheet.getLastRow();
    
    console.log("saveToSheet: Data successfully appended to sheet at row:", lastRow);
    return {success: true, rowIndex: lastRow};
  } catch (error) {
    console.error("!!!!!! ERROR in saveToSheet CATCH block !!!!!!");
    console.error("saveToSheet Error Message:", error.message);
    console.error("saveToSheet Error Stack:", error.stack);
    throw new Error("Failed to save data to sheet: " + error.message);
  }
}

/**
 * Sends confirmation email to the user
 */
function sendConfirmationEmail(formData) {
  try {
    console.log("Sending confirmation email to:", formData.email);
    
    // Format date for email
    const eventDate = "Saturday, June 22, 2024";
    const eventTime = "4:00 PM – 7:00 PM";
    const eventLocation = "518 Valencia St., San Francisco, CA";
    
    // Build email subject and body
    const subject = "Reservation Confirmation - Francisco Herrera Concert";
    
    // Create HTML email with responsive design
    const htmlBody = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
          .container { padding: 20px; }
          .header { background-color: #6b21a8; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #666; }
          h1 { margin: 0; font-size: 24px; }
          h2 { font-size: 20px; color: #6b21a8; }
          .info { margin: 20px 0; }
          .info p { margin: 5px 0; }
          .highlight { color: #e11d48; font-weight: bold; }
          .button { display: inline-block; background-color: #e11d48; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Francisco Herrera Concert</h1>
          </div>
          <div class="content">
            <p>Dear ${formData.firstName} ${formData.lastName},</p>
            
            <p>Thank you for reserving your spot for the upcoming <span class="highlight">Francisco Herrera Concert</span>. We are excited to have you join us for this special performance.</p>
            
            <p style="font-weight: bold; color: #e11d48;">Please note: This email serves as your reservation confirmation. Payment for tickets will be collected at a later time.</p>
            
            <div style="text-align: center; margin: 20px 0;">
              <img src="https://pub-28e558b74ea64a0781531927a8b49e0e.r2.dev/tio.png" alt="Francisco Herrera" style="max-width: 100%; height: auto; border-radius: 8px;">
            </div>
            
            <h2>Event Details</h2>
            <div class="info">
              <p><strong>Date:</strong> ${eventDate}</p>
              <p><strong>Time:</strong> ${eventTime}</p>
              <p><strong>Location:</strong> ${eventLocation}</p>
            </div>
            
            <p>This confirmation email serves as your reservation. No physical tickets are required. Payment details will be sent separately.</p>
            
            <p>If you have any questions or need to update your reservation, please reply to this email or contact us at <a href="mailto:info@franciscoherrera.com">info@franciscoherrera.com</a>.</p>
            
            <p>We look forward to seeing you at the event!</p>
            
            <p>Warm regards,<br>
            <strong>Francisco Herrera Concert Team</strong></p>
          </div>
          <div class="footer">
            <p>© 2025 Francisco Herrera. All rights reserved.</p>
            <p>This is an automated message. Please do not reply directly to this email.</p>
          </div>
        </div>
      </body>
    </html>
    `;
    
    // Plain text alternative for email clients that don't support HTML
    const plainTextBody = 
    `Dear ${formData.firstName} ${formData.lastName},

Thank you for reserving your spot for the upcoming Francisco Herrera Concert. We are excited to have you join us for this special performance.

IMPORTANT: This email serves as your reservation confirmation. Payment for tickets will be collected at a later time.

EVENT DETAILS:
Date: ${eventDate}
Time: ${eventTime}
Location: ${eventLocation}

This confirmation email serves as your reservation. No physical tickets are required. Payment details will be sent separately.

If you have any questions or need to update your reservation, please contact us at info@franciscoherrera.com.

We look forward to seeing you at the event!

Warm regards,
Francisco Herrera Concert Team

© 2025 Francisco Herrera. All rights reserved.
This is an automated message. Please do not reply directly to this email.`;
    
    // Send the email
    GmailApp.sendEmail(
      formData.email,
      subject,
      plainTextBody,
      {
        htmlBody: htmlBody,
        name: "Francisco Herrera Concert",
        replyTo: "info@franciscoherrera.com"
      }
    );
    
    // Update the spreadsheet to indicate email was sent
    try {
      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheet = ss.getSheetByName(SHEET_NAME);
      const lastRow = sheet.getLastRow();
      
      // Update the "Email Sent" column (column G) for the last row
      sheet.getRange(lastRow, 7).setValue("Yes - " + new Date());
      
      console.log("Updated spreadsheet to indicate email was sent");
    } catch (updateError) {
      console.error("Error updating spreadsheet after email sent:", updateError.message);
    }
    
    console.log("Confirmation email sent successfully to", formData.email);
    return {success: true};
    
  } catch (error) {
    console.error("Error sending confirmation email:", error.message);
    console.error("Error stack:", error.stack);
    
    // Even if email fails, don't throw error - just log it
    // This way form submission still succeeds even if email fails
    try {
      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheet = ss.getSheetByName(SHEET_NAME);
      const lastRow = sheet.getLastRow();
      
      // Update the "Email Sent" column to indicate failure
      sheet.getRange(lastRow, 7).setValue("Failed - " + error.message);
      
      console.log("Updated spreadsheet to indicate email sending failed");
    } catch (updateError) {
      console.error("Error updating spreadsheet after email failure:", updateError.message);
    }
    
    return {success: false, error: error.message};
  }
}

/**
 * Test function for development
 */
function testSaveToSheet() {
  const testData = { 
    firstName: "Test", 
    lastName: "User", 
    email: "test@example.com", 
    phone: "123-456-7890", 
    message: "This is a test submission" 
  };
  
  saveToSheet(testData);
  sendConfirmationEmail(testData);
  
  console.log("Test data saved successfully and confirmation email sent");
}
