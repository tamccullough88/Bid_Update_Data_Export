# Bid Update Data Export for Google Ads

This repository contains a Google Ads Script designed to automate the process of exporting product group performance data and applying bid adjustments based on predefined performance metrics. The script interacts with Google Ads to gather essential campaign and ad group data and then processes this information, applying bid adjustments in an efficient manner. It outputs the results into a Google Sheet for further analysis and decision-making.

## Features

- **Automated Data Export**: Exports product group performance data from Google Ads to a Google Sheet, including metrics like clicks, conversions, cost, and ROAS.
- **Bid Adjustment Calculation**: The script adjusts bids based on specific performance thresholds, helping users optimize their bids automatically.
- **Customizable Logic**: The bid adjustment formula is customizable to fit different campaign goals, such as increasing or decreasing bids based on click thresholds or performance metrics like Cost/Conv and ROAS.
  
## Code Overview

This repository includes a Google Ads script that pulls data from the Google Ads platform and writes it to a specified Google Sheet. The exported data is processed through a set of predefined rules (e.g., if clicks are below 10, the bid increases by $0.05) to provide automated bid recommendations.

### Key Components:
- **Google Ads Script**: The main script that interfaces with Google Ads and pulls campaign data.
- **Google Sheet Integration**: The script writes the exported data and bid recommendations directly to a Google Sheet.
- **Bid Adjustment Logic**: Built-in logic that uses formulas in the Google Sheet to adjust bids based on campaign performance.

## Where to Find the Code

You can find the code for the Google Ads script in the `Product_Group_Export_Script.js` file located in the repository. This script includes the logic for exporting data and applying bid adjustments.

### Script File:
- `Product_Group_Export_Script.js`

## Documentation

- **Code Documentation**: Each section of the script is commented to explain its purpose and functionality. For more detailed documentation, you can refer to the comments within the code itself.
- **Google Ads Script Documentation**: For more information on Google Ads Scripts and how they work, refer to the official [Google Ads Scripts Documentation](https://developers.google.com/google-ads/scripts/docs/overview).
- **Google Sheets Formula Documentation**: The formula for bid adjustments is applied within the Google Sheets file. Documentation for the formula can be found within the sheet itself.

## High-Level Overview of the Script

### What It Does:

1. **Exports Product Group Data**: The script connects to your Google Ads account and exports data related to product groups. This data includes campaign name, ad group name, clicks, conversions, cost, and other relevant performance metrics.

2. **Applies Bid Adjustments**: Based on performance data, the script applies a bid adjustment logic. If certain conditions are met, such as clicks being less than a specified threshold, the bid will be increased or decreased by a predetermined percentage.

3. **Outputs to Google Sheets**: The data is written into a Google Sheet, where it is organized by columns, including campaign, ad group, product group, and other key metrics. The sheet also contains the bid adjustment recommendations based on the script's logic.

### Example Logic:
- **Increase Bid by $0.05** if the number of clicks is less than 10.
- **Increase Bid by 15%** if Cost/Conv is less than 15 and ROAS is greater than 7.5.
- **Decrease Bid by 15%** if Cost/Conv is greater than 15 or ROAS is less than 7.5.

These rules can be adjusted within the Google Sheet’s formula, giving you flexibility over how bids are managed.

## Setup Instructions

1. **Clone this Repository**: Start by cloning the repository to your local machine or directly accessing it via GitHub.

2. **Set Up Google Ads Script**: Copy the script into the Google Ads Scripts editor in your Google Ads account. Refer to the [Google Ads Script Documentation](https://developers.google.com/google-ads/scripts/docs/overview) for more details on how to set up scripts in Google Ads.

3. **Configure the Google Sheet URL**: Ensure that the `SPREADSHEET_URL` variable in the script is updated to point to your Google Sheet, where the data will be exported.

4. **Authorize the Script**: Run the script in Google Ads for the first time and authorize access to both Google Ads and Google Sheets.

5. **Schedule the Script**: Optionally, set up a schedule in the Google Ads Script editor to run the script automatically at specified intervals (e.g., daily, weekly).

## Troubleshooting

If you encounter issues during setup or execution:
- **Check Permissions**: Ensure that your Google Ads account has the necessary permissions to run scripts and access Google Sheets.
- **Inspect Script Logs**: Use the logs within the Google Ads Scripts editor to identify any issues with data retrieval or processing.
- **Ensure Correct URL**: Double-check that the `SPREADSHEET_URL` in the script is correctly pointing to your Google Sheet.

## Conclusion

This repository provides an automated solution for exporting Google Ads product group data, analyzing it, and adjusting bids based on performance. It saves time in bid management and helps ensure that your bids are aligned with campaign goals, maximizing efficiency and campaign performance.

For further questions or issues, refer to the Google Ads Script Documentation or open an issue in this repository.

---

**Author**: [Thomas McCullough]  
**License**: MIT
