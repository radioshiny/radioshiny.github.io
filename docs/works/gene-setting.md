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

Modify ssh configuration.

```bash
$ vi /etc/ssh/sshd_config

Port 0000
MaxAuthTries 3
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

[Download](http://210.110.233.66:8081/api.link/3d_baLoIH7HEWuMO-MA~.Z) and install `v3net`.

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

### VADA Agent

Install `VADA`.

```bash
$ mkdir vada
$ cp VADA_Agent_LINUX.tar vada/.
$ cd vada
$ tar -xvf VADA_Agent_LINUX.tar

collector_linux_i386
collector_linux_ppc64le
collector_linux
vada_agent.conf
inst
autoinst
collector.systemd
collector

$ chmod +x inst
$ ./inst
```

Check the running status of the VADA Agent.

```bash
$ ps -ef | grep "vada"

root       20422       1  0 10:48 ?        00:00:00 /opt/vada/agent/collector_linux -c /opt/vada/agent
root       20423   20422  0 10:48 ?        00:00:00 /opt/vada/agent/collector_linux -c /opt/vada/agent
root       21363   19888  0 10:50 pts/1    00:00:00 grep --color=auto vada
```

### Configurations for Security

Modify permission of `/etc/hosts`.

```bash
$ chmod 600 /etc/hosts
```

Modify configurations for password.

```bash
$ vi /etc/login.defs

PASS_MAX_DAYS   90
PASS_MIN_DAYS   1
PASS_WARN_AGE   7

$ vi /etc/pam.d/common-password

password        requisite                       pam_pwquality.so retry=3 lcredit=-1 ucredit=-1 dcredit=-1 ocredit=-1
password        [success=2 default=ignore]      pam_unix.so obscure use_authtok try_first_pass yescrypt sha512 minlen=9

$ chmod 400 /etc/shadow
```

