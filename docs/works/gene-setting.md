# GENE Setting Log

## Install Ubuntu 22.04

Using Ubuntu 22.04 botting USB, install ubuntu on NVMe 1.6 TB SSD.

## Configrations

### Certificate

Download `ePrism.ssl` from `kms.kasi.re.kr`.

```bash
mkdir /usr/share/ca-certificates/extra
cp ePrism.ssl /usr/share/ca-certificates/extra/.
dpkg-reconfigure ca-certificates
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



