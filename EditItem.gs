function editSelectedItem() {
  const  ui = SpreadsheetApp.getUi();
  var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  var sheet_name =  spreadsheet.getActiveSheet().getName();
  if (sheet_name == 'Mail Templates' || sheet_name == 'Schedule' || sheet_name == 'Rules' ||
    sheet_name == 'Data Scope'){
    const htmlForSidebar = HtmlService.createTemplateFromFile("edit_selected_sidebar");
    const htmlOutput =  htmlForSidebar.evaluate();
    htmlOutput.setTitle("Edit - "+sheet_name)
    ui.showSidebar(htmlOutput);
  }
  else{
    ui.alert("This functionality is available for NON Read-Only sheets only which are Mail Templates, Schedule, " +
         "Rules, Data Scope ");
  }
}

function getSheetDetails(){  
  var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  var sheet =  spreadsheet.getActiveSheet();
  var selected_range = sheet.getActiveRange();
  var selected = selected_range.getValues();
  if (selected.length === 0) {
    throw new Error("No Row selected.");
  }
  if (selected.length > 1) {
    throw new Error("Many Row's selected.");
  }
  if (selected_range.getRow() == 1 || selected_range.getRow() == 2) { 
    throw new Error("Incorrect Row Selected");
  }
  var columns=sheet.getLastColumn() ;
  var header_values= sheet.getRange(2,1,1,columns).getValues()[0];
  var range_values=selected[0];
  
  // console.log(header_values);
  // console.log(range_values);
  var data = {};
  for (var i=0; i<header_values.length;i++){
    var val1=header_values[i];
    var json_flag = 0;
    try{
      var val2 = String(range_values[i].replace(/(\r\n|\n|\r)/gm,""));
      var json = JSON.parse(val2);
      json_flag = 1;
      json_keys = Object.keys(json);
      json_values = [];
      for (var j = 0; j <json_keys.length; j++){
        json_values.push(json[json_keys[j]]);
      }
      data[i]=[val1,range_values[i],json_flag,json_keys,json_values];
    }
    catch (error){
      json_flag = 0;
      data[i]=[val1,range_values[i],json_flag];
    }
  }
  data[header_values.length]=selected_range.getRow();
  Object(data);
  console.log(data);
  return data ;
}

function copy(data) {
  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getActiveSheet();
  var data_len=Object.keys(data).length;
  var output = [];
  for (var i = 0; i<data_len-1; i++){
    if (data[i][2] == 0){
      if (data[i][0].charAt(data[i][0].length-1) == '*' && data[i][1] == ""){
        throw new Error("Mandatory fields not specified.")
      }
    }
  }
  for (var i = 0; i<data_len-1; i++){
    if (data[i][2] == 0){
      output.push(data[i][1]);
    }
    else{
      var json_output ={};
      for (var j = 0; j < data[i][3].length; j++){
        json_output[data[i][3][j]] = data[i][4][j]; 
      }
      json_output = JSON.stringify(json_output);
      json_output= json_output.replace(/({)/gm,"{\n");
      json_output= json_output.replace(/(",)/gm,"\",\n");
      json_output= json_output.replace(/(})/gm,"\n}");
      output.push(json_output);
    }
  }
  output=[output];
  var range=sheet.getRange(data[data_len-1],1,1,data_len-1);
  Logger.log(output);
  range.setValues(output);
  
}

function deleteSelectedRow(data) {
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt("Are you Sure you want to delete the row", 'Type "YES" to Confirm.', ui.ButtonSet.OK_CANCEL);
  if (response.getSelectedButton() == ui.Button.OK) {
    confirm_text = response.getResponseText();
    if (confirm_text == "YES"){
        var spreadsheet = SpreadsheetApp.getActive();
        var sheet = spreadsheet.getActiveSheet();
        var data_len=Object.keys(data).length;
        sheet.deleteRow(data[data_len-1]);
      }
      else{
        ui.alert("Deletion Failed.");
      }
    } 
  else if (response.getSelectedButton() == ui.Button.CANCEL) {
      Logger.log('The user cancelled  the request.');
      // insertTelemetry("Menu Click","deleteWorkspaces",Session.getActiveUser().getEmail(),"Completed Execution",
      //         "User cancelled the operation","");
    } 
  else {
      Logger.log('The user clicked the close button in the dialog\'s title bar.');
      // insertTelemetry("Menu Click","deleteWorkspaces",Session.getActiveUser().getEmail(),"Completed Execution",
      //         "Usr clicked the close button","");
    }  
}