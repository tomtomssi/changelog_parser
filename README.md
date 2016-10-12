# changelog_parser

- Can compile a changelog into JSON format 
- Can compile a formatted changelog string from JSON
- Can compile a JSON formatted changelog from a string

Expects the changelog to follow [keepachangelog.com](http://keepachangelog.com/) guidelines

## Install

```
npm install changelog_parser
```

## Usage

```js
var parser = require('changelog_parser');

// Changelog to JSON
var json_changelog = parser.toJSON(pathToChangelogFile);

// JSON formatted changelog to text
var changelog = parser.toChangelog(json_changelog);

// Changelog string to JSON
var json_changelog = parser.toJSONFromString(changelogString);
```

## Format

This module requires the changelog to be in markdown format.

The title of the changelog is prefixed by **one** hashtag (#):
```md
# Example changelog
```

The versions are prefixed by **two** hashtags (##):
```md
## [2.9.0](http://www.google.fi/)
```

The change headers should be prefixed with **three** hashtags (###)
```md
### Added
```

Individual changes should be prefixed with **one** hyphen (-)
```md
- Created an amazing feature!
```

An example CHANGELOG.md file:

```md
# Example changelog

## [x.y.z]

### Added
- A changelog!

### Fixed
- UI had some terrible bugs

### Removed

### Changed

## [2.9.0](http://www.google.fi/)

### Added
- Added a cool new feature
- Files can now be loaded from the Internet

### Changed
- Localization IDs

### Fixed
- This annoying bug
- That annoying bug
- A bug that you had but no one else
- A bug that everyone had but not you

### Removed
- That thing no one used until soon

## [2.8.9](http://www.google.fi/)

### Fixed
- Simple bugfix

## [2.8.8](http://www.google.fi/)

### Fixed
- Critical bug
- Not so critical bug

### Changed
- Name of bug parser

## [2.8.0](http://www.google.fi/)

### Added
- Feature 1
- Feature 2

### Fixed
- Feature X had a bug that caused more bugs
- Java internals
- JavaScript web development

### Removed
- COBOL HTML files

```

Parsing the example changelog will yield the following JSON:

```js
{
  "title": "# Example changelog",
  "versions": [
    {
      "version_number": "x.y.z",
      "version": "## [x.y.z]",
      "changes": [
        {
          "change": "### Added",
          "items": [
            "- A changelog!"
          ]
        },
        {
          "change": "### Fixed",
          "items": [
            "- UI had some terrible bugs"
          ]
        },
        {
          "change": "### Removed",
          "items": []
        },
        {
          "change": "### Changed",
          "items": []
        }
      ]
    },
    {
      "version_number": "2.9.0",
      "version": "## [2.9.0](http://www.google.fi/)",
      "changes": [
        {
          "change": "### Added",
          "items": [
            "- Added a cool new feature",
            "- Files can now be loaded from the Internet"
          ]
        },
        {
          "change": "### Changed",
          "items": [
            "- Localization IDs"
          ]
        },
        {
          "change": "### Fixed",
          "items": [
            "- This annoying bug",
            "- That annoying bug",
            "- A bug that you had but no one else",
            "- A bug that everyone had but not you"
          ]
        },
        {
          "change": "### Removed",
          "items": [
            "- That thing no one used until soon"
          ]
        }
      ]
    },
    {
      "version_number": "2.8.9",
      "version": "## [2.8.9](http://www.google.fi/)",
      "changes": [
        {
          "change": "### Fixed",
          "items": [
            "- Simple bugfix"
          ]
        }
      ]
    },
    {
      "version_number": "2.8.8",
      "version": "## [2.8.8](http://www.google.fi/)",
      "changes": [
        {
          "change": "### Fixed",
          "items": [
            "- Critical bug",
            "- Not so critical bug"
          ]
        },
        {
          "change": "### Changed",
          "items": [
            "- Name of bug parser"
          ]
        }
      ]
    },
    {
      "version_number": "2.8.0",
      "version": "## [2.8.0](http://www.google.fi/)",
      "changes": [
        {
          "change": "### Added",
          "items": [
            "- Feature 1",
            "- Feature 2"
          ]
        },
        {
          "change": "### Fixed",
          "items": [
            "- Feature X had a bug that caused more bugs",
            "- Java internals",
            "- JavaScript web development"
          ]
        },
        {
          "change": "### Removed",
          "items": [
            "- COBOL HTML files"
          ]
        }
      ]
    }
  ]
}

```
Parsing the above JSON will result in the CHANGELOG.md file it was created from

## Testing

To run all tests use the following command:

```js
npm test
```
## License

[MIT](LICENSE.md)
