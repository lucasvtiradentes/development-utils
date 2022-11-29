"use strict";

import { BrowserWindow, app, session, ipcRenderer } from 'electron';

export {

  // DEFAULT OPTIONS -------------------------------------------------------
  defaultWindowOptions,
  defaultPageOptions,

  // RUN JS, FUNCTION AND EVENTS: MAIN -------------------------------------
  executeEventInWindowFromMain,
  executeJsCommandInWindowFromMain,
  executeJsFunctionInWindowFromMain,

  executeEventInWebviewFromMain,
  executeJsCommandInWebViewFromMain,
  executeJsFunctionInWebViewFromMain,

  executeEventInMainFromMain,

  // RUN JS, FUNCTION AND EVENTS: RENDERER ---------------------------------
  executeEventInRendererFromRenderer,

  executeJsCommandInWebviewFromRenderer,
  executeJsFunctionInWebViewFromRenderer,
  executeEventInWebviewFromRenderer,

  executeEventInMainFromRenderer,

  // RUN JS, FUNCTION AND EVENTS: WEBVIEW ----------------------------------
  executeEventInWindowFromWebview,
  executeEventInMainFromWebview,

  // MAIN UTILS ------------------------------------------------------------
  createNewWindow,
  removeTitleBarFromWindow,
  openLinkInNewWindow,
  openLinkInSpecifiedWindow,
  getWindowSession,
  getWindowUserAgent,
  setWindowUserAgent,
  changeWindowTitle,
  openWindowConsole,
  openWebviewConsole,
  openLinkInWebview,

  // RENDERER UTILS --------------------------------------------------------
  getWindowFromGlobalContext,
  getCurrentWindow,
  getApp,

  // SESSION ---------------------------------------------------------------
  clearSessionStorage,
  setSessionUserAgent,
  getSessionUserAgent,
  createSession,
  useSession,
  changeSessionDownloadFolder,
  getSessionCacheSize,
  downloadUrlFromSession,
  setScriptsToPreloadInSession,
  getPreloadedScriptsInSession,
  getSessionCookies
};













// ####################################################################################################################################
// DEFAULT CONSTANTS
// ####################################################################################################################################

function defaultWindowOptions() {

  const windowOptions = {
    width: 800,
    height: 600,
    // show: false,
    title: 'Market ChatBot',
    // icon: "",
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      // partition: "Tmp",
      // webSecurity:false
    }
  };

  return windowOptions;
}

function defaultPageOptions() {
  const user = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36';
  const pageOptions = {
    userAgent: user
  };
  return pageOptions;
}













// ####################################################################################################################################
// EXECUTE JS, FUNCTIONS AND EVENTS - MAIN
// ####################################################################################################################################

function executeEventInWindowFromMain(windowObj, eventToSend, args) {
  // WINDOW'S DOM MUST BE READY
  windowObj.webContents.send(eventToSend, args);
}

function executeJsCommandInWindowFromMain(windowObj, codeToRun) {
  let win_contents = windowObj.webContents;
  win_contents.executeJavaScript(codeToRun);
}

function executeJsFunctionInWindowFromMain(windowObj, functionToRun, codeToRunFunction) {
  let win_contents = windowObj.webContents;
  win_contents.executeJavaScript(`${functionToRun} \n ${codeToRunFunction}`);
}



function executeEventInWebviewFromMain(windowObj, webviewId, eventToSend, args) {
  const codeRunInWebView = `document.getElementById("${webviewId}").send("${eventToSend}", "${args}")`;
  windowObj.webContents.executeJavaScript(codeRunInWebView);
}

function executeJsCommandInWebViewFromMain(windowObj, webviewId, codeToRun) {
  const codeRunInWebView = `document.getElementById("${webviewId}").executeJavaScript("${codeToRun}")`;
  windowObj.webContents.executeJavaScript(codeRunInWebView);
}

function executeJsFunctionInWebViewFromMain(windowObj, webviewId, functionToRun, codeToRunFunction) {
  const commandExtended = `${functionToRun} \n ${codeToRunFunction}`;
  const runOnWebView = `document.getElementById("${webviewId}").executeJavaScript(\`${commandExtended}\`)`;
  windowObj.webContents.executeJavaScript(runOnWebView);
}



function executeEventInMainFromMain(windowObj, eventToSend, args) {
  if (typeof args !== 'string') { return; }

  const code = `require('electron').ipcRenderer.send("${eventToSend}", "${args}")`;
  windowObj.webContents.executeJavaScript(`console.log(/${code}/)`);
  windowObj.webContents.executeJavaScript(code);

}

// ####################################################################################################################################
// EXECUTE JS, FUNCTIONS AND EVENTS - RENDERER
// ####################################################################################################################################

function executeEventInRendererFromRenderer(windowObj, eventToSend, args) {
  return windowObj.webContents.send(eventToSend, args);
}


async function executeJsCommandInWebviewFromRenderer(webviewId, codeToRunFunction) {
  const el = document.getElementById(webviewId) as any
  return await el.executeJavaScript(codeToRunFunction);
}

