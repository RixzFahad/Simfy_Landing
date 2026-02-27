const SHEET_ID = '1wsnAood14inAqIhkhzBW-zaYO6tEl5A_NrCkVTY7F9g';
const SHEET_NAME = 'Users';

/**
 * Serves the main HTML page.
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('SimFy Group Employee Portal')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Authenticates a user against the Users sheet.
 * @param {Object} data - { username, password, role }
 * @returns {Object} - { success, username, role, message }
 */
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

// ===== HELPER: Generic sheet data fetcher =====

/**
 * Returns all rows from a given sheet as an array of arrays.
 * The first row is treated as headers.
 * @param {string} sheetName - Name of the sheet tab.
 * @returns {Array<Array>} - 2D array of cell values (empty array if sheet doesn't exist).
 */
function getSheetData_(sheetName) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) return [];
    return sheet.getDataRange().getValues();
  } catch (err) {
    Logger.log('Error reading sheet "' + sheetName + '": ' + err.message);
    return [];
  }
}

// ===== PUBLIC DATA ENDPOINTS =====

function getEmployeeDetails() {
  return getSheetData_('Employees');
}

function getPlotsDetails() {
  return getSheetData_('Plots');
}

function getPMSHistory() {
  return getSheetData_('PMS');
}

function getSites() {
  return getSheetData_('Sites');
}

/**
 * Returns summary counts for the admin dashboard stat cards.
 * @returns {Object} - { employees, plots, pms, sites }
 */
function getDashboardStats() {
  function countRows(sheetName) {
    const data = getSheetData_(sheetName);
    return data.length > 0 ? data.length - 1 : 0; // exclude header row
  }

  return {
    employees: countRows('Employees'),
    plots: countRows('Plots'),
    pms: countRows('PMS'),
    sites: countRows('Sites')
  };
}
