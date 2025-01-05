let doGet = (req) => {
    let doc = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = doc.getSheetByName("loginDetails");
    let values = sheet.getDataRange().getValues();
  
    let output = [];
    let key = [
      "name",
      "username",
      "email",
      "password",
    ];
    for (let i = 0; i < values.length; i++) {
      let row = {};
      for (let j = 0; j < key.length; j++) {
        if(i!=0 && j==3){
          let encypt = values[i][j];
          let password="";
          let rev = encypt.split('').reverse();
          let other = ["7","e", "8", "t", "s", "#", "&", "$", "a", "b"]
          for(let i=0; i<rev.length; i++){
            password += (other[i]+rev[i]);
          }
          row[key[j]] = password;
          continue;
        }
        row[key[j]] = values[i][j];
      }
      output.push(row);
    }
    return ContentService.createTextOutput(
      JSON.stringify({ data: output })
    ).setMimeType(ContentService.MimeType.JSON);
  };
  