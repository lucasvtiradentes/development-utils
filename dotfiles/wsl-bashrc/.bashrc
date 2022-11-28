## ADD COLOR TO THE TERMINAL ##########################################################################################################
  case "$TERM" in
      xterm-color|*-256color) color_prompt=yes;;
  esac

  if [ -n "$force_color_prompt" ]; then
      if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
          color_prompt=yes
      else
          color_prompt=
      fi
  fi

  if [ "$color_prompt" = yes ]; then
      PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
  else
      PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
  fi

  unset color_prompt force_color_prompt

## ADD COLOR WHEN RUNNING LS-DIR LIKE COMMANDS ########################################################################################
  if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    #alias dir='dir --color=auto'
    #alias vdir='vdir --color=auto'
    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
  fi

## NVM CONFIGURATION ##################################################################################################################
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

## IMPORT WINDOWS .profile ############################################################################################################
  loadProfile='/home/lucasvtiradentes/loadWinProfile.sh'
  loadedFile='/mnt/c/Users/Lucas/.profile'
  [[ ( -e $loadProfile && -e $loadedFile ) ]] && source "$loadProfile" "$loadedFile"

#######################################################################################################################################
