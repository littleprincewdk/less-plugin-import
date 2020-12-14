/* eslint-disable no-param-reassign */
const parseOptions = require('./parse-options');
const usage = require('./usage');

const IMPORT_DECLARATION_REG = /^@import\s+(\((?:less|css|multiple|once|inline|reference|optional|,|\s)+\))?\s*['"](.+)['"]/g;

function LessPluginImport(options) {
  this.options = options;
}

LessPluginImport.prototype = {
  install(less, pluginManager) {
    const options = {
      defaultOption: 'once',
      keepReferenceImport: false,
      ...this.options,
    };

    const references = [];

    pluginManager.addPreProcessor({
      process(src) {
        src = src.replace(IMPORT_DECLARATION_REG, (importDeclaration, importOptions, filename) => {
          if (importOptions) {
            if (importOptions.includes('reference')) {
              references.push(importDeclaration);
            }
            return importDeclaration;
          }

          const declaration = `@import (${options.defaultOption}) "${filename}"`;
          if (options.defaultOption === 'reference') {
            references.push(declaration);
          }
          return declaration;
        });

        return src;
      },
    });
    if (options.keepReferenceImport) {
      pluginManager.addPostProcessor({
        process(css) {
          if (references.length) {
            const ext =
              typeof options.keepReferenceImport === 'string'
                ? options.keepReferenceImport
                : '.css';
            return `${references
              .map(declaration => {
                declaration = declaration
                  .replace(/\((less|css|multiple|once|inline|reference|optional|,|\s)+\)/, '')
                  .replace(/@import\s+/, '@import ')
                  .replace(/\.less/, ext);
                return declaration;
              })
              .join(';\n')};\n${css}`;
          }

          return css;
        },
      });
    }
  },
  printUsage() {
    usage.printUsage();
  },
  setOptions(options) {
    this.options = parseOptions(options);
  },
};

module.exports = LessPluginImport;
