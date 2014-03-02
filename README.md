whichapp
========

The application to evaluate which is the better one.

# Requirements
* [Cordova CLI](https://github.com/apache/cordova-cli)

# How to use
## Prepare
You need to install [cordova cli](https://github.com/apache/cordova-cli) before setup.

## Setup
	git clone https://github.com/motokazu/whichapp.git
	cd whichapp/abScattergram
	chmod +x prepare.sh
	./prepare.sh

## Build
	cordova build

## Run
For exmple, if you run app on ios.

	cordova emulate ios

# Note
If you want to build for iOS7, you might need to fix status bar position. see [stackoverflow](http://stackoverflow.com/questions/19209781/ios-7-status-bar-with-phonegap).