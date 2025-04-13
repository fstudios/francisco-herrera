# Form Submission Guide

This document explains how the form submission process works in the Francisco Herrera website.

## Overview

The website uses a form in the `hero-section.tsx` component to collect user information for ticket reservations. The form data is sent to a Google Apps Script, which then saves the data to a Google Sheet.

## Google Apps Script Details

- **Script URL**: `https://script.google.com/macros/s/AKfycbzH8pRKDN-e5yJoSYVKGn_iABHj0lzIbpi-rDvrnNedNLDuovy-SQJ0QTwUzNmukEjk/exec`
- **Google Sheet**: [Francisco Herrera - Form Submissions](https://docs.google.com/spreadsheets/d/1tgoXx-Ao6R6OfWn_dXRp0OdJXUzaPhGnloagaa3xj1U/edit?gid=617308715#gid=617308715)

## How It Works

1. The user fills out the form on the website
2. When they submit the form, the following happens:
   - The form data is validated (required fields are checked)
   - A temporary form is created in the DOM
   - The form is submitted using the GET method to the Google Apps Script URL
   - The Google Apps Script processes the data and saves it to the Google Sheet
   - A success message is displayed to the user

## Form Fields

The form collects the following information:

- `firstName` (required): User's first name
- `lastName` (required): User's last name
- `email` (required): User's email address
- `phone` (optional): User's phone number
- `message` (optional): Any additional message from the user

## Testing the Form

You can test the form submission in several ways:

1. **Using the website form**: Fill out and submit the form on the website
2. **Using the test form**: Open `test-form.html` in a browser and submit the test form
3. **Direct URL testing**: Use a URL with query parameters like:

   ```bash
   https://script.google.com/macros/s/AKfycbzH8pRKDN-e5yJoSYVKGn_iABHj0lzIbpi-rDvrnNedNLDuovy-SQJ0QTwUzNmukEjk/exec?firstName=Test&lastName=User&email=test@example.com&phone=123456789&message=TestMessage
   ```

## Troubleshooting

If form submissions are not appearing in the Google Sheet:

1. **Check the form data**: Make sure all required fields are filled out
2. **Check the Google Apps Script URL**: Ensure the URL is correct and the script is deployed
3. **Check permissions**: Make sure the Google Apps Script has permission to access the Google Sheet
4. **Check the browser console**: Look for any error messages in the browser console
5. **Try the alternative submission method**: Use the "If submission doesn't work..." link below the form

## Updating the Google Apps Script

If you need to update the Google Apps Script:

1. Go to the [Google Apps Script](https://script.google.com/home)
2. Open the project
3. Make your changes
4. Deploy a new version
5. Update the script URL in `hero-section.tsx`

## Updating the Google Sheet

If you need to update the Google Sheet:

1. Make sure the sheet has the correct columns:
   - Timestamp
   - First Name
   - Last Name
   - Email
   - Phone
   - Message
2. Update the `SPREADSHEET_ID` in the Google Apps Script if needed
