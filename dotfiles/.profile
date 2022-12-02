## GIT COMMANDS ###########################################################################################################

alias ga='git add .'
alias gc='git add  . && git commit -m'
alias gca='git add . && git commit --amend -m'
alias gi='git init'
alias lg="git log --oneline --decorate --all --graph"

alias po='git push -u origin '
alias pom='git push -u origin master'
alias pfo='git push --force -u origin'
alias pfom='git push --force -u origin master'

alias co='git checkout'
alias com='git checkout master'
alias col='git checkout --'
alias cob='git checkout -b'

alias ni='npm install'
alias nr='npm run'

alias hl='heroku login'

alias hcl='heroku container:login'
alias hcp='heroku container:push'
alias hcr='heroku container:release'

## TOKENS #################################################################################################################

export GH_TOKEN=''
export AWS_ACCESS_KEY_ID=''
export AWS_SECRET_ACCESS_KEY=''
