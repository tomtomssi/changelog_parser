# changelog_parser

Parses a changelog into JSON format. Can compile a changelog from JSON.

Expects the changelog to follow [keepachangelog.com](http://keepachangelog.com/) guidelines

## Install

```
npm install changelog_parser
```

## Usage

```js
var parser = require('./changelog_parser');

// Changelog to JSON
var json_changelog = parser.toJSON('CHANGELOG.md');

// JSON formatted changelog to text
var changelog = parser.toChangelog(json_changelog);
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
  "title": "# Example changelog\r",
  "versions": [
    {
      "version_number": "x.y.z",
      "version": "## [x.y.z]\r",
      "start": 2,
      "end": 13,
      "changes": [
        {
          "change": "### Added\r",
          "items": [
            "- A changelog!\r"
          ],
          "start": 4,
          "end": 6
        },
        {
          "change": "### Fixed\r",
          "items": [
            "- UI had some terrible bugs\r"
          ],
          "start": 7,
          "end": 9
        },
        {
          "change": "### Removed\r",
          "items": [],
          "start": 10,
          "end": 11
        },
        {
          "change": "### Changed\r",
          "items": [],
          "start": 12,
          "end": 15
        }
      ]
    },
    {
      "version_number": "2.9.0",
      "version": "## [2.9.0](http://www.google.fi/)\r",
      "start": 14,
      "end": 31,
      "changes": [
        {
          "change": "### Added\r",
          "items": [
            "- Added a cool new feature\r",
            "- Files can now be loaded from the Internet\r"
          ],
          "start": 16,
          "end": 19
        },
        {
          "change": "### Changed\r",
          "items": [
            "- Localization IDs\r"
          ],
          "start": 20,
          "end": 22
        },
        {
          "change": "### Fixed\r",
          "items": [
            "- This annoying bug\r",
            "- That annoying bug\r",
            "- A bug that you had but no one else\r",
            "- A bug that everyone had but not you\r"
          ],
          "start": 23,
          "end": 28
        },
        {
          "change": "### Removed\r",
          "items": [
            "- That thing no one used until soon\r"
          ],
          "start": 29,
          "end": 33
        }
      ]
    },
    {
      "version_number": "2.8.9",
      "version": "## [2.8.9](http://www.google.fi/)\r",
      "start": 32,
      "end": 36,
      "changes": [
        {
          "change": "### Fixed\r",
          "items": [
            "- Simple bugfix\r"
          ],
          "start": 34,
          "end": 38
        }
      ]
    },
    {
      "version_number": "2.8.8",
      "version": "## [2.8.8](http://www.google.fi/)\r",
      "start": 37,
      "end": 45,
      "changes": [
        {
          "change": "### Fixed\r",
          "items": [
            "- Critical bug\r",
            "- Not so critical bug\r"
          ],
          "start": 39,
          "end": 42
        },
        {
          "change": "### Changed\r",
          "items": [
            "- Name of bug parser\r"
          ],
          "start": 43,
          "end": 47
        }
      ]
    },
    {
      "version_number": "2.8.0",
      "version": "## [2.8.0](http://www.google.fi/)\r",
      "start": 46,
      "end": 60,
      "changes": [
        {
          "change": "### Added\r",
          "items": [
            "- Feature 1\r",
            "- Feature 2\r"
          ],
          "start": 48,
          "end": 51
        },
        {
          "change": "### Fixed\r",
          "items": [
            "- Feature X had a bug that caused more bugs\r",
            "- Java internals\r",
            "- JavaScript web development\r"
          ],
          "start": 52,
          "end": 56
        },
        {
          "change": "### Removed\r",
          "items": [
            "- COBOL HTML files\r"
          ],
          "start": 57,
          "end": 60
        }
      ]
    }
  ]
}

```
Parsing the above JSON will result in the CHANGELOG.md file it was created from

## License

[MIT](LICENSE.md)