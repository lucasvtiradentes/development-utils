## INTERFACE ##########################################################################################################################
  ZSH_THEME="avit"
  # robbyrussell gianu

# Colorful messages
  e_header()  { echo -e "\n\033[1m$@\033[0m"; }

## PLUGINS#############################################################################################################################
  plugins=(
      git
      zsh-autosuggestions
  )

## ALIAS ##############################################################################################################################
  alias zshconfig="mate ~/.zshrc"
  alias ohmyzsh="mate ~/.oh-my-zsh"
  alias myip="curl http://ipecho.net/plain; echo"
  alias reload="source ~/.zshrc"

#######################################################################################################################################
  export ZSH="/home/lucasvtiradentes/.oh-my-zsh"
  source $ZSH/oh-my-zsh.sh

#######################################################################################################################################
  loadProfile='/home/lucasvtiradentes/loadWinProfile.sh'
  loadedFile='/mnt/c/Users/Lucas/.profile'
  [[ ( -e $loadProfile && -e $loadedFile ) ]] && emulate sh -c 'source "$loadProfile" "$loadedFile"'

#######################################################################################################################################
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

#######################################################################################################################################
