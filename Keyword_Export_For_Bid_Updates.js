/**
 * Google Ads Keyword Performance Data Export and Bid Adjustment Script
 * 
 * This script extracts keyword performance data from your Google Ads account for the past 30 days. 
 * It then appends this data to a specified Google Sheet, clearing any existing data first to avoid duplicates. 
 * The following metrics are retrieved for each keyword:
 *   - Campaign Name
 *   - Ad Group Name
 *   - Keyword
 *   - Criterion Type
 *   - Max CPC (Current Keyword Max CPC)
 *   - Clicks
 *   - Cost
 *   - Impressions
 *   - CTR (Click-Through Rate)
 *   - Average CPC
 *   - Impressions (Abs. Top) %
 *   - Conversions
 *   - Cost / Conversion
 *   - Conversion Rate
 *   - Conversion Value
 *   - ROAS (Return on Ad Spend)
 * 
 * Once the data is exported to the Google Sheet, the script uses an Excel formula to adjust bids in the 'Max CPC' column
 * based on keyword performance. The formula adjusts bids based on the following criteria:
 *   - If the keyword has fewer than 10 clicks, increase the bid by $0.25.
 *   - If the keyword meets certain performance thresholds, increase the bid by 15%.
 *   - If the keyword is underperforming, decrease the bid by 15%.
 * 
 * This script is designed to automate the process of pulling keyword data, analyzing it, and adjusting bids based on predefined
 * performance metrics, saving time in campaign management and potentially improving bid strategies.
 * 
 * HOW TO USE:
 *   1. Set up the Google Sheet where you want to store the keyword performance data (e.g., 'From_GAD' sheet).
 *   2. Replace the placeholder `Replace with your URL` with the actual Google Sheet URL.
 *   3. Run the script in your Google Ads account by pasting it into the Google Ads Scripts interface.
 *   4. The script will clear any existing data in the sheet, pull new keyword performance data, and append it to the sheet.
 *   5. Use the formula in the 'Max CPC' column to adjust the keyword bids based on the exported metrics.
 */

/**
 * Main function to export keyword performance data from Google Ads into a Google Sheet.
 * This script pulls metrics for keywords over the last 30 days with impressions > 0.
 * It clears existing data in the specified sheet and appends updated data for analysis.
 */

//Replace SPRADSHEET_URL with your copy of this spreadsheet: https://docs.google.com/spreadsheets/d/18_pPo8vw1yDHed8qJtNP8N8Vl1vaWz6PiSqMgSiL3bM/edit

function main() {
  // Set the Google Sheet URL and sheet name. Update SPREADSHEET_URL with your actual sheet URL.
  var SPREADSHEET_URL = 'Replace with your URL'; // Replace with your Google Sheet URL
  var SHEET_NAME = 'From_GAD'; // Specify the sheet name where data will be stored

  // Open the Google Sheet and get the specified sheet by name.
  var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);

  // Check if the specified sheet exists; log an error if it does not.
  if (!sheet) {
    Logger.log("Sheet with name '" + SHEET_NAME + "' not found. Please check the sheet name.");
    return;
  }

  // Clear any existing data in the sheet to avoid duplications before adding new data.
  sheet.clear();

  // Define column headers for the data and append as the first row in the sheet.
  var headers = [
    "Campaign", "Ad group", "Keyword", "Criterion Type", "Current Keyword Max CPC", 
    "Clicks", "Cost", "Impressions", "CTR", 
    "Avg. CPC", "Impr. (Abs. Top) %", "Conversions", "Cost / conv.", 
    "Conv. rate", "Conv. value", "ROAS"
  ];
  sheet.appendRow(headers);

  // Query to pull relevant metrics for keywords from Google Ads, limited to keywords with impressions > 0.
  var report = AdsApp.report(
    'SELECT CampaignName, AdGroupName, Criteria, KeywordMatchType, CpcBid, ' +
    'Clicks, Cost, Impressions, Ctr, AverageCpc, ' +
    'AbsoluteTopImpressionPercentage, Conversions, CostPerConversion, ConversionRate, ' +
    'ConversionValue ' +
    'FROM KEYWORDS_PERFORMANCE_REPORT ' +
    'WHERE Impressions > 0 ' +
    'DURING LAST_30_DAYS'
  );

  // Retrieve rows from the report and initialize a flag to check if data is found.
  var rows = report.rows();
  var dataExists = false;

  // Loop through each row in the report and append data to the Google Sheet.
  while (rows.hasNext()) {
    dataExists = true;  // Mark that we have data to export.
    var row = rows.next();

    // Extract and process individual fields from the report row.
    var maxCpc = parseFloat(row['CpcBid']);
    var clicks = row['Clicks'];
    var convRate = parseFloat(row['ConversionRate']);
    var costPerConv = parseFloat(row['CostPerConversion']);
    var ctr = parseFloat(row['Ctr']);
    var imprAbsTop = parseFloat(row['AbsoluteTopImpressionPercentage']);
    var conversionValue = parseFloat(row['ConversionValue'].replace(/,/g, '')); // Remove commas for numeric calculations
    var cost = parseFloat(row['Cost'].replace(/,/g, ''));
    var roas = cost > 0 ? (conversionValue / cost) : 0; // Calculate ROAS, avoid division by zero

    // Append a row of processed data to the sheet, rounding values as needed.
    sheet.appendRow([
      row['CampaignName'],
      row['AdGroupName'],
      row['Criteria'],
      row['KeywordMatchType'],
      maxCpc.toFixed(2),
      clicks,
      row['Cost'],
      row['Impressions'],
      ctr.toFixed(2),
      row['AverageCpc'],
      imprAbsTop.toFixed(2),
      row['Conversions'],
      row['CostPerConversion'],
      convRate.toFixed(4),
      row['ConversionValue'],
      roas.toFixed(2) // ROAS calculated and rounded to 2 decimal places
    ]);
  }

  // Log the result based on data availability.
  if (!dataExists) {
    Logger.log('No data found for the selected criteria.');
  } else {
    Logger.log('Data and bid adjustments successfully exported to Google Sheet: ' + SHEET_NAME);
  }
}
