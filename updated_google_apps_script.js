/**
* Google Apps Script for Form Submissions to Google Sheets
*
* This script handles both GET and POST requests from a web form and saves the data to a Google Sheet.
*/

// The ID of your Google Sheet
const SPREADSHEET_ID = '1kn-i9byHHmEPjJgnLc31uARGWmod8D7ZD98KbCEIVkA';
const SHEET_NAME = 'Form Responses'; // Name of the sheet to store responses

/**
* Handles GET requests to the web app.
* Now handles actual form submissions as well.
*/
function doGet(e) {
  console.log("=== doGet triggered at " + new Date().toISOString() + " ===");
  console.log("doGet event object: " + JSON.stringify(e));

  // Check if e and e.parameter exist
  if (e && e.parameter && (e.parameter.firstName || e.parameter.email)) {
    try {
      // Log the incoming request
      console.log("Received GET form submission");
      console.log("Parameters: " + JSON.stringify(e.parameter));
    
      // Process the form data
      const formData = {
        firstName: e.parameter.firstName || '',
        lastName: e.parameter.lastName || '',
        email: e.parameter.email || '',
        phone: e.parameter.phone || '',
        message: e.parameter.message || ''
      };
    
      // Save to spreadsheet
      saveToSheet(formData);
    
      // Return HTML response that will show in the iframe
      return HtmlService.createHtmlOutput(
        "<html><body><h1>Form Submitted Successfully</h1><p>Thank you for your submission.</p></body></html>"
      );
    } catch (error) {
      console.log("Error in GET request: " + error.message);
      return HtmlService.createHtmlOutput(
        "<html><body><h1>Error</h1><p>There was an error processing your submission: " + error.message + "</p></body></html>"
      );
    }
  }
  // If no parameters, return a test page
  return ContentService.createTextOutput(
    "<html><body><h1>Form Submission Endpoint</h1><p>This is an endpoint for form submissions.</p></body></html>"
  ).setMimeType(ContentService.MimeType.HTML);
}

/**
* Handles POST requests from the web form.
* Extracts form data and saves it to the spreadsheet.
*/
function doPost(e) {
  console.log("=== doPost triggered at " + new Date().toISOString() + " ===");
  console.log("doPost event object: " + JSON.stringify(e));

  try {
    console.log("Received POST form submission");
  
    // Check if e and e.parameter exist
    if (!e || !e.parameter) {
      console.log("No parameters received in POST request");
      throw new Error("No form data received");
    }
  
    console.log("Parameters: " + JSON.stringify(e.parameter));
  
    // Get the form data from the request
    const formData = {
      firstName: e.parameter.firstName || '',
      lastName: e.parameter.lastName || '',
      email: e.parameter.email || '',
      phone: e.parameter.phone || '',
      message: e.parameter.message || ''
    };
  
    // Log the data for debugging
    console.log("Processed formData: " + JSON.stringify(formData));
  
    // Save the data to the spreadsheet
    const result = saveToSheet(formData);
  
    // Return success response
    const responseData = {
      result: "success",
      message: "Form data saved successfully"
    };
  
    // Set CORS headers to allow requests from any origin
    return ContentService.createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'GET, POST')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
  } catch (error) {
    console.error("Error processing form: " + error.message);
  
    // Return error response
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
* Saves the form data to the Google Sheet.
*/
function saveToSheet(formData) {
  try {
    // Open the spreadsheet and get the sheet
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
  
    // If the sheet doesn't exist, create it with headers
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp',
        'First Name',
        'Last Name',
        'Email',
        'Phone',
        'Message'
      ]);
    }
  
    // Append a new row with the form data
    sheet.appendRow([
      new Date(), // Timestamp
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.phone,
      formData.message
    ]);
  
    console.log("Data successfully saved to sheet");
    return true;
  } catch (error) {
    console.error("Error saving to sheet: " + error.message);
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
    message: "This is a test submission"
  };
  saveToSheet(testData);
  console.log("Test data saved successfully");
}
