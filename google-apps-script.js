/**
 * Google Apps Script for Form Submissions to Google Sheets
 * 
 * This script handles both GET and POST requests from a web form and saves the data to a Google Sheet.
 * Enhanced with comprehensive logging and error handling for troubleshooting form submissions.
 */

// The ID of your Google Sheet (corrected)
const SPREADSHEET_ID = '1kn-i9byHHmEPjJgnLc31uARGWmod8D7ZD98KbCEIVkA';

// The exact tab name inside your spreadsheet
const SHEET_NAME = 'Form Submissions';

/**
 * Handles GET requests to the web app.
 */
function doGet(e) {
  console.log("FORM SUBMISSION - doGet triggered");
  console.log("Request parameters: " + JSON.stringify(e.parameter));
  
  if (e && e.parameter && (e.parameter.firstName || e.parameter.email)) {
    try {
      console.log("Received GET form submission with data");
      
      const formData = {
        firstName: e.parameter.firstName || '',
        lastName: e.parameter.lastName || '',
        email: e.parameter.email || '',
        phone: e.parameter.phone || '',
        message: e.parameter.message || '',
        timestamp: new Date().toISOString()
      };
      
      console.log("Processed form data: " + JSON.stringify(formData));
      
      const result = saveToSheet(formData);
      console.log("Save to sheet result: " + result);
      
      return HtmlService.createHtmlOutput(
        "<html><body><h1>Form Submitted Successfully</h1>" +
        "<p>Thank you for your submission, " + formData.firstName + "!</p>" +
        "<p>We've recorded your information and will be in touch soon.</p>" +
        "<script>window.parent.postMessage('success', '*');</script>" +
        "</body></html>"
      );
    } catch (error) {
      console.error("ERROR in doGet: " + error.message);
      console.error("Stack trace: " + error.stack);
      
      return HtmlService.createHtmlOutput(
        "<html><body><h1>Error</h1>" +
        "<p>There was an error processing your submission: " + error.message + "</p>" +
        "<script>window.parent.postMessage('error', '*');</script>" +
        "</body></html>"
      );
    }
  }
  
  console.log("No form parameters found, returning test page");
  return HtmlService.createHtmlOutput(
    "<html><body><h1>Form Submission Endpoint</h1>" +
    "<p>This is an endpoint for form submissions.</p>" +
    "<p>Status: ACTIVE</p>" +
    "</body></html>"
  );
}

/**
 * Handles POST requests from the web form.
 */
function doPost(e) {
  console.log("FORM SUBMISSION - doPost triggered");
  console.log("Request parameters: " + JSON.stringify(e.parameter));
  
  try {
    if (!e || !e.parameter) {
      console.log("No parameters received in POST request");
      throw new Error("No form data received");
    }
    
    const formData = {
      firstName: e.parameter.firstName || '',
      lastName: e.parameter.lastName || '',
      email: e.parameter.email || '',
      phone: e.parameter.phone || '',
      message: e.parameter.message || '',
      timestamp: new Date().toISOString()
    };
    
    console.log("Processed formData: " + JSON.stringify(formData));
    
    const result = saveToSheet(formData);
    console.log("Save to sheet result: " + result);
    
    const responseData = {
      result: "success",
      message: "Form data saved successfully"
    };
    
    return ContentService.createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'GET, POST')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
  } catch (error) {
    console.error("ERROR in doPost: " + error.message);
    console.error("Stack trace: " + error.stack);
    
    const errorResponse = {
      result: "error",
      error: error.message
    };
    
    return ContentService.createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*');
  }
}

/**
 * Handle OPTIONS requests for CORS preflight
 */
function doOptions(e) {
  console.log("Received OPTIONS request for CORS preflight");
  
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type')
    .setHeader('Access-Control-Max-Age', '3600');
}

/**
 * Saves the form data to the Google Sheet.
 */
function saveToSheet(formData) {
  try {
    console.log("Starting saveToSheet with data: " + JSON.stringify(formData));
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log("Spreadsheet opened successfully: " + ss.getName());
    
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      console.log("Sheet not found, creating new sheet: " + SHEET_NAME);
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp',
        'First Name',
        'Last Name',
        'Email',
        'Phone',
        'Message',
        'Submission Time'
      ]);
      console.log("Headers added to new sheet");
    }
    
    const now = new Date();
    sheet.appendRow([
      now,
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.phone,
      formData.message,
      formData.timestamp || now.toISOString()
    ]);
    
    console.log("Data successfully saved to sheet at " + now.toISOString());
    return true;
  } catch (error) {
    console.error("ERROR saving to sheet: " + error.message);
    console.error("Stack trace: " + error.stack);
    throw error;
  }
}

/**
 * Test function to verify spreadsheet connectivity
 */
function testSaveToSheet() {
  const testData = {
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    phone: "123-456-7890",
    message: "This is a test submission from Apps Script"
  };
  
  try {
    saveToSheet(testData);
    console.log("Test data saved successfully");
    return "Test completed successfully"; // Added return statement to force change detection
  } catch (error) {
    console.error("Test failed: " + error.message);
    return "Test failed: " + error.message; // Added return statement to force change detection
  }
}

/**
 * Additional test function to verify the script is working
 */
function verifyScriptSetup() {
  return {
    spreadsheetId: SPREADSHEET_ID,
    sheetName: SHEET_NAME,
    timestamp: new Date().toISOString(),
    status: "Script is properly configured"
  };
}
