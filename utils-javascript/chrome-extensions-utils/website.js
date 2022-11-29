// LAST EDIT: 01/06/2020

export {

  getSiteContent,
  getUrlParameters,
  getCurrentPageUrl,

  realoadCurrentPage,
  openLinkAtCurrentPage,
  openLinkNewPage,

  clickElement,
  setFunctionWhenClickElement,

  addScriptToPage,
  addCssToPage,
  addFunctionToPage,

  addItemToOptionElement,
  getOptionItemIndex,
  getSelectedOptionItem,

  setPageTitle,
  setFunctionWhenWindowLoad,
  setFunctionWhenPageLoad
}

function getSiteContent(STR_ARG_url) {

  function getContent(url, callback) {

    if (!window.XMLHttpRequest) return;
    if (typeof (callback) !== 'function') return;
    var xhr = new XMLHttpRequest();
    // xhr.timeout = 10000;

    xhr.open('GET', url);
    xhr.responseType = 'document';
    xhr.send();

    xhr.onload = function () {
      console.log("CARREGOU: " + url);
      callback(this.responseXML);
    }
  };

  return new Promise((resolve, reject) => {
    getContent(STR_ARG_url, function (response) {
      if (response) {
        resolve(response)
      } else {
        reject(new Error("Erro ao carregar página"))
      }
    });
  })
}

function getUrlParameters() {

  var vars = new Object();

  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });

  return vars;
}

function getCurrentPageUrl() {
  return window.location.href;
}

function realoadCurrentPage() {
  window.location.href = window.location.pathname + window.location.search + window.location.hash;
}

function openLinkAtCurrentPage(url) {
  window.location.href = url;
}

function openLinkNewPage(url, focus = false) {

  window.open(url, '_blank');

  if (focus) {
    win.focus();
  }
}

function clickElement(elem) {

  var event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });

  var cancelled = !elem.dispatchEvent(event);

}

function setFunctionWhenClickElement(el, click_function) {
  if (el) {
    el.addEventListener('click', click_function);
  }
}

function addScriptToPage(local_script) {
  var add_script = document.createElement('script');
  add_script.src = local_script; // chrome.extension.getURL();
  document.getElementsByTagName('head')[0].appendChild(add_script);
}

function addCssToPage(local_script) {
  var style = document.createElement('link');
  style.rel = 'stylesheet';
  style.type = 'text/css';
  style.href = local_script; // chrome.extension.getURL();
  document.getElementsByTagName('head')[0].appendChild(style);
}

function addFunctionToPage(functionToAdd) {
  var add_script = document.createElement('script');
  add_script.innerHTML = `\n ${functionToAdd} \n`;
  document.getElementsByTagName('head')[0].appendChild(add_script);
}

function addItemToOptionElement(element, STR_ARG_option, STR_ARG_value) {

  if (element) {
    var el_optionCriado = document.createElement("OPTION");
    el_optionCriado.setAttribute("value", STR_ARG_value);
    el_optionCriado.innerText = STR_ARG_option
    element.appendChild(el_optionCriado);
  }
}

function getOptionItemIndex(optionElement, seachedValue) {
  for (let x = 0; x < optionElement.options.length; x++) {
    if (String(optionElement.options[x].text) == String(seachedValue)) {
      return String(x);
    }
  }
}

function getSelectedOptionItem(el) {
  if (el) {
    return el.options[el.selectedIndex].text
  }
}

function setPageTitle(ARG_STR_Titulo) {
  document.title = ARG_STR_Titulo
}

function setFunctionWhenWindowLoad(functionToRun) {
  window.onload = functionToRun;
}

function setFunctionWhenPageLoad(functionToRun) {
  document.addEventListener('load', functionToRun)
}
