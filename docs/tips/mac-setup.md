---
layout: default
title: Mac Setup for Astronomy
parent: Tips
---

# Mac Setup for Astronomy
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

Start with macOS 12 Monterey.

## Name Setting

```shell
% sudo scutil --set ComputerName "SHINY's MacBook Pro KASI"
% sudo scutil --set LocalHostName shinymbpkasi
% sudo scutil --set HostName shinymbpkasi
```

## Xcode

Download and install the latest version of Xcode and Command Line Tools

[Download 1](https://apps.apple.com/kr/app/xcode/id497799835?mt=12) (App Store)

[Download 2](https://developer.apple.com/download/all/) (Apple Developer)

### Command Line Tools

```shell
% xcode-select --install
```

License Agreement
```shell
% sudo xcodebuild -license
```

## XQuartz
[Download](https://www.xquartz.org)

## GCC (gfortran)
[Download](http://hpc.sourceforge.net)
```shell
% sudo tar -xvf gcc-11.2-bin.tar -C /.
% sudo tar -zxvf gcc-11.2-bin.tar.gz -C /.
```

## MacPorts
To install GILDAS
[Download](https://www.macports.org/install.php)

### GILDAS (CLASS)
[Download](https://www.iram.fr/IRAMFR/GILDAS/)
```shell
% sudo port install gildas
```

## MacVim
[Download](https://macvim-dev.github.io/macvim/)
```shell
% vi ~/.zprofile
alias mvim="/Applications/MacVim.app/Contents/bin/mvim"
alias vi='mvim'
alias vim='mvim'
```

### Vundle
```shell
git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
```

### .vimrc
[Download](vimrc.txt)
```shell
cp vimrc.txt ~/.vimrc
```

## Anaconda

[Download](https://www.anaconda.com/products/individual)

```shell
% mv ~/.zshrc ~/.conda_init

% vi ~/.zprofile

alias pyc="source ~/.conda_init"

% pyc
```

## PyCharm

[Download](https://www.jetbrains.com/ko-kr/pycharm/download/#section=mac)

## Homebrew

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### CARTA

#### Package installation

```shell
brew install cartavis/tap/carta
```

#### Stand-alone application

[Download](https://github.com/CARTAvis/carta/releases/download/v3.0.0/CARTA-v3.0-Intel.dmg)

add alias to `~/.zshrc` or `~/.zprofile`

```shell
alias carta='/Applications/CARTA.app/Contents/MacOS/CARTA'
```

## iTerm2

[Download](https://iterm2.com)

## Dropbox

[Download](https://www.dropbox.com/downloading?type=full)


