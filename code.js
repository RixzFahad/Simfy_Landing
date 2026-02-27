const SHEET_ID = '1wsnAood14inAqIhkhzBW-zaYO6tEl5A_NrCkVTY7F9g';
const SHEET_NAME = 'Users';

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('SimFy Group Employee Portal')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function loginUser(data) {
  if (!data || !data.username || !data.password || !data.role) {
    throw new Error('Missing required fields');
  }

  const username = data.username.trim().toLowerCase();
  const password = data.password.trim();
  const role = data.role.trim().toLowerCase();

  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Users sheet not found');

    const dataRange = sheet.getDataRange().getValues();
    let found = false;

    for (let i = 1; i < dataRange.length; i++) {
      const row = dataRange[i];
      if (row[0]?.toString().trim().toLowerCase() === username &&
          row[1]?.toString().trim() === password &&
          row[2]?.toString().trim().toLowerCase() === role) {
        found = true;
        break;
      }
    }

    if (!found) throw new Error('Invalid username, password, or role');

    return {
      success: true,
      username,
      role,
      message: `Welcome back, ${username}! You are logged in as ${role}.`
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

// New functions for admin data fetching (assuming additional sheets exist)
// These return JSON data for the frontend to populate tables

function getEmployeeDetails() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName('Employees'); // Assume this sheet exists with headers in row 1
  if (!sheet) return [];
  return sheet.getDataRange().getValues();
}

function getPlotsDetails() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName('Plots'); // Assume exists
  if (!sheet) return [];
  return sheet.getDataRange().getValues();
}

function getPMSHistory() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName('PMS'); // Assume exists
  if (!sheet) return [];
  return sheet.getDataRange().getValues();
}

function getSites() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName('Sites'); // Assume exists
  if (!sheet) return [];
  return sheet.getDataRange().getValues();
}