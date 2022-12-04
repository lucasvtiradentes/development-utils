## LOAD .bashrc ========================================

echo "-> Loaded .profile WSL"

## VARIABLES ===========================================

DRIVERLETTER=c
WINUSER=lucasvtiradentes
DOTENVFOLDER=/mnt/$DRIVERLETTER/Users/$WINUSER/

## LOAD .profile =======================================

if [[ ( -n "$BASH_VERSION" ) && ( -f "$DOTENVFOLDER/.profile" )  ]]; then
  source "$DOTENVFOLDER/.profile"
fi

alias reload="source '$DOTENVFOLDER/.profile'"
