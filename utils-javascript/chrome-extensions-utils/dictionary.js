// LAST EDIT: 01/06/2020

export {
  createDictionary,
  getDictionaryValue,
  addDictionaryValue
}

function createDictionary() {
  return new Object();
}

function getDictionaryValue(ARG_ARR_Dicionario, ARG_STR_Key) {

  // console.table(ARG_ARR_Dicionario)

  if (ARG_ARR_Dicionario) {
    for (var key in ARG_ARR_Dicionario) {
      var value = ARG_ARR_Dicionario[key];
      if (key == ARG_STR_Key) {
        // console.log('retorna: ' + value);
        return value;
      }
    }
  }

  return null;
}

function addDictionaryValue(ARG_ARR_Dicionario, ARG_STR_Key, ARG_STR_Value) {

  if (!ARG_ARR_Dicionario) {
    var ARR_tmp = new Object();
  } else {
    var ARR_tmp = ARG_ARR_Dicionario;
  }

  ARR_tmp[ARG_STR_Key] = ARG_STR_Value;
  ARG_ARR_Dicionario = ARR_tmp;

  // console.log('ADICIONOU: ' + ARG_STR_Key + " = " + ARG_STR_Value);
  // console.log(ARG_ARR_Dicionario);

}
