## LOAD PROFILE WIN #####################################################
loadedFile='/c/Users/lucas/.profile'
[[ ( -e $loadedFile ) ]] && source "$loadedFile"

## LOAD PROFILE WSL #####################################################
# loadProfile='/home/lucasvtiradentes/loadWinProfile.sh'
# loadedFile='/mnt/c/Users/Lucas/.profile'
# [[ ( -e $loadProfile && -e $loadedFile ) ]] && source "$loadProfile" "$loadedFile"

## SET BASH TO RUN SH FILES #############################################
alias bash='"C:\\Program Files\\Git\\bin\\bash.exe"'
alias python='winpty python.exe'
alias gcloud="gcloud.cmd"
## alias docker='winpty docker.exe'
