pnpm add husky -D
npx husky install
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'

  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },