const path = require('path');
const fs = require('fs');
const less = require('less');
const LessPluginImport = require('../lib');

async function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, filename), (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data.toString());
    });
  });
}

function createOptions(options) {
  return {
    paths: ['test/less'],
    plugins: [new LessPluginImport(options)],
  };
}

test('option defaultOption=reference', async () => {
  const fixture = await readFile('./less/index.less');
  const { css } = await less.render(fixture, createOptions({ defaultOption: 'reference' }));
  const expected = `a {
  color: blue;
}
`;
  expect(css).toBe(expected);
});

test('option defaultOption=reference keepReferenceImport=true', async () => {
  const fixture = await readFile('./less/index.less');
  const { css } = await less.render(
    fixture,
    createOptions({ defaultOption: 'reference', keepReferenceImport: true }),
  );
  const expected = `@import "./base.css";
a {
  color: blue;
}
`;
  expect(css).toBe(expected);
});

test('option defaultOption=reference keepReferenceImport=.wxss', async () => {
  const fixture = await readFile('./less/index.less');
  const { css } = await less.render(
    fixture,
    createOptions({ defaultOption: 'reference', keepReferenceImport: '.wxss' }),
  );
  const expected = `@import "./base.wxss";
a {
  color: blue;
}
`;
  expect(css).toBe(expected);
});
