These are Cordova resources. You can replace icon.png and splash.png and run
`ionic cordova resources` to generate custom icons and splash screens for your
app. See `ionic cordova resources --help` for details.

Cordova reference documentation:

- Icons: https://cordova.apache.org/docs/en/latest/config_ref/images.html
- Splash Screens: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-splashscreen/


'npx cordova-res android --skip-config --copy' to copy the config


Adaptive icons command:
cd resources\android\icon
copy drawable-mdpi-icon.png mdpi-foreground.png
copy drawable-hdpi-icon.png hdpi-foreground.png
copy drawable-xhdpi-icon.png xhdpi-foreground.png
copy drawable-xxhdpi-icon.png xxhdpi-foreground.png
copy drawable-xxxhdpi-icon.png xxxhdpi-foreground.png
copy drawable-mdpi-icon.png mdpi-background.png
copy drawable-hdpi-icon.png hdpi-background.png
copy drawable-xhdpi-icon.png xhdpi-background.png
copy drawable-xxhdpi-icon.png xxhdpi-background.png
copy drawable-xxxhdpi-icon.png xxxhdpi-background.png