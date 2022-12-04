## How to install wsl on windows

## How to find wsl folder on windows?
- search for wsl in windows search, and open it;
- open explorer folder url and type ```\\wsl$```

## How to install GUI wsl2 on windows?
- [Reference Vídeeo](https://www.youtube.com/watch?v=IL7Jd9rjgrM)
- Run these commands on Powershell as ADM
```
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```
```
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

- Restart the computer
- Run these comamnds on powersheel as ADM
```
wsl --set-default-version 2
```
- To check if the installation went correctly, run:
```
wsl -l -v
```

- Update the ubuntu system
```
sudo apt update
sudo apt upgrade -y
```
- Install the interface components
```
sudo apt install xrdp
```
- Install the GUI
```
sudo apt install -y xfce4
```
- Install the GUI dependencies
```
sudo apt install -y xfce4-goodies
```
- Addional commands
```
sudo cp /etc/xrdp/xrdp.ini /etc/xrdp/xrdp.ini.bak

sudo sed -i 's/3389/3390/g' /etc/xrdp/xrdp.ini

sudo sed -i 's/max_bpp=32/#max_bpp=32\nmax_bpp=128/g' /etc/xrdp/xrdp.ini

sudo sed -i 's/xserverbpp=24/#xserverbpp=24\nxserverbpp=128/g' /etc/xrdp/xrdp.ini

echo xfce4-session > ~.xsession
```
- Edit the file
```
sudo nano /etc/xrdp/startwm.sh

# comment the last two lines
# test -x ....
# exec /bin/sh ...

# add the following lines:
# xfce
# startxfce4
```

## How to use GUI wsl2 on windows?
- Start: 
  - `sudo /etc/init.d/xrdp start`
  - Open windows remote screen: localhost:3390
  - Type your ubuntu username and password

- Stop: 
  - `sudo /etc/init.d/xrdp stop`

## How to install google chrome on wsl2 GUI?

```
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

sudo apt -y install ./google-chrome-stable_current_amd64.deb
```

# How to install vscode?

- Download the package
```
https://code.visualstudio.com/docs/?dv=linux64_deb
```

- Install the package
```
sudo dpkg -i vscode-amd64.deb
```