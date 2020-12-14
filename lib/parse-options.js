module.exports = options => {
  if (typeof options === 'string') {
    const optionArgs = options.split(' ');
    options = {};
    for (const i = 0; i < optionArgs.length; i++) {
      const argSplit = optionArgs[i].split('='),
        argName = argSplit[0].replace(/^-+/, '');
      switch (argName) {
        case 'defaultOption':
          options.defaultOption = argSplit[1];
          break;
        case 'keepReferenceImport':
          options.keepReferenceImport = argSplit[1];
          break;
        default:
          throw new Error('unrecognized import option "' + argSplit[0] + '"');
      }
    }
  }

  return options;
};
