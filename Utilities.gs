
function aboutComplianceTool(){
  var html = HtmlService.createHtmlOutputFromFile('about').setWidth(1700).setHeight(1700);
  SpreadsheetApp.getUi().showModalDialog(html, 'Lets Understand GS1 Compliance Tool');
}


function ComplianceSummary(){
  var html = HtmlService.createHtmlOutputFromFile('Compliance').setWidth(1700).setHeight(1700);
  SpreadsheetApp.getUi().showModalDialog(html, 'Compliance Issues found in the Data Platform');
}





