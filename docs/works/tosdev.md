---
layout: default
title: TOS Development Log
parent: KASI Works
---

# TOS Development Log

## Install node.js

In macOS  
https://nodejs.org/en/download/  
`macOS Installer` download and install

In Ubuntu 14.04
Install `npm` and `node` (v10.20.1)
```shell
sudo apt-get install npm
sudo npm install n -g
sudo n 10.20.1 --insecure
```
Make alias in `.bashrc`
```bash
alias node='/usr/local/n/versions/node/10.20.1/bin/node'
```

## Set environment

Make directory and files
```shell
~/TOS/tosweb
+-- toswebserver.js
+-- toswebclient.js
+-- toswebclient.html
```

Install node.js libraries
```shell
npm init
npm install ws
npm install express
npm install fs
```

## WebSocket over https

