# Read Later RSS

This project aims to provide an easy way to read interesting articles offline or later without distractions and provides an alternative to [wallabag](https://github.com/wallabag/wallabag).


## Goals

The goals of the project is to be as simple as possible, the application only accepts an url and generates or updates an RSS feed.

* Provide an RSS feed so any RSS reader can be used
* Provide sanitized HTML in the RSS feed items
* Convert an html article to a readable version

## TODO

* Update RSS feed and add command line arguments
* Research the possibility of creating a browser plugin to send links to a nodejs server secured with a secret apikey

## Dependencies

* [readability](https://github.com/mozilla/readability) transform html to a readable version
* [feed](https://www.npmjs.com/package/feed) for creating an RSS feed
