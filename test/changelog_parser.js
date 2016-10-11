var should = require('chai').should();
var parser = require('../changelog_parser');
var fs = require('fs');
var expect = require('chai').expect;

describe('#parser', function () {
  var changelogPath = './test/TESTLOG.md';
  var json_changelog;

  beforeEach(function () {
    json_changelog = parser.toJSON(changelogPath);
  });
  
  it('TESTLOG should have 60 lines', function () {
    log = fs.readFileSync('./test/TESTLOG.md', 'utf8').split('\n');    
    log.length.should.equal(60);
  });

  it('json_changelog should be defined', function () {
    json_changelog.should.be.ok;
  });

  it('json_changelog should have 5 versions', function () {
    json_changelog.versions.length.should.equal(5);
  });
});