# Form Submission Setup Instructions

This document provides step-by-step instructions for setting up the form submission to Google Sheets functionality.

## Overview

The form on the website collects user information (name, email, phone, message) and sends it to a Google Sheet using Google Apps Script. This setup allows you to:

1. Collect form submissions in a Google Sheet
2. Keep track of all reservations
3. Export data for further processing if needed

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Rename the spreadsheet to something meaningful like "Francisco Herrera - Form Submissions"
3. Note the Google Sheet ID from the URL, which looks like: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`

## Step 2: Set Up Google Apps Script

1. In your Google Sheet, click on **Extensions** > **Apps Script**
2. This will open the Apps Script editor in a new tab
3. Rename the project to "Form Submission Handler" (top left of the screen)
4. Delete any code in the editor
5. Copy and paste the entire contents of the `google-apps-script.js` file from this project
6. Replace `YOUR_SPREADSHEET_ID_HERE` with your actual spreadsheet ID from Step 1
7. Click **Save**

## Step 3: Deploy the Web App

1. In the Apps Script editor, click **Deploy** > **New deployment**
1. For "Select type", choose **Web app**
1. Set the following configuration:
   - Description: Form Submission Handler
   - Execute as: Me (your Google account)
   - Who has access: Anyone, even anonymous
1. Click **Deploy**
1. You will be asked to authorize the app. Click through the authorization steps.
1. After successful deployment, you'll see a URL like:

```javascript
https://script.google.com/macros/s/LONG_ID_HERE/exec
```

1. Copy this URL - this is your web app URL that the form will submit data to

## Step 4: Update Your Website Code

1. Open the `hero-section.tsx` file in your project
1. Find the `handleSubmit` function
1. Replace the `scriptUrl` variable with your web app URL from Step 3
1. Save the changes

## Step 5: Test the Form

1. Launch your website in development mode (`npm run dev`)
1. Fill out the form with test data and submit
1. Check your Google Sheet to see if the data was recorded
1. If the submission doesn't appear, check the browser console for any errors

## Troubleshooting

If your form isn't submitting data correctly:

1. **Check the URL**: Make sure the Apps Script URL is correct in the `handleSubmit` function.

1. **Google Apps Script Logs**: In the Apps Script editor, go to **Execution** > **View logs** to see if there are any error messages.

1. **Browser Console**: Open the browser's developer tools (F12) and check the console for any JavaScript errors.

1. **CORS Issues**: If you're seeing CORS errors in the console:
   - Make sure the Apps Script has the CORS headers set correctly (already included in the provided script)
   - Try the no-cors fallback approach that's already implemented

1. **Redeployment**: If you make changes to the Apps Script, you'll need to create a new deployment for the changes to take effect. Each new deployment will have a new URL.

## Additional Notes

- The form uses a fallback mechanism if CORS fails, which is common with Google Apps Script
- Form data is validated on the client side before submission
- Successful submissions will clear the form and show a success message
- Errors during submission will show an error message

If you need further assistance, please contact your developer.

### Testing the Form

1. Fill out and submit the form on your website
1. Watch for a successful submission
1. Check your Google Sheet to see if the data was added. Keep in mind it may take a few seconds to appear

- **Invalid URL**: Double-check that the Web App URL you copied from Google Apps Script is correct and properly integrated into your code.
- **CORS error**: This is expected and normal. The form submission should still work even if you see CORS errors.
- **Too much traffic**: Google Apps Script has usage limits. If you're getting a lot of form submissions, you might need to upgrade to a paid solution.
