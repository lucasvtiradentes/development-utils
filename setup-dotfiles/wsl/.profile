## LOAD .bashrc ========================================

echo "-> Loaded .profile WSL"

## export usernames ====================================

WINUSER=lucasvtiradentes
DRIVERLETTER=c
DOTENVFOLDER=/mnt/$DRIVERLETTER/Users/$WINUSER/

## LOAD .profile =======================================

if [[ ( -n "$BASH_VERSION" ) && ( -f "$DOTENVFOLDER/.profile" )  ]]; then
  source "$DOTENVFOLDER/.profile"
fi
