function main() {
  var SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/15FGeeJzEaqbWOIy4eYEYYSgeVsjN9I9UplSpDqmBIKo/edit?gid=0#gid=0';
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
