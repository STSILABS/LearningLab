# Raspberry Pi Configuration Notes

The app is designed to be run by a raspberry pi running a "kiosk" screen.

## SSH into Pi

To [ssh into the pi](https://www.raspberrypi.org/documentation/remote-access/ssh/)...

* Get the ip address by running (within the pi) `hostname -I`, e.g. `192.168.1.62`
* Login as the admin user (from your non-pi OS terminal) `ssh admin@192.168.1.62`

## Configuring for Kiosk Use

In general, this follows the article at: https://pimylifeup.com/raspberry-pi-kiosk/

### Install Dependencies

Make sure chromium and the utilities x11, xdotool and unclutter are installed.

``` sh
# Run from within pi ssh session
$ sudo apt-get update && sudo apt-get upgrade -y
...
$ sudo apt-get install chromium-browser x11-xserver-utils unclutter xdotool
```

### Edit/Configure Launch Script

The script that runs the kiosk is edited (or created) via:

``` sh
sudo nano /home/admin/kiosk.sh
```

The contents of the file should be similar to:

``` bash
#!/bin/bash

# power management settings (don't shut off screen)
xset s noblank
xset s off
xset -dpms

# hide mouse cursor on 2 secons of inactivity
unclutter -idle 2.0 -root &

# avoid warning messages for browser shutdown, etc
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences

# launch browser
/usr/bin/chromium-browser --incognito --noerrdialogs --disable-infobars --disable-session-crashed-bubble --kiosk https://www.google.com/maps/@38.8940083,-77.079366,11z/data=!5m1!1e1 https://stsiinc.com https://maps.darksky.net/@radar,38.889,-77.712,8 https://darksky.net/forecast/38.894,-77.0771/us12/en &

while true; do
      xdotool keydown ctrl+r; xdotool keyup ctrl+r;xdotool keydown ctrl+Tab; xdotool keyup ctrl+Tab;
      sleep 10s
done
```

### Running the Service

```bash
# Start the service
sudo systemctl start kiosk.service
# Stop
sudo systemctl stop kiosk.service
# Status - to aid in debugging
sudo systemctl status kiosk.service
```
