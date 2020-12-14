module.exports = {
  printUsage: function() {
    console.log('');
    console.log('Import');
    console.log('specify plugin with --import');
    this.printOptions();
    console.log('');
  },
  printOptions: function() {
    console.log('we support the following options... "defaultOption", "keepReferenceImport"');
  },
};
