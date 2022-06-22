function createMenu(){
  const ui = SpreadsheetApp.getUi();

  //GTIN, EAN/UPC, GLN, GPC, SSCC etc.
  ui.createMenu('GS1 Compliance Tool')
  .addItem('Connect to Source Systems','CheckAllConnectionCall')
  .addSeparator()
  .addItem('Scan Data for GTIN Compliance ','GenerateRulesCall')
  .addItem('Scan Data for EAN Compliance','GenerateMetadataCall')
  .addItem('Scan Data for GLN Compliance','GenerateMetadataCall')
  .addItem('Scan Data for GPC Compliance','GetPreviewCall')
  .addItem('Scan Data for SSCC Compliance','TransferDataCall')
  .addSeparator()
  .addItem('Edit Selected Item','editSelectedItem')
   .addSeparator()
  .addItem('Compliance Summary','ComplianceSummary')
  .addSeparator()
  .addItem('About','aboutComplianceTool')
  .addToUi();
  
}

function onOpen(){
  createMenu();
}
