# Bid Update Data Export and Adjustment Scripts

## Overview

This repository provides Google Ads scripts to automate the export of performance data and enable dynamic bid adjustments for keywords and product groups. The scripts are designed to save time, improve efficiency, and optimize bidding strategies based on key performance metrics.

## Features

- **Keyword Performance Export**: Extracts keyword-level performance data, including clicks, conversions, cost, and ROAS, into a Google Sheet.
- **Product Group Performance Export**: Exports Shopping campaign product group data for analysis and bid adjustments.
- **Dynamic Bid Adjustments**: Utilizes Google Sheet formulas to recommend bid changes based on performance thresholds.
- **Customizable Logic**: Easily modify thresholds and formulas to align with campaign goals.
- **Automation**: Set up scheduled runs for continuous updates.

## Files

- `Keyword_Export_For_Bid_Updates.js`: Exports keyword performance data and integrates bid adjustment logic.
- `Product_Group_Export_Script.js`: Retrieves product group performance data and calculates bid adjustments.
- `Keyword_Adjustment_Readme.md`: Detailed setup and usage instructions for the keyword export script.
- `Shopping_Adjustment_README.md`: Detailed setup and usage instructions for the product group export script.

## Getting Started

1. **Copy the Google Sheet Templates**: Links to templates are in the `.md` files.
2. **Add the Scripts in Google Ads**: Paste the provided `.js` scripts into the Google Ads Scripts editor.
3. **Configure the Script**:
   - Update the Google Sheet URL in the script.
   - Customize formulas as needed in the Google Sheet.
4. **Run and Schedule**:
   - Test the script by running it in preview mode.
   - Set a schedule for regular updates.

## License

This project is licensed under the MIT License.

## Contact

For questions or assistance, reach out to [tamccullough88@gmail.com](mailto:tamccullough88@gmail.com).
