const { google } = require('googleapis');

;
(async function() {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credential.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client })

    const spreadsheetId = "1DwifEH0vMqdAunQMDWnyFCJggemx3_UmJrf_UDTa0I4";

    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });


    // selecting rows
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Merchants!B:B",

    });
    console.log(getRows.data.values, "  getRows.data.values");


    // adding rows
    // const data = await googleSheets.spreadsheets.values.append({
    //     auth,
    //     spreadsheetId,
    //     range: "Лист1!A:C",
    //     valueInputOption: "USER_ENTERED",
    //     resource: {
    //         values: [
    //             ['2', 'Madiyor', 'Abdukhoshimov']
    //         ],
    //     },
    // });

})()