async function executeJsFunctionInWebViewFromRenderer(webviewId, functionToRun, codeToRunFunction) {
  const el = document.getElementById(webviewId) as any
  return await el.executeJavaScript(`${functionToRun} \n ${codeToRunFunction}`);
}

function executeEventInWebviewFromRenderer(webviewId, event, args) {
  const el = document.getElementById(webviewId) as any
  return el.send(event, args);
}



function executeEventInMainFromRenderer(eventToSend, args) {
  return ipcRenderer.send(eventToSend, args);
}

// ####################################################################################################################################
// EXECUTE JS, FUNCTIONS AND EVENTS - WEBVIEW
// ####################################################################################################################################

function executeEventInWindowFromWebview(windowObj, eventToSend, args) {
  windowObj.webContents.send(eventToSend, args);
}

function executeEventInMainFromWebview(eventToSend, args) {
  ipcRenderer.send(eventToSend, args);
}






// ####################################################################################################################################
// MAIN UTILS
// ####################################################################################################################################

function createNewWindow(windowOptions) {

  if (!windowOptions) { windowOptions = defaultWindowOptions(); }

  let windowObj = new BrowserWindow(windowOptions);

  return windowObj;
}

function removeTitleBarFromWindow(windowObj) {
  windowObj.setMenu(null);
}

async function openLinkInNewWindow(url, pageOptions, windowOptions) {

  if (!windowOptions) { windowOptions = defaultWindowOptions(); }
  if (!pageOptions) { pageOptions = defaultPageOptions(); }

  const windowObj = createNewWindow(windowOptions);
  openLinkInSpecifiedWindow(windowObj, url, pageOptions);

  return windowObj;
}

function openLinkInSpecifiedWindow(windowObj, url, pageOptions) {

  if (!pageOptions) {
    pageOptions = defaultPageOptions();
  }

  windowObj.loadURL(url, pageOptions);

}

function getWindowSession(windowObj) {
  return windowObj.webContents.session;
}

function getWindowUserAgent(windowObj) {
  return windowObj.webContents.userAgent;
}

function setWindowUserAgent(windowObj, userAgent) {
  windowObj.webContents.userAgent = userAgent;
}

function changeWindowTitle(windowObj, newTitle) {
  windowObj.title = newTitle;
}

function openWindowConsole(windowObj) {
  windowObj.webContents.openDevTools();
}

function openWebviewConsole(windowObj, webviewId) {
  const codeRunInWebView = `document.getElementById("${webviewId}").openDevTools()`;
  windowObj.webContents.executeJavaScript(codeRunInWebView);
}


function openLinkInWebview(windowObj, webviewId, url) {
  const codeRunInWebView = `document.getElementById("${webviewId}").loadURL("${url}")`;
  windowObj.webContents.executeJavaScript(codeRunInWebView);
}












// ####################################################################################################################################
// RENDERER UTILS
// ####################################################################################################################################

function getWindowFromGlobalContext(remote, windowGlobalName) {
  return remote.getGlobal(windowGlobalName);
}

function getCurrentWindow(remote) {
  return remote.getCurrentWindow();
}

function getApp(remote) {
  return remote.app;
}






// ####################################################################################################################################
// ####################################################################################################################################
// ####################################################################################################################################

function clearSessionStorage(session_obj) {
  // const defaultSession = session.defaultSession;
  try {
    session_obj.clearStorageData();
    session_obj.clearCache();
    session_obj.clearAuthCache();
  } catch (e) {
    console.log(e);
  }
}

function setSessionUserAgent(session_obj, userAgent) {
  // 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
  session_obj.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = userAgent;
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });
}

function getSessionUserAgent(session) {

}

function createSession(session_name, options) {

  // persist:session_name -> the page will use a persistent session available to all pages in the app with the same partition
  // session_name         -> the page will use an in-memory session
  // session_name = ""    -> then default session of the app will be returned.

  return session.fromPartition(session_name, options);
}

function useSession(session_name) {
  return session.fromPartition(session_name);
}

function changeSessionDownloadFolder(session_obj, folderPath) {
  // session_obj.on('will-download', (event, item, webContents) => {
  //   event.preventDefault()
  //   require('request')(item.getURL(), (data) => {
  //     require('fs').writeFileSync(folderPath, data)
  //   })
  // })

  session_obj.setDownloadPath(folderPath);

}

function getSessionCacheSize(session_obj) {
  return session_obj.getCacheSize();
}

function downloadUrlFromSession(session_obj, url) {
  session_obj.downloadURL(url);
}

function setScriptsToPreloadInSession(session_obj, arr_scripts) {
  // Scripts que são executadas em todas as páginas
  // scripts: array com os caminhos
  session_obj.setPreloads(arr_scripts);
}

function getPreloadedScriptsInSession(session_obj) {
  // Scripts que são executadas em todas as páginas
  return session_obj.getPreloads();
}

function getSessionCookies(session_obj) {
  session_obj.cookies.get({})
    .then((cookies) => {
      return cookies;
    }).catch((error) => {
      return error;
    });
}

// ####################################################################################################################################
