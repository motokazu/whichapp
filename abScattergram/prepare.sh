#!/bin/sh
#
# The shellscript to prepare cordova project for ios build.
#


# 
echo "Preparing cordova project..."

if ! which cordova > /dev/null ; then
	echo "Cordova is not installed."
	exit 1
fi

# Add Platform
if [[ ! -d "${PWD}/platforms/ios" ]] ; then
	echo "Adding platform ios ..."
	if [[ ! -d "${PWD}/platforms" ]]; then
		mkdir ${PWD}/platforms
	fi
	if cordova platform add ios ; then
		echo "OK"
	else
		echo "NG"
	fi
fi

# Add Plugin for dialog
if [[ ! -d "${PWD}/plugins/org.apache.cordova.dialogs" ]]; then
	echo "Adding dialog plugin ..."
	if [[ ! -d "${PWD}/plugins" ]]; then
		mkdir ${PWD}/plugins
	fi
	if cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-dialogs.git ; then
		echo "OK"
	else
		echo "NG"
	fi
fi

# copy icon and splash
if [[ -d "${PWD}/platforms/ios/Which/Resources/icons" ]]; then
	echo "Copying icons to platform directory ..."
	if cp -p ${PWD}/www/res/ios/icons/*.png ${PWD}/platforms/ios/Which/Resources/icons/ ; then
		echo "OK"
	else
		echo "NG"
	fi
fi

if [[ -d "${PWD}/platforms/ios/Which/Resources/splash" ]]; then
	echo "Copying slpash images to platform directory ..."
	if cp -p ${PWD}/www/res/ios/splash/*.png ${PWD}/platforms/ios/Which/Resources/splash/ ; then
		echo "OK"
	else
		echo "NG"
	fi
fi

echo "Finish."
