## export usernames ====================================

WINUSER=lucasvtiradentes
DRIVERLETTER=c
winProfileFile=/$DRIVERLETTER/Users/$WINUSER/.aliases
wslSharedFolder=/$DRIVERLETTER/Users/$WINUSER/wsl

## DETECT OS ===========================================

if [[ "$OS" == *"Windows"* ]]; then
  opSystem=WINDOWS
elif [[ -n "$IS_WSL" || -n "$WSL_DISTRO_NAME" ]]; then
  opSystem=WSL1
elif [[ "$(uname -a)" == *"WSL"* ]]; then
  opSystem=WSL2
else
  opSystem=$OSTYPE
fi

## show file being loaded ==============================

echo "-> Loaded .profile WIN"

## WINDOWS ACTIONS =====================================

if [ $opSystem = "WINDOWS" ]; then
  [[ ( -e $winProfileFile ) ]] && source "$winProfileFile"

  export PATH=/c/Users/lucasvtiradentes/Android/Sdk/platform-tools:$PATH
  export ANDROID_HOME=/c/Users/lucasvtiradentes/Android/Sdk
  alias wsl="cd $wslSharedFolder"
  alias bash='"C:\\Program Files\\Git\\bin\\bash.exe"'
  alias gcloud="gcloud.cmd"
  alias python='winpty python.exe'
  ## alias docker='winpty docker.exe'
fi

## WSL ACTIONS =========================================

if [[ $opSystem = "WSL1" || $opSystem = "WSL2" ]]; then

#  if [ -e "/mnt$winProfileFile" ]; then
#    [[ ( -e /mnt$wslProfileFile ) ]] && rm /mnt$wslProfileFile
#    sed 's/\r$//' "/mnt$winProfileFile" > "/mnt$wslProfileFile" # remove CR from file
#    source "/mnt$wslProfileFile"
#  fi

  [[ ( -e "/mnt$winProfileFile" ) ]] && source "/mnt$winProfileFile"

  if [ ! -d "/mnt$wslSharedFolder" ]; then
    mkdir -p "/mnt$wslSharedFolder"
  fi

  alias shared="cd /mnt$wslSharedFolder"
fi

## PATHS ===============================================

[[ -d "$HOME/bin" ]] && PATH="$HOME/bin:$PATH"
[[ -d "$HOME/.local/bin" ]] &&   PATH="$HOME/.local/bin:$PATH"