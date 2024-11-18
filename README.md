# Product Group Bid Update Data Export for Google Ads

This Google Ads Script, `Product_Group_Export_Script.js`, exports product group bid data from Google Ads to a Google Sheet. The sheet includes automated bid adjustment calculations based on various performance metrics, allowing for dynamic updates to bid recommendations.

## Features
- Extracts relevant product group data from Google Ads.
- Exports data to a Google Sheet that includes automated calculations for bid adjustments.
- Simplifies bid management and adjustment processes by consolidating data and calculations in a single sheet.

## Bid Adjustment Calculation Logic

The "Bid Adjustments" sheet within the linked Google Sheet uses the following formula to adjust bids based on performance metrics:

```excel
=IF(G2<10, E2+0.05, IF(AND(I2<15, J2>7.5), E2*1.15, IF(OR(I2>15, J2<7.5), E2*0.85, E2)))
```
## Explanation

- **Increase Bid by $0.05** if Clicks (column G) are less than 10.
- **Increase Bid by 15%** if Cost/Conv (column I) is less than 15 and ROAS (column J) is greater than 7.5.
- **Decrease Bid by 15%** if Cost/Conv (column I) is greater than 15 or ROAS (column J) is less than 7.5.
- **Keep Bid the Same** if none of the above conditions are met.

## Data Columns in the Google Sheet

The exported data from Google Ads is organized into the following columns:

- **Campaign**: Campaign name.
- **Ad group**: Ad group name.
- **Product Group**: The product group identifier.
- **Max CPC**: The maximum cost-per-click bid specified in Google Ads.
- **Current Max CPC**: The current bid that will be evaluated for adjustments.
- **Cost**: Total cost incurred for the product group.
- **Clicks**: Number of clicks received.
- **Conversions**: Number of conversions achieved.
- **Cost/Conv**: Cost per conversion, calculated as Cost / Conversions.
- **ROAS**: Return on ad spend, calculated as Revenue / Cost if applicable.

The calculated bid adjustments will be visible in the "Bid Adjustments" sheet, providing recommendations for adjusting bids based on performance metrics.

## Getting Started

### Prerequisites

