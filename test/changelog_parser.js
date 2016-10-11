var should = require('chai').should();
var parser = require('../changelog_parser');
var fs = require('fs');
var expect = require('chai').expect;

describe('#parser', function () {
  it('TESTLOG should have 60 lines', function () {
    var log = fs.readFileSync('./test/TESTLOG.md', 'utf8').split('\n');

    log.length.should.equal(60);
  });
});