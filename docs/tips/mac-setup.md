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

Start with macOS 13 Ventura.

## Application List

- Adobe Creative Cloud
  - Adobe Acrobat
  - Adobe Illustrator
  - Adobe Photoshop
- Anaconda
- balenaEtcher
- Battle.net
- Bugs Player
- Canon Utility
- CASA
- Dropbox
- Google Chrome
- Grammarly
- Hancom Office Hanguel 2014
- iObserve
- Kakao Talk
- MacPorts
- MacVim
- Microsoft Office
  - Microsoft Excel
  - Microsoft Powerpoint
  - Microsoft Word
- Papers
- PyCharm
- SAOImage DS9
- Secuway SSL
- Slack
- Steam
- Stellarium
- TIDAL
- Visual Studio Code
- Xcode
- Zoom.us

## iTerm2

[Download](https://iterm2.com)

### iTerm2 Setting

- iTerm2
  - [ ] Make iTerm2 Default Term
  - Settings
    - Profiles
      - General
        - Working Directory
          - [ ] Reuse previous session's directory
      - Colors
        - Color Presets...
          - [ ] Pastel (Dark Background)
      - Text
        - Font
          - [ ] Menlo

## Names

```shell
% sudo scutil --set ComputerName "SHINY's MacBook Pro KASI"
% sudo scutil --set LocalHostName shinymbpkasi
% sudo scutil --set HostName shinymbpkasi
```

## Shell

(optional)

```shell
% vi ~/.zshrc
PS1="%F{magenta}%n%F{cyan}(%m) %F{green}%3~ %F{default}%# "
export CLICOLOR=1
export TERM=xterm-256color

% vi ~/.zprofile

```

## Xcode

Download and install the latest version of Xcode and Command Line Tools

[Download 1](https://apps.apple.com/kr/app/xcode/id497799835?mt=12) (App Store)

[Download 2](https://developer.apple.com/download/all/?q=Xcode) (Apple Developer)

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

## Homebrew

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Add Homebrew to user PATH:

```shell
% (echo; echo 'eval "$(/usr/local/bin/brew shellenv)"') >> /Users/shiny/.zprofile
% eval "$(/usr/local/bin/brew shellenv)"
```

## GCC (gfortran)

```shell
% brew install gcc
```

Confirm installation:

```shell
% gcc --version
% gfortran --version
```

Make `gcc` link to Homebrew GCC instead of the Apple clang version.
Apple Command Line Tools includes `/usr/bin/gcc`.

```shell
% ln -s /usr/local/bin/gcc-13 /usr/local/bin/gcc
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

### Jupyter notebook
Set to open jupyter notebook in Google Chrome

```shell
(base) % jupyter notebook --generate-config
(base) % vi ~/.jupyter/jupyter_notebook_config.py

c.NotebookApp.browser = 'open -a /Applications/Google\ Chrome.app %s'
```

## PyCharm

[Download](https://www.jetbrains.com/ko-kr/pycharm/download/#section=mac)



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

## Dropbox

[Download](https://www.dropbox.com/downloading?type=full)


