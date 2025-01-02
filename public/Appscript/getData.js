let doGet = (req) => {
    let doc = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = doc.getSheetByName("Sheet1");
    let values = sheet.getDataRange().getValues();
  
    let output = [];
    let key = [
      "name",
      "fatherName",
      "motherName",
      "email",
      "dob",
      "gender",
      "category",
      "phoneNo",
      "formNo",
      "cuetNo",
      "cuetMarks",
      "marksheet10th",
      "marksheet12th",
      "timestamp",
    ];
    for (let i = 0; i < values.length; i++) {
      let row = {};
      for (let j = 0; j < key.length; j++) {
        row[key[j]] = values[i][j];
      }
      output.push(row);
    }
    return ContentService.createTextOutput(
      JSON.stringify({ data: output })
    ).setMimeType(ContentService.MimeType.JSON);
  };
  