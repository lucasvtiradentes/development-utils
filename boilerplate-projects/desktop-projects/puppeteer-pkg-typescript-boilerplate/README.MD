<h1 align="center">
    Puppeteer pkg boilerplate
</h1>

<p align="center">
  <a href="#information_source-description">Description</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="#information_source-features">Features</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-edit-it">How to edit it?</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-distribute-it">How to distribute it?</a>
</p>

## :information_source: Description

This is a boilerplate to package nodejs-pupeteer-typescript automation softwares to run them in non dev enviroment, just with a chromium folder in the same place as the executable.

<div align="center" style="text-align: center;">
  <img src="https://i.giphy.com/media/fHUYsFZGipuxrIdjly/giphy.webp">
</div>

This boilerplate I used whenever I need to automate a task and other people will use the solution, so they dont need install other tech related softwares like nodejs.

## :information_source: Features

- [x] Package nodejs-puppeteer-typescript code to run in non dev enviroments;
- [x] Detect which enviroment is runing: OS and NODENV (devlopment or production);

## :information_source: Technologies

This project uses the following technologies:

<div align="center" style="text-align: center;">
  <table>
    <tr>
      <th>Scope</th>
      <th>Technologies</th>
    </tr>
    <tr>
      <td>main</td>
      <td align="center">
        <a target="_blank" href="https://nodejs.org"><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"></a>
      </td>
    </tr>
    <tr>
      <td>secondary</td>
      <td align="center">
        <a target="_blank" href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"></a>
      </td>
    </tr>
    <tr>
      <td>dev tools</td>
      <td align="center">
        <a target="_blank" href="https://editorconfig.org/"><img src="https://img.shields.io/badge/editorconfig-gray?style=for-the-badge&logo=editorconfig&logoColor=white"></a>
      </td>
    </tr>
  </table>
</div>

## :information_source: How to edit it

To clone this repository and make changes in the source code, you'll need [Git](https://git-scm.com) and [Nodejs](https://nodejs.org/en/).

```bash
# Install dependencies
$ npm install

# Run the code in devlopment mode
$ npm run dev
```

## :information_source: How to distribute it

First edit the code and make the automation you want to, and after compile the source code running the following script:

```bash
# Compile the source code into a executable
$ npm run build
```

The script above will generate an `build` folder with the executable and a folder called `chromium`, **you'll need to distribute both the chromium folder and the executable file in order to run** the executable in non dev environment.

---

Made with ♥ by Lucas Vieira.

Get it touch: [github](https://github.com/lucasvtiradentes) | [linkedin](https://www.linkedin.com/in/lucasvtiradentes) | lucasvtiradentes@gmail.com