- Access to a Google Ads account with sufficient permissions to run scripts.
- A Google Sheet set up to receive exported data. You can use this [template sheet](https://docs.google.com/spreadsheets/d/1TL3KIB1_xpUxOkOnVHEYEqyDhDRGOcFBZr3xP5HxWCg/edit?gid=0#gid=0), which includes the bid adjustment calculations.

### Installation

#### Add the Script in Google Ads
1. In your Google Ads account, navigate to **Tools & Settings > Bulk Actions > Scripts**.
2. Create a new script and paste the contents of `Product_Group_Export_Script.js` into the editor.

#### Authorize the Script
1. Run the script for the first time to trigger authorization prompts for Google Ads and Google Sheets access.

#### Configure the Google Sheet
1. Update the `SPREADSHEET_URL` variable in the script with the URL of your Google Sheet where data will be exported.

### Running the Script

#### Run Manually
- In the Google Ads Scripts editor, click **Preview** to check the output, or **Run** to execute the script and send data to the Google Sheet.

#### Schedule the Script
- To automate data exports, schedule the script:
  - Click on the **Run type** dropdown in the Google Ads Scripts editor and choose your preferred frequency.

### Troubleshooting

If issues arise:
- Ensure the Google Sheet URL is correct and accessible.
- Confirm that your Google Ads account has the necessary permissions.
- Use the logs within the Google Ads Script editor for additional troubleshooting.

---------------------------------------------------------------------------------------


# Google Ads Keyword Performance Data Export and Bid Adjustment

## Overview

This Google Ads script exports keyword performance data into a Google Sheet and applies bid adjustments based on predefined conditions. It pulls data from the last 30 days, filters it based on impressions, and appends metrics such as clicks, conversions, CTR, cost per conversion, and ROAS (Return on Ad Spend) to the specified Google Sheet. Additionally, a custom formula is included in the Google Sheet to adjust bids based on certain performance metrics.

### Key Features:
- **Export keyword performance data**: Retrieves Google Ads keyword data for the last 30 days.
- **Bid adjustments**: Automatically calculates new bids based on conditions specified in the spreadsheet formula.
- **Dynamic data updates**: The script clears the old data and appends the latest keyword performance.

## Script Setup

### Prerequisites
Before using this script, ensure that:
1. You have access to the Google Ads account where the data will be pulled from.
2. You have a Google Sheets document where the keyword data will be stored.
3. The `Bid Updates` sheet is available in your Google Sheets document with the necessary columns as outlined below.

### Setup Steps

1. **Make a Copy of the Google Sheet**:
   - Open the following Google Sheet template:  
     [Google Sheet Template](https://docs.google.com/spreadsheets/d/18_pPo8vw1yDHed8qJtNP8N8Vl1vaWz6PiSqMgSiL3bM)
   - Make a copy of the sheet by selecting **File** > **Make a Copy**.
   - Save the copy to your Google Drive.

2. **Update the Script**:
   - Copy the script below into your Google Ads Scripts interface.
   - Replace the placeholder `Replace with your URL` in the script with the URL of your Google Sheet:
     ```javascript
     var SPREADSHEET_URL = 'Replace with your URL';  // Replace with your Google Sheet URL
     ```
   - Ensure the `SHEET_NAME` is set to the name of the sheet where data will be exported (default is `From_GAD`).

3. **Add Bid Adjustment Formula**:
   - After the script runs, it will append the data to your Google Sheet. Apply the following formula in the `Max CPC` column (adjust it based on your needs):
     ```excel
     =IF(G2<10, F2+0.25, IF(AND(H2>2, I2<75, J2>3, K2>0.5, L2>4), F2*1.15, IF(OR(H2<2, I2>75, J2<2, K2<0.3, L2<3), F2*0.85, F2)))
     ```
- **Formula Breakdown**:
     - `G2<10`: If the keyword has fewer than 10 clicks, increase the bid by $0.25. You can change this threshold to suit your needs (e.g., `<20` for more clicks).
     - `H2>2, I2<75, J2>3, K2>0.5, L2>4`: If the keyword performs well in conversion-related metrics (e.g., Conversion Rate `H2`, Cost/Conv. `I2`, etc.), increase the bid by 15%. You can adjust these values if you have different performance criteria.
     - `H2<2, I2>75, J2<2, K2<0.3, L2<3`: If the keyword is underperforming (e.g., low Conversion Rate or high Cost/Conv.), decrease the bid by 15%. These thresholds can also be modified based on your specific performance needs.
     - `F2`: The original Max CPC value that is being adjusted based on the conditions.

   - **Customizing the Formula**:
     - To **increase** bids for keywords with **higher clicks**, change the `G2<10` condition to a higher threshold (e.g., `G2<20` for 20 clicks).
     - To adjust the **increase/decrease percentage** (currently 15%), you can modify the `F2*1.15` (for increase) or `F2*0.85` (for decrease) part of the formula. For example, use `F2*1.2` for a 20% increase or `F2*0.9` for a 10% decrease.
     - If you want to adjust the bid based on **different metrics** (e.g., Cost/Conversion, Conversion Rate), change the column references `H2`, `I2`, `J2`, `K2`, and `L2` to other columns that are more relevant for your needs.

   
### How to Run the Script

1. Go to your Google Ads account.
2. In the Google Ads UI, navigate to `Tools & Settings` > `Scripts`.
3. Click on `+` to create a new script.
4. Paste the code from the script section into the editor.
5. Save the script and click `Preview` to ensure it's working.
6. Once you confirm the script is correct, click `Run` to execute it.

## How the Script Works

### Data Retrieval
The script queries the Google Ads account to retrieve the following keyword performance metrics for the last 30 days:
- Campaign Name
- Ad Group Name
- Keyword
- Criterion Type
- Max CPC (Current Keyword Max CPC)
- Clicks
- Cost
- Impressions
- CTR (Click-Through Rate)
- Average CPC
- Impressions (Abs. Top) %
- Conversions
- Cost / Conversion
- Conversion Rate
- Conversion Value
- ROAS (Return on Ad Spend)

### Appending Data to Google Sheets
The script retrieves this data and appends it as a new row in the specified Google Sheet (in the `From_GAD` sheet). Each metric is rounded and formatted as needed.

### Bid Adjustment Logic in the Spreadsheet
The script relies on the formula provided in the `Max CPC` column to adjust the bid based on:
- The **number of clicks** (G2),
- **conversion rate**, **cost per conversion**, **CTR**, and other key performance metrics.
  
The formula is designed to:
- Increase bids for keywords with a higher conversion rate and a positive performance history.
- Decrease bids for keywords that are underperforming (e.g., low conversion rate or high cost per conversion).

## Customization

- **Sheet URL**: Update the script with the URL of your own Google Sheet where the data will be exported.
- **Formula Customization**: Modify the formula to adjust bids based on your preferred conditions. You can alter thresholds or the way the bid is adjusted (e.g., increase by a percentage rather than a flat value).
  
### Example Formula Logic:
- If there are fewer than 10 clicks (G2 < 10), increase the bid by $0.25 (F2 + 0.25).
- If the keyword performs well according to specific conversion metrics (e.g., Conv. rate > 2, Cost / conv. < 75), increase the bid by 15% (F2 * 1.15).
- If the keyword is underperforming based on certain thresholds (e.g., Conv. rate < 2, Cost / conv. > 75), decrease the bid by 15% (F2 * 0.85).

## Troubleshooting

- **Error in script**: Check the Google Ads Logs for any issues. Common errors may include incorrect spreadsheet URL or access issues.
- **No data found**: Ensure your Google Ads account has keywords with impressions for the last 30 days.

## Conclusion

This script will help automate the process of pulling keyword performance data from Google Ads, analyzing it, and adjusting bids based on predefined metrics. This should save time in campaign management while improving bidding strategies for better performance.

For any further questions or troubleshooting, please refer to the [Google Ads Script Documentation](https://developers.google.com/google-ads/scripts/docs/overview).

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

For any questions or further assistance, please reach out to tamccullough88@gmail.com.

