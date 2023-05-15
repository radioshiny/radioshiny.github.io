---
layout: default
title: gene.kasi.re.kr
parent: KASI Works
---

# User guide for gene.kasi.re.kr
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## System Information

### Mac Pro (Late 2013)
- **Processor**&emsp;3.5 GHz 6-Core Intel Zeon E6
- **Memory**&emsp;64 GB 1866 MHz DDR3
- **Graphics**&emsp;AMD FirePro D300 2 GB
- **OS**&emsp;macOS Mojave 10.14.6

### Data storage
- **System and Apps**&emsp;1 TB flash storage - Apple SSD
- **User data**&emsp;19 TB external SAS disk - Promise Pegasus2 R8
- **Observation data**&emsp;38 TB external SAS disk - Promise Pegasus3 R8

## Access

### Screen sharing (recommanded)

Using `Screen Sharing.app` in macOS

```
vnc://gene.kasi.re.kr
```

![image-vnc1](./images/vnc_01-2.png)
![image-vnc2](./images/vnc_02-2.png)
![image-vnc3](./images/vnc_03-2.png)

#### Screen size adjustment

When using screen sharing, you may want the screen to fit exactly the size of 
your monitor. The screen size can be adjusted using the `Resolution` option in
`System Preference` > `Display`. Note that the screen sharing cannot read the
resolution of the remove monitor, so **you should never select the `Default 
for display` option** (if you accidentally select that option and you no longer 
see the shared screen, you may need to ask system administrator to restore the
screen).

![image-vnc4](./images/vnc_05.png)
![image-vnc5](./images/vnc_06.png)

In the `Scaled` option, you can select the resolution you want, and if the
desired resolution does not appear, click `Scaled` with the `Option` key to see
all the supported resolution options.

### SSH

```bash
ssh -Y -p 7774 userid@gene.kasi.re.kr
```

In SSH mode, some applications using a Mac GUI other than XQuartz (X window)
can not display additional windows.
For example, you can access the addtional windows in GILDAS or STARLINK, 
but you can not access the viewer and logger window in the CASA.

## Applications

List of pre-installed applications for all users

### macOS

- `CASA`&emsp;5.5.0-149
- `Google Chrome`&emsp;
- `iTerm2`&emsp;
- `Hancom Office HWP 2014 VP`&emsp;10.30.3
- `Keynote`&emsp;10.1
- `Microsoft Excel`&emsp;15.37
- `Microsoft PowerPoint`&emsp;15.37
- `Numbers`&emsp;10.1
- `Pages`&emsp;10.1
- `SAOImage DS9`&emsp;
- `Xcode`&emsp;11.3.1

### macports
- `gcc5`&emsp;5.5
- `gcc9`&emsp;9.1
- `gildas`&emsp;201907a
- `MacVim`&emsp;8.1
- `miriad`&emsp;4.3.8
- `montage`&emsp;3.3
- `py27-virtualenv`&emsp;16.6
- `py37-virtualenv`&emsp;16.6
- `python27`&emsp;2.7.16
- `python37`&emsp;3.7.3
- `tk`&emsp;8.6.9
- `wget`&emsp;1.20.3

## Directions for use

### Personal data

You should store personal data inside your home directory, `/Volumes/DATA/userid`.

### Data sharing

Team shared directory, `/Volumes/DATA/shared`, allows to share data with other 
users. Your home has a soft link `~/shared` to the shared directory.

```bash
mv data_for_sharing ~/shared/data_for_sharing
chmod -R 755 ~/shared/data_for_sharing
```

### Using Starlink

There are two versions of Starlink installed, the latest officially released
version, 2018A and the more recent EAO build (rsync).

In order to use Starlink, you need to load the environment settings.

#### For the 2018A

The alias for loading the environment settings for the 2018A version and 
frequently used libraries at the same time is `starlink`. `starlink` is a set of 
commands below:

```bash
export STARLINK_DIR=/software/star-2018A
source STARLINK_DIR/etc/profile
convert
kappa
smurf
```

#### For the EAO build

The alias for loading the EAO build is `stardev`. 
`stardev` is a set of commands below:

```bash
export STARLINK_DIR=/software/stardev
source STARLINK_DIR/etc/profile
```

### Observation data

Previous observations by our team are kept in separate external storage. The 
absolute path of the external storage is `/Volumes/OBS`, and can also be 
accessed through the soft link `~/obs` to each user's personal home. All users 
can read and access observations, but cannot modify them.

## Contact to admin

`shinykim@kasi.re.kr`

- **Installing applications**&emsp;Send me application name and url
- **Connection**&emsp;Send me the error message or captured screen

