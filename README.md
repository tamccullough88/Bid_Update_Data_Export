# Bid Update Data Export for Google Ads

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

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

For any questions or further assistance, please reach out to [your email or GitHub contact info].
