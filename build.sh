#!/bin/bash

os=$1
type=$2

if [[ "x${os}x" == "xx" ]]; then
  echo "missing os, either android or ios"
  exit -1
fi

#ionic build --prod --aot --output-hashing=all && npx cap sync

ln -snf ~/.fastlane_env fastlane/.env.default

if [[ "$os" == "android" ]]; then
 find node_modules -type f -name '*.gradle' -exec sed -i '' 's/compile /implementation /g' {} \;
 mkdir -p /var/tmp/android/
 cp /Users/dgey/Desktop/Zertifikate/PlayStoreAppDev /var/tmp/android/PlayStoreAppDev.jks
 fastlane android internal
 rm -rf /var/tmp/android
fi

if [[ "$os" == "ios" ]]; then
  export FASTLANE_ITUNES_TRANSPORTER_USE_SHELL_SCRIPT=1
  export FASTLANE_ITUNES_TRANSPORTER_PATH=/Applications/Transporter.app/Contents/itms
 fastlane ios beta
fi

