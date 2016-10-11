/* jslint node: true */
'use strict';

var fs = require('fs');
var versions;
var fileContent;
var lines;
var version_rx = /^#{2}(\s).+/;
var header_rx = /^#{3}(\s).+/;
var item_rx = /^-(\s).+/;
var version_number_rx = /(\d|[a-zA-Z]).(\d|[a-zA-Z]).(\d|[a-zA-Z])/;
var parsed_changelog = '';


exports.toJSON = function (path_to_changelog) {
    var json_changelog = {
        title: null,
        versions: versions
    };
    var i;
    var line;
    var versionBlock;
    fileContent = fs.readFileSync(path_to_changelog, "utf8");
    lines = fileContent.split('\n');
    versions = [];

    if (lines && lines.length > 0) {
        json_changelog.title = lines[0];

        for (i = 0; i < lines.length; ++i) {
            line = lines[i];

            if (version_rx.test(line)) {
                versionBlock = getVersion(i);
                versions.push(versionBlock);
                getChanges(versionBlock);
            }
        }
    }

    return json_changelog;
};

exports.toChangelog = function (json) {
    parsed_changelog = json.title + '\n\n';

    return compileVersions(json);
};

function compileVersions(json) {
    var i;

    for (i = 0; i < json.versions.length; ++i) {
        parsed_changelog += json.versions[i].version + '\n\n';

        compileChanges(json.versions[i]);
    }

    return parsed_changelog;
}

function compileChanges(version) {
    var i;

    for (i = 0; i < version.changes.length; ++i) {
        parsed_changelog += version.changes[i].change + '\n';

        compileChangeItems(version.changes[i].items);
    }
}

function compileChangeItems(changeItems) {
    var i;

    for (i = 0; i < changeItems.length; ++i) {
        parsed_changelog += changeItems[i] + '\n';
    }

    parsed_changelog += '\n';
}

function getVersion(lineNumber) {
    var versionBlock = {
        version_number: lines[lineNumber].match(version_number_rx)[0],
        version: lines[lineNumber].match(version_rx)[0],
        start: lineNumber,
        end: null,
        changes: []
    };

    return getRange(versionBlock.start, version_rx, versionBlock);
}

function compileChangeBlock(lineNumber) {
    var changeBlock = {
        change: lines[lineNumber].match(header_rx)[0],
        items: [],
        start: lineNumber,
        end: null
    };

    return getRange(lineNumber, header_rx, changeBlock);
}

function getChanges(versionBlock) {
    var i;
    var changeBlock;

    for (i = versionBlock.start + 1; i < versionBlock.end; ++i) {
        if (header_rx.test(lines[i])) {
            changeBlock = compileChangeBlock(i);
            getItemsInChange(changeBlock);
            versionBlock.changes.push(changeBlock);
        }
    }
}

function getItemsInChange(changeBlock) {
    var i;

    for (i = changeBlock.start + 1; i < changeBlock.end; ++i) {
        if (item_rx.test(lines[i]) && lines[i].length > 0) {
            changeBlock.items.push(lines[i].match(item_rx)[0]);
        }
    }
}

function getRange(lineNumber, regex, block) {
    for (lineNumber += 1; lineNumber < lines.length; ++lineNumber) {
        if (lineNumber === lines.length - 1) {
            block.end = lines.length;
            break;
        }

        if (regex.test(lines[lineNumber])) {
            block.end = lineNumber - 1;
            break;
        }
    }

    return block;
}
