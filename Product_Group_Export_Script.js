/**
 * Product Group Export Script for Google Ads
 *
 * This Google Ads Script exports product group data to a specified Google Sheet. The Google Sheet
 * includes calculations in the "Bid Adjustments" sheet to automatically update bid recommendations
 * based on performance metrics.
 *
 * Bid Adjustment Calculation:
 * The sheet applies this logic to recommend bid adjustments:
 * - Increase bid by $0.05 if clicks (column G) are < 10.
 * - Increase bid by 15% if cost per conversion (column I) < 15 and ROAS (column J) > 7.5.
 * - Decrease bid by 15% if cost per conversion > 15 or ROAS < 7.5.
 * - Keep bid the same if none of the above conditions are met.
 *
 * Setup Instructions:
 * 1. In Google Ads, go to Tools & Settings > Bulk Actions > Scripts.
 * 2. Create a new script and paste this code into the editor.
 * 3. Update the `SPREADSHEET_URL` variable below with your Google Sheet's URL.
 *    Example: const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1TL3KIB1_xpUxOkOnVHEYEqyDhDRGOcFBZr3xP5HxWCg/edit';
 * 4. Click 'Preview' for a test run, or 'Run' to execute the export.
 *
 * Note:
 * - The first run requires authorization for access to Google Ads and Google Sheets.
 * - Automate exports by setting a schedule in the Google Ads Scripts editor.
 * - Ensure the Google Sheet is accessible and configured with the correct columns.
 */

//Copy this spreadsheet: https://docs.google.com/spreadsheets/d/1TL3KIB1_xpUxOkOnVHEYEqyDhDRGOcFBZr3xP5HxWCg/edit?gid=0#gid=0

function main() {
  var SPREADSHEET_URL = 'Replace with URL of your copied spreadsheet';
  var SHEET_NAME = 'From_GAD';
  
  var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    Logger.log("Sheet with name '" + SHEET_NAME + "' not found. Please check the sheet name.");
    return;
  }
  
  sheet.clear();
  var headers = [
    "Campaign", "Ad group", "Product Group", "Current Max CPC", 
    "Clicks", "Cost", "Conversions", "Conv. value", "ROAS", "Impressions"
  ];
  sheet.appendRow(headers);
  
var report = AdsApp.report(
  'SELECT metrics.clicks, metrics.conversions, metrics.conversions_value, metrics.cost_micros, ' +
  'metrics.cost_per_conversion, ad_group_criterion.listing_group.case_value.product_item_id.value, ad_group.name, ad_group_criterion.cpc_bid_micros, metrics.impressions, ' +
  'campaign.name ' +
  'FROM product_group_view ' +
  'WHERE segments.date DURING LAST_30_DAYS AND campaign.status = "ENABLED" AND ad_group.status = "ENABLED" '
);
  
  var rows = report.rows();
  var dataExists = false;
  
  while (rows.hasNext()) {
    dataExists = true;
    var row = rows.next();
    
    var clicks = row['metrics.clicks'];
    var cost = row['metrics.cost_micros'] / 1e6; // Convert micros to standard units
    var conversions = row['metrics.conversions'];
    var conversionValue = row['metrics.conversions_value'];
    var roas = cost > 0 ? (conversionValue / cost) : 0; // Avoid division by zero
    var maxCpcMicros = row['ad_group_criterion.cpc_bid_micros'];
    var maxCpc = isNaN(maxCpcMicros) ? 0 : maxCpcMicros / 1e6; // Convert micros to standard units
    var Impr = row['metrics.impressions']
    
    sheet.appendRow([
      row['campaign.name'],
      row['ad_group.name'],
      row['ad_group_criterion.listing_group.case_value.product_item_id.value'], // Adjust based on the actual product group data available
      maxCpc.toFixed(2),
      clicks,
      cost.toFixed(2),
      conversions,
      conversionValue.toFixed(2),
      roas.toFixed(2),
      Impr
    ]);
  }
  
  if (!dataExists) {
    Logger.log('No data found for the selected criteria.');
  } else {
    Logger.log('Data successfully exported to Google Sheet: ' + SHEET_NAME);
  }
}
