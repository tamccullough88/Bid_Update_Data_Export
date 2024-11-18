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

## Explanation of the Formula

- **Increase Bid by $0.05** if Clicks (column G) are less than 10.
- **Increase Bid by 15%** if Cost/Conv (column I) is less than 15 and ROAS (column J) is greater than 7.5.
- **Decrease Bid by 15%** if Cost/Conv (column I) is greater than 15 or ROAS (column J) is less than 7.5.
- **Keep Bid the Same** if none of the above conditions are met.

This formula helps to adjust bids automatically based on keyword performance, allowing for easier bid management.

## Data Columns in the Google Sheet

The exported data from Google Ads will be organized into the following columns in your Google Sheet:

- **Campaign**: The name of the campaign.
- **Ad group**: The name of the ad group.
- **Product Group**: The product group identifier.
- **Max CPC**: The maximum cost-per-click bid specified in Google Ads.
- **Current Max CPC**: The current bid that will be evaluated for adjustments.
- **Cost**: Total cost incurred for the product group.
- **Clicks**: Number of clicks received.
- **Conversions**: Number of conversions achieved.
- **Cost/Conv**: Cost per conversion, calculated as Cost / Conversions.
- **ROAS**: Return on ad spend, calculated as Revenue / Cost.

The calculated bid adjustments will be visible in the "Bid Adjustments" sheet, providing recommendations for adjusting bids based on performance metrics.

## Getting Started

### Prerequisites

Before you begin, make sure you have the following:

- Access to a Google Ads account with sufficient permissions to run scripts.
- A Google Sheet set up to receive exported data. You can use this [template sheet](https://docs.google.com/spreadsheets/d/1TL3KIB1_xpUxOkOnVHEYEqyDhDRGOcFBZr3xP5HxWCg/edit?gid=1651756630#gid=1651756630), which includes the bid adjustment calculations.

## Setup Steps

### Step 1: Make a Copy of the Google Sheet Template

1. Open the following Google Sheet template:  
   [Template Google Sheet](https://docs.google.com/spreadsheets/d/1TL3KIB1_xpUxOkOnVHEYEqyDhDRGOcFBZr3xP5HxWCg/edit?gid=1651756630#gid=1651756630)
2. Click **File > Make a Copy** to create a copy of the sheet in your Google Drive.
3. The formula for bid adjustments is already set up in the sheet, so you don’t need to modify it unless you want to adjust the logic.

### Step 2: Add the Script in Google Ads

1. In your Google Ads account, navigate to **Tools & Settings > Bulk Actions > Scripts**.
2. Click **+** to create a new script.
3. Paste the contents of the `Product_Group_Export_Script.js` into the script editor.

### Step 3: Authorize the Script

1. When running the script for the first time, it will prompt you to authorize access to both Google Ads and Google Sheets.
2. Click **Allow** to grant the necessary permissions.

### Step 4: Configure the Google Sheet URL in the Script

1. Open the script in Google Ads and locate the `SPREADSHEET_URL` variable.
2. Replace the placeholder `'Replace with URL of your copied spreadsheet'` in the script with the URL of the copied Google Sheet.
   - You can find the URL of the copied sheet in your browser’s address bar when the sheet is open.

### Step 5: Run the Script

1. In the Google Ads Scripts editor, click **Preview** to ensure the script works as expected. This allows you to check the output before actually running it.
2. If everything looks good, click **Run** to execute the script and send the data to the Google Sheet.

### Step 6: Schedule the Script (Optional)

To automate the data export and bid adjustment process:

1. Click on the **Run type** dropdown in the Google Ads Scripts editor.
2. Choose your preferred frequency (e.g., daily, weekly) for the script to run automatically.
3. Set the script to run at a time that works best for you.

## Troubleshooting

If any issues arise, here are some common troubleshooting steps:

- **Incorrect Sheet URL**: Ensure that the URL in the script matches the URL of your copied Google Sheet.
- **Permissions**: Make sure your Google Ads account has the necessary permissions to run scripts and access the Google Sheet.
- **Script Errors**: Use the logs within the Google Ads Script editor to identify any issues that occur during execution. You can view detailed error messages in the log for further debugging.

## How the Script Works

### Data Retrieval

The script retrieves the following performance metrics for product groups over the last 30 days:

- **Campaign Name**: The campaign associated with the product group.
- **Ad Group Name**: The ad group associated with the product group.
- **Product Group**: The product group identifier.
- **Max CPC**: The maximum cost-per-click bid specified in Google Ads.
- **Clicks**: The total number of clicks received for the product group.
- **Cost**: The total cost incurred for the product group.
- **Conversions**: The number of conversions achieved by the product group.
- **Cost/Conv**: Cost per conversion, calculated as Cost / Conversions.
- **ROAS**: Return on ad spend, calculated as Revenue / Cost.

The script processes this data and exports it to your Google Sheet.

### Bid Adjustment Formula in Google Sheets

In the "Bid Adjustments" sheet, the formula automatically adjusts bids based on performance metrics:

- **Clicks (Column G)**: If clicks are below 10, the bid increases by $0.05.
- **Cost/Conv (Column I) and ROAS (Column J)**: If cost per conversion is below 15 and ROAS is above 7.5, the bid increases by 15%. If cost per conversion is above 15 or ROAS is below 7.5, the bid decreases by 15%.
- **Bid Calculation**: The formula adjusts the current bid (Column E) based on these criteria.

You can adjust the thresholds (e.g., change `G2<10` to `G2<20`) and bid changes (e.g., change `E2*1.15` to a different percentage) based on your specific campaign goals.

## Conclusion

This script automates the process of exporting product group data from Google Ads, analyzing it, and adjusting bids based on predefined metrics. This approach saves time in bid management and helps ensure that your bids are aligned with the performance of your campaigns.

For further questions or troubleshooting, please refer to the [Google Ads Script Documentation](https://developers.google.com/google-ads/scripts/docs/overview).


For any further questions or troubleshooting, please refer to the [Google Ads Script Documentation](https://developers.google.com/google-ads/scripts/docs/overview).

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

For any questions or further assistance, please reach out to tamccullough88@gmail.com.

