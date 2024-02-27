# GENE Setting Log

## Install Ubuntu 22.04

Using Ubuntu 22.04 botting USB, install ubuntu on NVMe 1.6 TB SSD.

## Configrations

### Certificate

Download `ePrism.ssl` from `kms.kasi.re.kr`.

```bash
$ mkdir /usr/share/ca-certificates/extra
$ cp ePrism.ssl /usr/share/ca-certificates/extra/.
$ dpkg-reconfigure ca-certificates
```

Select `yes`; check `ePrism.ssl`; finish.

```bash
$ dpkg-reconfigure ca-certificates

Updating certificates in /etc/ssl/certs...
rehash: warning: skipping ca-certificates.crt,it does not contain exactly one certificate or CRL
1 added, 0 removed; done.
Processing triggers for ca-certificates (20230311ubuntu0.22.04.1) ...
Updating certificates in /etc/ssl/certs...
0 added, 0 removed; done.
Running hooks in /etc/ca-certificates/update.d...
done.
```

### UFW

Modify `before.rules`.

```bash
$ vi /etc/ufw/before.rules

# NAT table rules, added by Shinyoung Kim (2024.02.27.)
*nat
:PREROUTING ACCEPT [0:0]
:OUTPUT ACCEPT [0:0]
:POSTROUTING ACCEPT [0:0]
-F

COMMIT
```

Enable `ufw`.

```bash
$ ufw enable
```

### SSH

Install `openssh-server` and `net-tools`.

```bash
$ apt update
$ apt install openssh-server net-tools
```

Modify port.

```bash
$ vi /etc/ssh/sshd_config

Port 0000
```

Set `ufw` to allow `openssh`.

```bash
$ vi /etc/ufw/applications.d/openssh-server

ports=0000/tcp

$ ufw allow OpenSSH
```

Check listen status.

```bash
$ netstat -tlp | grep "ssh"
```

### V3 Net for Linux Server

[Download](http://210.110.233.66:8081/api.link/3d_baLoIH7HEWuMO-MA~.Z) install file.

```bash
$ tar -zxvf v3net-linux-3.6.13.10.1025.tar.Z
$ cd v3net
$ ./install.sh
```

Start service.

```bash
$ cd /usr/local/v3net
$ ./v3net.sh start
```

Check status.

```bash
$ ./v3net.sh status

V3 Net for Linux Server (Process status information)
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Process              State             PID          ┃
┠─────────────────────────────────────────────────────┨
┃ v3netd               Running           17273        ┃
┃ v3net-agentd         Running           17269        ┃
┃ v3logmgrd            Running           17271        ┃
┃ v3metricd            Running           17277        ┃
┃ lighttpd             Not Running       N/A          ┃
┃ v3fbmond             Running           17283        ┃
┃ v3monitor            Running           17328        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

Use cli.

```bash
$ /usr/local/v3net/bin/v3cli

v3net>
```

Make alias for `v3cli`.

```bash
$ ln -s /usr/local/v3net/bin/v3cli /usr/local/bin/v3net
```

Update engine.

```bash
v3net> action update start
v3net> show summary

V3 Net for Linux Server (Status information)
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Type                      Value                     ┃
┠─────────────────────────────────────────────────────┨
┃ ✣ Version                 3.6.16.10 (Build 1144)    ┃
┃ ✣ Engine Version          2024.02.27.03             ┃
┃                           3.25.1.4(Build 34533)     ┃
┃ ✣ Kernel Package Version  2.6.0.7 (Build 68)        ┃
┃ ✣ Last Scan               N/A                       ┃
┃ ✣ Real-time Scan          On                        ┃
┃ ✣ Real-time Scan mode     User mode                 ┃
┃ ✣ Scan                    Prepare scan              ┃
┃ ✣ Update status           Prepare update            ┃
┃ ✣ Management Server       Not connected             ┃
┃ ✣ Remaining days          308       d               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```


