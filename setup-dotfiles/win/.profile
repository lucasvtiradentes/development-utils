## CONVERT WIN PATH TO WSL PATH ========================

isVarSet(){
  var=$1
  if [ -z "$var" ]; then
    echo "false"
  else
    echo "true"
  fi
}

getArrItem(){
  if [ $(isVarSet $1) = "true" ]; then
    arrItem=$(echo "$1" | cut -d "$2" -f "$3")
    echo $arrItem
  fi
}

toLower(){
  if [ $(isVarSet $1) = "true" ]; then
    lower=$(echo "$1" | sed 's/.*/\L&/')
    echo $lower
  fi
}

replaceString(){
  initialString="$1"
  searchStr="$2"
  replaceStr="$3"
  finalStr="${initialString//"$searchStr"/"$replaceStr"}"
  echo $finalStr
}

win2wsl(){
  initialString="$1"
  initialPath="${initialString//"\\"/"/"}"

  driverTmp=$(getArrItem "$initialPath" ":" 1)
  initialDrive="$driverTmp:"
  finalDrive=$(toLower "$driverTmp" | sed 's/.*/\L&/')

  driveFixed=$(replaceString "$initialPath" "$initialDrive" "$finalDrive")

  echo /mnt/$driveFixed
}

detectOS(){
  if [[ "$OS" == *"Windows"* ]]; then
    OS_TMP=WINDOWS
  elif [[ -n "$IS_WSL" || -n "$WSL_DISTRO_NAME" ]]; then   # DEFAULT TERMINAL WLS
    OS_TMP=WSL1
  elif [[ "$(uname -a)" == *"WSL"* ]]; then                # GUI WLS / xfce4
    OS_TMP=WSL2
  else
    OS_TMP=$OSTYPE
  fi

  echo $OS_TMP
}

## export variables ====================================

OS_NAME=$(detectOS)
WIN_PROFILE='C:\Users\lucasvtiradentes\.profile'
WIN_ALIASES='C:\Users\lucasvtiradentes\.aliases'
WIN_SECRETS='C:\Users\lucasvtiradentes\.secrets'
WIN_SHARED_FOLDER='C:\Users\lucasvtiradentes\wsl'
WIN_README_BADGES='C:\Users\lucasvtiradentes\wsl\development-knowledge\001_readme_tools\github-badges.md'

## PATHS ===============================================

[[ -d "$HOME/bin" ]] && PATH="$HOME/bin:$PATH"
[[ -d "$HOME/.local/bin" ]] &&   PATH="$HOME/.local/bin:$PATH"

## GUI WLS / xfce4 =====================================

alias gstart="sudo /etc/init.d/xrdp start"
alias gstop="sudo /etc/init.d/xrdp stop"

## show file being loaded ==============================

echo "-> Loaded .profile WIN"

## WINDOWS ACTIONS =====================================

if [ $OS_NAME = "WINDOWS" ]; then

  # export PATH=/c/Users/lucasvtiradentes/Android/Sdk/platform-tools:$PATH
  # export ANDROID_HOME=/c/Users/lucasvtiradentes/Android/Sdk
  # alias gcloud="gcloud.cmd"
  # alias python='winpty python.exe'
  ## alias docker='winpty docker.exe'
  alias bash='"C:\\Program Files\\Git\\bin\\bash.exe"'

  # alias WIN_DRIVE_LETTER=$(replaceString $HOMEDRIVE ":" "")
  # alias WIN_USER=$(getArrItem $USERPROFILE "\\" 3)
  alias reload="source '$HOME/.profile'"

  alias shared="cd $WIN_SHARED_FOLDER"
  alias home="cd $HOME"

  alias notepad='C:/Windows/notepad.exe'
  alias readme="notepad '$WIN_README_BADGES'"
  alias aliases="notepad '$HOME.aliases'"


  [[ ( -e $WIN_ALIASES ) ]] && source "$WIN_ALIASES"
  [[ ( -e $WIN_SECRETS ) ]] && source "$WIN_SECRETS"
fi

## WSL ACTIONS =========================================

if [[ $OS_NAME = "WSL1" || $OS_NAME = "WSL2" ]]; then

#  if [ -e "$(win2wsl $WIN_ALIASES)" ]; then
#    [[ ( -e "$(win2wsl $WIN_PROFILE)" ) ]] && rm "$(win2wsl $WIN_PROFILE)"
#    sed 's/\r$//' "$(win2wsl $WIN_ALIASES)" > "$(win2wsl $WIN_PROFILE)" # remove CR from file
#    source "$(win2wsl $WIN_PROFILE)"
#  fi

  if [ ! -d "$(win2wsl $WIN_SHARED_FOLDER)" ]; then
    mkdir -p "$(win2wsl $WIN_SHARED_FOLDER)"
  fi

  alias shared="cd '$(win2wsl $WIN_SHARED_FOLDER)'"
  alias home="cd '$(win2wsl $HOME)'"
  WSL_WIN_README_BADGES=$(win2wsl "$WIN_README_BADGES")

  if [ $OS_NAME = "WSL1" ]; then
    alias aliases="cat '$(win2wsl $WIN_ALIASES)'"
    alias readme="cat '$WSL_WIN_README_BADGES'"
  elif [ $OS_NAME = "WSL2" ]; then
    alias aliases="gedit '$(win2wsl $WIN_ALIASES)'"   # remember to install gedit, sudo apt install gedit
    alias readme="gedit '$WSL_WIN_README_BADGES'"
  fi

  [[ ( -e "$(win2wsl $WIN_ALIASES)" ) ]] && source "$(win2wsl $WIN_ALIASES)"
  [[ ( -e "$(win2wsl $WIN_SECRETS)" ) ]] && source "$(win2wsl $WIN_SECRETS)"

fi
