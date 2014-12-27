'use strict';

var path = require('path');
var fs = require('fs');
var ejs = require('ejs');

var rawTemplate = fs.readFileSync(
  path.join(__dirname, 'config_template.ejs'),
  { encoding: 'utf8' }
);
var compiledTemplate = ejs.compile(rawTemplate, {open: '{{', close: '}}'});

exports.generate = function(config) {
  return compiledTemplate(config);
};

function toFullPath(p, type, required) {
  var fullPath = path.resolve(p);
  if (fs.existsSync(fullPath) || !required) {
    return fullPath;
  }
  var error = ' (' + type + ' path): is required, but invalid.'
  throw fullPath + error;
}