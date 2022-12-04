## Git

This is where I put the most tricky concepts about git.

## Comands 

git reset --hard HEAD^

# CRIANDO TAGS
git tag -a v1.0 -m “Sum functionality”
git push origin --tags

# MOSTRANDO 
git tag
git show v1.0

# EXCLUINDO
git tag -d v1.0
git push --delete origin v1.0

,
    "version:major": "npm version major -m \"major release\" --no-git-tag-version",
    "version:minor": "npm version minor -m \"minor release\" --no-git-tag-version",
    "version:patch": "npm version patch -m \"patch release\" --no-git-tag-version"

git checkout -b feat/new-message
npm run acp => git add . && npm run commit && git push
git push --set-upstream origin feat/new-message


git tag -a v1.0.4 -m "version 1.0.4"
git push origin v1.0
.


------------------------

git tag -d v1.0
e depois a exclusão no seu remote:

git push --delete origin v1.0


    "format": "prettier \"src/**/*.js\" --write",
    "lint": "eslint \"src/**/*.js\" --quiet",

    "release-check-files": "npm pack && tar -xvzf *.tgz && rm -rf package *.tgz",
    "patch-release": "npm version patch -m \"release: v%s\" && npm publish && git push --follow-tags",
    "minor-release": "npm version minor -m \"release: v%s\" && npm publish && git push --follow-tags"


## References
