var fs = require('fs');
var exists = fs.existsSync;
var mkdir = fs.mkdirSync;

var browserify = require('browserify');
var jade = require('jadeify');

var log = require('debug')('spa-boilerplate:build');

var settings = { 'jade': { compileDebug: true, pretty: true } }

if (!exists('dist')) mkdir('dist');

// JavaScript bundle
log('starting JavaScript bundle');
browserify(['lib/main.js'])
  .transform(jade, settings.jade)
  .bundle(function (err, code) {
    if (err) return console.error(err.message);
    fs.writeFileSync('dist/dist.js', code);
    log('bundle wrote successfully');
  });