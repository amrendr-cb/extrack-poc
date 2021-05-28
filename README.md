# ExtrackPoc

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.1.

## Development server

Run `npm run app1` for a dev server. Navigate to `https://app1.test/track`. The app will automatically reload if you change any of the source files.

Run `npm run app2` for a dev server. Navigate to `https://app2.test/`. The app will automatically reload if you change any of the source files.

## DNS mapping
On `windows` add following entry to `c:\Windows\System32\drivers\etc\hosts` file.

On `Mac` launch Terminal, type the following command, and press Return. As with all sudo commands, you’ll need to also enter your admin password to execute it:

`$ sudo nano /private/etc/hosts`

127.1.1.1 app1.test

127.1.1.2 app2.test


sudo ifconfig lo0 alias 127.1.1.1 netmask 0xFFFFFFFF

sudo ifconfig lo0 alias 127.1.1.2 netmask 0xFFFFFFFF
