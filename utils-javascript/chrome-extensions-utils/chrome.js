// LAST EDIT: 01/06/2020

export {

  formatString,

  saveKeyValue,

  getSavedKeyValue,
  getAllSavedKeysObject,
  getAllSavedKeysArray,

  deleteAllSavedKeys,
  deleteSavedKey,

  runJsCodeInCurrentPage,
  showNotification,
  setExtensionIconText,

}

function formatString(STR_ARG_Inicial) {
  let STR_tmp = STR_ARG_Inicial.toString();
  STR_tmp = STR_tmp.replace(/ /g, '');
  STR_tmp = STR_tmp.replace("ç", 'c');
  return STR_tmp;
}

async function saveKeyValue(STR_ARG_Propriedade, STR_ARG_Valor) {

  STR_ARG_Propriedade = formatString(STR_ARG_Propriedade);

  chrome.storage.local.set({ [STR_ARG_Propriedade]: STR_ARG_Valor }, function () { // chrome.storage.sync.set
    console.log("SALVA -> " + STR_ARG_Propriedade + ": " + STR_ARG_Valor);
  });
}

function getSavedKeyValue(STR_ARG_propriedade) {

  STR_ARG_propriedade = formatString(STR_ARG_propriedade);

  return new Promise((resolve, reject) => {

    // chrome.storage.sync.get -> GERA ERRO POIS TEM LIMITE MTO BAIXO
    chrome.storage.local.get(STR_ARG_propriedade, function (data) {
      if (data[STR_ARG_propriedade]) {
        resolve(data[STR_ARG_propriedade])
      } else {
        reject(new Error("Propriedade não encontrada: |" + STR_ARG_propriedade + "|"))
      }
    });
  });
}

function getAllSavedKeysObject() {

  return new Promise((resolve, reject) => {
    chrome.storage.local.get(null, function (items) {

      var allKeys = Object.keys(items);

      if (allKeys) {
        resolve(allKeys)
      } else {
        reject(new Error("Deu barba"))
      }

    });
  });
}

async function getAllSavedKeysArray() {

  let obj_TodasKeys = await getAllSavedKeysObject();
  let ARR_tmp = new Array();

  if (obj_TodasKeys.length == 0) {
    // return Promise.reject("Não tem nada salvo") // new Error()
    return null;
  } else {
    for (let x = 0; x < obj_TodasKeys.length; x++) {
      let key_iteracao = obj_TodasKeys[x];
      let valor_iteracao = await getSavedKeyValue(key_iteracao);
      ARR_tmp.push([key_iteracao, valor_iteracao])
    }
    return ARR_tmp // Promise.resolve()
  }
}

async function deleteAllSavedKeys() {

  let obj_TodasKeys = await getAllSavedKeysObject();

  for (let x = 0; x < obj_TodasKeys.length; x++) {
    let key_iteracao = obj_TodasKeys[x];
    deleteSavedKey(key_iteracao)
  }

}

function deleteSavedKey(STR_ARG_Propriedade) {
  chrome.storage.local.remove(STR_ARG_Propriedade, function () {
    console.log("APAGADA: " + STR_ARG_Propriedade);
  })
}

function runJsCodeInCurrentPage(codeToRun) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {
        code: codeToRun
      }
    );
  });
}

function showNotification() {
  var obj_notifOptions = {
    type: 'basic',
    title: 'Time to Hydrate',
    message: 'Everyday',
    iconUrl: 'icon_super.png'
  }

  chrome.notifications.create('teste', obj_notifOptions);
  alert('pop done');
}

function setExtensionIconText(str_texto) {
  console.log("-> CHROME: " + "setExtensionIconText");
  chrome.browserAction.setBadgeText({ text: str_texto });
}
