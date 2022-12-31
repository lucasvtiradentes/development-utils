## FUNCTIONS ===========================================

isVarSet(){
  var=$1
  if [ -z "$var" ]; then
    echo "false"
  else
    echo "true"
  fi
}

getArrItem(){
  if [ $(isVarSet $1) == "true" ]; then
    arrItem=$(echo "$1" | cut -d "$2" -f "$3")
    echo $arrItem
  fi
}

toLower(){
  if [ $(isVarSet $1) == "true" ]; then
    lower=$(echo "$1" | sed 's/.*/\L&/')
    echo $lower
  fi
}

replaceString(){
  if [ $(isVarSet $1) == "true" ]; then
    initialString="$1"
    searchStr="$2"
    replaceStr="$3"
    finalStr="${initialString//"$searchStr"/"$replaceStr"}"
    echo $finalStr
  fi
}

win2wsl(){
  shouldRemoveMnt="$2"
  initialString="$1"
  initialPath="${initialString//"\\"/"/"}"

  driverTmp=$(getArrItem "$initialPath" ":" 1)
  initialDrive="$driverTmp:"
  finalDrive=$(toLower "$driverTmp" | sed 's/.*/\L&/')

  driveFixed=$(replaceString "$initialPath" "$initialDrive" "$finalDrive")

  if [[ "$shouldRemoveMnt" == "false" ]]; then
    echo /$driveFixed
  else
    echo /mnt/$driveFixed
  fi
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

getCategoryAliases(){

  file=$1
  category=$2

  [[ ( ! -e $file ) ]] && return
  allFoundAliases=$(grep \#$category "$file")
  [[ ( -z "$allFoundAliases" ) ]] && return

  echo == $category ====================================

  arrVar=("")
  x=1
  while [ true ]; do
    curAlias=$(echo "$allFoundAliases" | cut -d$'\n' -f $x)
    [[ ( "$curAlias" = "" ) ]] && break
    removeLabel=$(echo "$curAlias" | cut -d "#" -f "1")
    removeAlias=$(echo "${removeLabel/alias /""}")
    spaceEqualSign=$(echo "${removeAlias/\=/" = "}")
    finalFixedAlias=$removeAlias
    x=$(( $x + 1 ))
    arrVar+=("$finalFixedAlias")
  done

  for value in "${arrVar[@]}"; do
    [[ ! "$value" = "" ]] && echo $value
  done

  echo ""

}

## FUNCTIONS ===========================================

openLink(){
  link=$1

  if [ $OS_NAME = "WINDOWS" ]; then
    start "" "$link"
  elif [[ $OS_NAME = "WSL1" || $OS_NAME = "WSL2" ]]; then
    xdg-open "$link" >/dev/null 2>&1
  fi
}

openFile(){
  file=$1

  if [ $OS_NAME = "WINDOWS" ]; then
    start "notepad" "$file"
  elif [ $OS_NAME == "WSL1" ]; then
    cat $(win2wsl $file)
  elif [ $OS_NAME == "WSL2" ]; then
    gedit "$(win2wsl $file)" >/dev/null 2>&1
  fi

}

openFolder(){
  folder=$1

  if [ $OS_NAME = "WINDOWS" ]; then
    start "explorer" "$folder"
  elif [ $OS_NAME == "WSL1" ]; then
    xdg-open "$folder"
  elif [ $OS_NAME == "WSL2" ]; then
    xdg-open "$(win2wsl $folder)" >/dev/null 2>&1
  fi

}

getFixedPathFromWinPath(){
  file=$1

  if [ $OS_NAME = "WINDOWS" ]; then
    echo $(win2wsl "$file" "false")
  elif [ $OS_NAME == "WSL1" ]; then
    echo "$(win2wsl $file)"
  elif [ $OS_NAME == "WSL2" ]; then
    echo "$(win2wsl $file)"
  fi

}

loadFile(){
  file=$1
  fixedFile=$(getFixedPathFromWinPath "$file")
  [[ ( -e $fixedFile ) ]] && source "$fixedFile"
}

## export variables ====================================

OS_NAME=$(detectOS)
WIN_PROFILE='C:\Users\lucasvtiradentes\.profile'
WIN_ALIASES='C:\Users\lucasvtiradentes\.aliases'
WIN_SECRETS='C:\Users\lucasvtiradentes\.secrets'
WIN_SHARED_FOLDER='C:\Users\lucasvtiradentes\wsl'

## show file being loaded ==============================

echo "-> Loaded .profile WIN"

## LOAD REMAINING FILES ================================

loadFile "$WIN_ALIASES"
loadFile "$WIN_SECRETS"

## ALL SYSTEMS ACTIONS =================================

showAllAliasAvailableCommands(){

  if [ $OS_NAME = "WINDOWS" ]; then
    getCategoryAliases "$(getFixedPathFromWinPath "$WIN_PROFILE")" "OBSIDIAN"
  elif [[ $OS_NAME = "WSL1" || $OS_NAME = "WSL2" ]]; then
    getCategoryAliases "$(getFixedPathFromWinPath "$WIN_PROFILE")" "XFCE4"
  fi

  # ALIAS HELP
  getCategoryAliases "$(getFixedPathFromWinPath "$WIN_PROFILE")" "COMMAND"
  getCategoryAliases "$(getFixedPathFromWinPath "$WIN_PROFILE")" "SITE"
  getCategoryAliases "$(getFixedPathFromWinPath "$WIN_PROFILE")" "FILES"
  getCategoryAliases "$(getFixedPathFromWinPath "$WIN_PROFILE")" "FOLDER"
  getCategoryAliases "$(getFixedPathFromWinPath "$WIN_PROFILE")" "CFOLDER"

  getCategoryAliases "$(getFixedPathFromWinPath "$WIN_ALIASES")" "COMMIT"
  getCategoryAliases "$(getFixedPathFromWinPath "$WIN_ALIASES")" "BRANCH"
  getCategoryAliases "$(getFixedPathFromWinPath "$WIN_ALIASES")" "PUSH_PULL"
  getCategoryAliases "$(getFixedPathFromWinPath "$WIN_ALIASES")" "UNDO"
  getCategoryAliases "$(getFixedPathFromWinPath "$WIN_ALIASES")" "GIT_OTHER"

  getCategoryAliases "$(getFixedPathFromWinPath "$WIN_ALIASES")" "NPM"
  getCategoryAliases "$(getFixedPathFromWinPath "$WIN_ALIASES")" "DOCKER"
  getCategoryAliases "$(getFixedPathFromWinPath "$WIN_ALIASES")" "HUSKY"

}

folders(){
  alias pj='openFolder "$WIN_SHARED_FOLDER"'                                                        #FOLDER
  alias df='openFolder "C:\Users\lucasvtiradentes\wsl\_dev\development-utils\setup-dotfiles"'       #FOLDER
  alias bo='openFolder "C:\Users\lucasvtiradentes\wsl\_dev\development-utils\boilerplate-projects"' #FOLDER
  alias dp='openFolder "G:\Meu Drive\ANOTAÇÕES\DEVELOPMENT\001_design_patterns"'                    #FOLDER
  alias en='openFolder "G:\Meu Drive\ANOTAÇÕES\GERAL\004 inglês"'                                   #FOLDER
  alias js='openFolder "G:\Meu Drive\ANOTAÇÕES\DEVELOPMENT\003_js_stack"'                           #FOLDER
  alias dev='openFolder "C:\Users\lucasvtiradentes\wsl\_dev"'                                       #FOLDER
  alias books='openFolder "G:\Meu Drive\PROGRAMAÇÃO\dev books"'                                     #FOLDER
}

cd_folders(){
  alias ch='cd $HOME'                                            #CFOLDER
  alias cpj='cd $(getFixedPathFromWinPath "$WIN_SHARED_FOLDER")' #CFOLDER
}

sites(){
  alias gh='openLink "https://github.com/lucasvtiradentes"'                     #SITE
  alias lk='openLink "https://www.linkedin.com/in/lucasvtiradentes/"'           #SITE
  alias vc='openLink "https://vercel.com/dashboard"'                            #SITE
  alias nt='openLink "https://app.netlify.com/teams/lucasvtiradentes/overview"' #SITE
  alias rw='openLink "https://railway.app/dashboard"'                           #SITE
  alias gm='openLink "https://mail.google.com/mail/u/0/#inbox"'                 #SITE
}

files(){
  alias profile='openFile "$WIN_PROFILE"'                                                                      #FILES
  alias aliases='openFile "$WIN_ALIASES"'                                                                      #FILES
  alias secrets='openFile "$WIN_SECRETS"'                                                                      #FILES
  alias helper='openFile "C:\Users\lucasvtiradentes\.helper"'                                                  #FILES
  alias tasks='openFile "C:\Users\lucasvtiradentes\.tasks"'                                                    #FILES
  alias readme='openFile "C:\Users\lucasvtiradentes\wsl\_dev\development-utils\readme-tools\github-badges.md"' #FILES
  alias tools='openFile "G:\Meu Drive\ANOTAÇÕES\DEVELOPMENT\000_general\tools.md"'                             #FILES
}

folders
cd_folders
sites
files

alias l='ls -alF'                                            #COMMAND
alias c=clear                                                #COMMAND
alias h=showAllAliasAvailableCommands                        #COMMAND
alias r='source "$(getFixedPathFromWinPath "$WIN_PROFILE")"' #COMMAND

## WINDOWS ACTIONS =====================================

if [ $OS_NAME = "WINDOWS" ]; then

  if [ ! -d "$(win2wsl $WIN_SHARED_FOLDER false)" ]; then
    mkdir -p "$(win2wsl $WIN_SHARED_FOLDER false)"
  fi

  updateDotEnvFiles(){
    dotfilesFolder='C:\Users\lucasvtiradentes\wsl\_dev\development-utils\setup-dotfiles'
    winDotFiles='C:\Users\lucasvtiradentes\wsl\_dev\development-utils\setup-dotfiles\win'
    wslDotFiles='C:\Users\lucasvtiradentes\wsl\_dev\development-utils\setup-dotfiles\wsl'
  
    cp -fr "$WIN_PROFILE" "$winDotFiles"
    cp -fr "$WIN_ALIASES" "$winDotFiles"
    cp -fr "C:\Users\lucasvtiradentes\.helper" "$winDotFiles"
    # cp -fr "C:\Users\lucasvtiradentes\.tasks" "$winDotFiles"
    # cp -fr "$WIN_SECRETS" "$winDotFiles"
    
    echo "dotenv file were updated"
  }

  winAddPaths(){
    [[ -d "$HOME/bin" ]] && PATH="$HOME/bin:$PATH"
    [[ -d "$HOME/.local/bin" ]] &&   PATH="$HOME/.local/bin:$PATH"
  }

  winObsidianConfigs(){
    # https://help.obsidian.md/Advanced+topics/Using+obsidian+URI
    alias ob='getCategoryAliases "$(getFixedPathFromWinPath "$WIN_PROFILE")" "OBSIDIAN"'  #OBSIDIAN
    alias og='start "" "obsidian://open-vault?vault=GERAL"'                               #OBSIDIAN
    alias od='start "" "obsidian://open-vault?vault=DEVELOPMENT"'                         #OBSIDIAN
    alias or='start "" "obsidian://open-vault?vault=RECRUITMENT UTILS"'                   #OBSIDIAN
  }

  winAddPaths
  winObsidianConfigs

  alias update=updateDotEnvFiles #COMMAND

fi

## WSL ACTIONS =========================================

if [[ $OS_NAME = "WSL1" || $OS_NAME = "WSL2" ]]; then

  if [ ! -d "$(win2wsl $WIN_SHARED_FOLDER)" ]; then
    mkdir -p "$(win2wsl $WIN_SHARED_FOLDER)"
  fi

  wslVariables(){
    alias cr='cd /' #CFOLDER
  }

  WlsGuiXfce4(){
    alias gstart="sudo /etc/init.d/xrdp start"  #XFCE4
    alias gstop="sudo /etc/init.d/xrdp stop"    #XFCE4
    alias gpath="C:\WINDOWS\system32\mstsc.exe" #XFCE4
    alias ginfo="localhost:3390"                #XFCE4
  }

  wslVariables
  WlsGuiXfce4

fi
