## LOAD .bashrc ========================================

echo "-> Loaded .profile WSL"

## VARIABLES ===========================================

DOTENVFOLDER=/mnt/c/Users/lucasvtiradentes

## LOAD .profile =======================================

if [[ ( -n "$BASH_VERSION" ) && ( -f "$DOTENVFOLDER/.profile" )  ]]; then
  source "$DOTENVFOLDER/.profile"
fi
