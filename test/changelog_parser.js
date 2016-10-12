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
      expect(json_changelog.versions[i]).to.have.all.keys('version_number', 'version', 'changes');
    }
  });

  it('changes should have the proper keys', function () {
    var i, j;
    var changes;

    for (i = 0; i < json_changelog.versions.length; ++i) {
      changes = json_changelog.versions[i].changes;

      for (j = 0; j < changes.length; ++j) {
        expect(changes[j]).to.have.all.keys('change', 'items');
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

  it('a changelog can be created from properly formatted JSON', function () {
    var json = {
      title: '# Example changelog',
      versions: [
        {
          version_number: '1.0.0',
          version: '## [1.0.0]',
          changes: [
            {
              change: '### Added',
              items: ['- Test item 1', '- Test item 2']
            },
            {
              change: '### Fixed',
              items: ['- Fix 1']
            },
            {
              change: '### Removed',
              items: ['- Removed this', '- Removed that', '- Removed them']
            }
          ]
        },
        {
          version_number: '0.1.0',
          version: '## [0.1.0]',
          changes: [
            {
              change: '### Added',
              items: ['- Test item 1']
            },
            {
              change: '### Removed',
              items: ['- Removed this', '- Removed that']
            }
          ]
        }
      ]
    };

    var generated_changelog = parser.toChangelog(json);
    var changelog_to_array = generated_changelog.split('\n');

    generated_changelog.length.should.equal(229);
    changelog_to_array.length.should.equal(26);

    changelog_to_array[0].should.equal('# Example changelog');
    changelog_to_array[2].should.equal('## [1.0.0]');
    changelog_to_array[4].should.equal('### Added');
    changelog_to_array[5].should.equal('- Test item 1');
    changelog_to_array[6].should.equal('- Test item 2');
    changelog_to_array[8].should.equal('### Fixed');
    changelog_to_array[9].should.equal('- Fix 1');
    changelog_to_array[11].should.equal('### Removed');
    changelog_to_array[12].should.equal('- Removed this');
    changelog_to_array[13].should.equal('- Removed that');
    changelog_to_array[14].should.equal('- Removed them');
    changelog_to_array[16].should.equal('## [0.1.0]');
    changelog_to_array[18].should.equal('### Added');
    changelog_to_array[19].should.equal('- Test item 1');
    changelog_to_array[21].should.equal('### Removed');
    changelog_to_array[22].should.equal('- Removed this');
    changelog_to_array[23].should.equal('- Removed that');
  });

  it('generated changelog has a newline at the end of file', function () {
    var json = {
      title: '# Example changelog',
      versions: [
        {
          version_number: '0.1.0',
          version: '## [0.1.0]',
          changes: [
            {
              change: '### Added',
              items: ['- Test item 1']
            }
          ]
        }
      ]
    };

    var generated_changelog = parser.toChangelog(json);
    var changelog_to_array = generated_changelog.split('\n');
    var last_line = changelog_to_array[changelog_to_array.length - 1];

    last_line.length.should.equal(0);
  });

  it('changelog created from a string should be defined', function () {
    var noeofPath = './test/TESTLOG.md';

    var json_changelog = parser.toJSON(noeofPath);
    var new_changelog = parser.toChangelog(json_changelog);

    parser.toJSONFromString(new_changelog).should.be.ok;
  });
});