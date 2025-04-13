# Troubleshooting Form Submissions to Google Sheets

This document provides guidance for troubleshooting form submissions from your website to Google Sheets.

## Current Implementation

The form submission in `hero-section.tsx` uses a direct form element submission approach, which is the most reliable method for sending data to Google Apps Script. The implementation:

1. Creates an actual HTML form element
1. Sets it to use the GET method
1. Adds all form fields as hidden inputs
1. Targets a new window/tab to show the response
1. Submits the form programmatically

## Common Issues and Solutions

### 1. Form Submissions Not Appearing in Google Sheet

**Potential Causes:**

- Google Apps Script URL is incorrect or has changed
- The Apps Script has deployment issues
- Browser security settings blocking form submission

**Solutions:**

- Verify the Google Apps Script URL in the code is correct:

```javascript
const scriptUrl = "https://script.google.com/macros/s/AKfycbzH8pRKDN-e5yJoSYVKGn_iABHj0lzIbpi-rDvrnNedNLDuovy-SQJ0QTwUzNmukEjk/exec"
```

- Create a new deployment of the Apps Script and update the URL
- Check the browser console for any errors related to form submission

### 2. Google Apps Script Errors

**Potential Causes:**

- Spreadsheet ID is incorrect
- Google Sheet permissions issues
- Google Apps Script quota limitations

**Solutions:**

- Verify the SPREADSHEET_ID in the Apps Script code
- Ensure the Google Sheet is accessible to the Apps Script
- Check the Apps Script execution logs for errors

### 3. CORS-Related Issues

**Potential Causes:**

- Browser security policies blocking cross-origin requests
- Missing CORS headers in Apps Script response

**Solutions:**

- The direct form submission method bypasses CORS issues
- Ensure the Apps Script has the proper CORS headers:

```javascript
.setHeader('Access-Control-Allow-Origin', '*')
```

- Use the target="_blank" approach (already implemented)

### 4. Browser Security Settings

**Potential Causes:**

- Pop-up blockers preventing the new window from opening
- Content security policies blocking submissions

**Solutions:**

- Inform users to allow pop-ups for your site
- For testing, temporarily disable pop-up blockers

## Testing Form Submission

To properly test form submission:

1. Fill out the form completely (all required fields)
1. Submit the form
1. A new tab should briefly open showing the Apps Script response
1. The form should reset and show a success message
1. Check the Google Sheet for the new entry

## Verifying Google Apps Script Operation

To verify your Google Apps Script is working correctly:

1. Visit the direct URL in your browser:
   `https://script.google.com/macros/s/AKfycbzH8pRKDN-e5yJoSYVKGn_iABHj0lzIbpi-rDvrnNedNLDuovy-SQJ0QTwUzNmukEjk/exec`
1. You should see a basic HTML page indicating the endpoint is working
1. Run the test function in the Apps Script editor:

```javascript
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
```

1. Check the execution logs and verify the test data appears in your Google Sheet

## Last Resort Solutions

If all else fails:

1. **Create a completely new Google Apps Script**: Sometimes starting fresh resolves unexplained issues
1. **Use server-side form handling**: If Google Apps Script continues to be unreliable, consider a server-side solution
1. **Use a commercial form service**: Services like Formspree, Netlify Forms, or FormKeep are more reliable alternatives

Remember to check both the browser console and the Google Apps Script execution logs for any error messages that can help diagnose issues.
