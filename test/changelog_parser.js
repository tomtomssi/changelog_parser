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

  it('versions should have the proper keys', function () {
    var i;

    for (i = 0; i < json_changelog.versions.length; ++i) {
      expect(json_changelog.versions[i]).to.have.all.keys('version_number', 'version', 'changes', 'start', 'end');
    }
  });

  it('changes should have the proper keys', function () {
    var i, j;
    var changes;

    for (i = 0; i < json_changelog.versions.length; ++i) {
      changes = json_changelog.versions[i].changes;

      for (j = 0; j < changes.length; ++j) {
        expect(changes[j]).to.have.all.keys('change', 'items', 'start', 'end');
      }
    }
  });

  it('the version property should always be a string', function () {
    var versions = json_changelog.versions;
    var i;

    for (i = 0; i < versions.length; ++i) {
      expect(versions[i].version).to.be.a('string');
    }
  });

  it('the change property should always be a string', function () {
    var versions = json_changelog.versions;
    var version;
    var i, j;

    for (i = 0; i < versions.length; ++i) {
      version = versions[i];

      for (j = 0; j < version.changes.length; ++j) {
        expect(version.changes[j].change).to.be.a('string');
      }
    }
  });

  it('JSON is defined even if no line is present at the end of the changelog', function () {
    var noeofPath = './test/TESTLOG.md';

    var json_changelog = parser.toJSON(noeofPath);

    expect(json_changelog).to.be.ok;
  });

  it('the JSON is parsed properly even if no line is present at the end of the changelog', function () {
    var noeofPath = './test/TESTLOG.md';

    var json_changelog = parser.toJSON(noeofPath);

    json_changelog.versions.length.should.equal(5);

    expect(json_changelog.versions[4].changes[2].items[0]).to.be.ok;

    json_changelog.versions[4].changes[2].items[0].should.equal('- COBOL HTML files');
  });

  it('the JSON is parsed properly if a newline is present at the end of the changelog', function () {
    json_changelog.versions.length.should.equal(5);

    expect(json_changelog.versions[4].changes[2].items[0]).to.be.ok;

    json_changelog.versions[4].changes[2].items[0].should.equal('- COBOL HTML files');
  });
});