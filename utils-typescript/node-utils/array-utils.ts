"use strict";

export {
  getColumn,
  deleteLines,
  deleteColumns,
  vlookup,
  trimColumn,
  addSpaceBeforeColumn,
  makeColumnNumeric,
  getOnlyUniqueColumnItens,
  checkIfValueIsInColumn,
  sumColumn,
  concatenateArraysVertically,
  makeRowsEquallySpaced,
  sortObjectsArrayByKey
}

function getColumn(ARR_ARG_Analisada, col) {
  var column = new Array();
  if (!ARR_ARG_Analisada) {
    return;
  }
  for (var i = 0; i < ARR_ARG_Analisada.length; i++) {
    column.push(ARR_ARG_Analisada[i][col]);
  }
  return column;
}

function deleteLines(ARG_ARR_Analisada, ARG_ARR_LinhasRemover) {
  var ARR_tmp = new Array();
  let BOL_linhaRemover;
  if (!ARG_ARR_Analisada) { return }

  for (let x = 0; x < ARG_ARR_Analisada.length; x++) {
    BOL_linhaRemover = false;

    for (let y = 0; y < ARG_ARR_LinhasRemover.length; y++) {
      if (x == ARG_ARR_LinhasRemover[y]) {
        BOL_linhaRemover = true;
      }
    }

    if (!BOL_linhaRemover) {
      ARR_tmp.push(ARG_ARR_Analisada[x]);
    }
  }

  return ARR_tmp;
}

function deleteColumns(ARG_ARR_Analisada, ARG_ARR_ColunasRemover) {
  if (!ARG_ARR_Analisada) { return }

  var array = ARG_ARR_Analisada;
  var idxToDelete = ARG_ARR_ColunasRemover;

  for (var i = 0; i < array.length; i++) {
    var temp = array[i];
    array[i] = [];

    for (var j = 0; j < temp.length; j++) {
      if (idxToDelete.indexOf(j) == -1) {
        array[i].push(temp[j]);
      }
    }
  }

  return array;
}

function vlookup(ARG_ARR_Procurada, ARG_STR_ValorProcurado, ARG_INT_ColunaProcura, ARG_INT_ColunaRetorna) {
  if (ARG_ARR_Procurada) {
    for (let x = 0; x < ARG_ARR_Procurada.length; x++) {
      if (ARG_ARR_Procurada[x][ARG_INT_ColunaProcura] == ARG_STR_ValorProcurado) {
        return ARG_ARR_Procurada[x][ARG_INT_ColunaRetorna];
      }
    }

    return null;
  }
}

function trimColumn(ARG_ARR_Analisada) {

  if (!ARG_ARR_Analisada) { return }
  let ARR_Tmp = new Array();

  for (let x = 0; x < ARG_ARR_Analisada.length; x++) {

    let STR_Atual = ARG_ARR_Analisada[x];
    if (ARG_ARR_Analisada[x]) {
      STR_Atual = STR_Atual.toString();
      STR_Atual = STR_Atual.trim();
    }
    ARR_Tmp.push(STR_Atual)

  }

  return ARR_Tmp;
}

function addSpaceBeforeColumn(ARG_STR_Dados, ARG_INT_Quantidade) {
  if (!ARG_STR_Dados) { return }

  let ARR_Linhas = ARG_STR_Dados.split('\n');
  let STR_Final;
  let STR_espaco = " ";

  for (let x = 0; x < ARR_Linhas.length; x++) {
    if (STR_Final) {
      STR_Final = STR_Final + "\n" + STR_espaco.repeat(ARG_INT_Quantidade) + ARR_Linhas[x]
    } else {
      STR_Final = STR_espaco.repeat(ARG_INT_Quantidade) + ARR_Linhas[x]
    }
  }

  return STR_Final;
}

function makeColumnNumeric(ARG_ARR_Analisada) {

  let ARR_Tmp = new Array();

  if (!ARG_ARR_Analisada) { return }

  for (let x = 0; x < ARG_ARR_Analisada.length; x++) {
    if (ARG_ARR_Analisada[x]) {
      let STR_ItemIteracao = ARG_ARR_Analisada[x].toString();
      STR_ItemIteracao = STR_ItemIteracao.trim();
      ARR_Tmp.push(Number(STR_ItemIteracao))
    }
  }

  return ARR_Tmp;

}

function makeRowsEquallySpaced(ARG_ARR_Formatar, OPC_AntesOuDepois) {
  let ARR_tmp = ARG_ARR_Formatar;
  let ARR_maximos = new Array();
  let STR_espaco = ' ';

  for (let y = 0; y < ARG_ARR_Formatar[0].length; y++) {
    let INT_numMaximo = 0;
    for (let x = 0; x < ARG_ARR_Formatar.length; x++) {
      let str_linha = ARG_ARR_Formatar[x][y];
      str_linha = str_linha.toString();
      if (str_linha.length > INT_numMaximo) {
        INT_numMaximo = str_linha.length;
      }
    }
    ARR_maximos.push(INT_numMaximo);
  }

  for (let y = 0; y < ARG_ARR_Formatar[0].length; y++) {
    for (let x = 0; x < ARG_ARR_Formatar.length; x++) {
      let str_linha = ARG_ARR_Formatar[x][y].toString();
      let INT_quantidade = ARR_maximos[y] - str_linha.length;
      if (OPC_AntesOuDepois == 'Antes') {
        ARR_tmp[x][y] = STR_espaco.repeat(INT_quantidade) + ARR_tmp[x][y];
      } else {
        ARR_tmp[x][y] = ARR_tmp[x][y] + STR_espaco.repeat(INT_quantidade);
      }
    }
  }

  return ARR_tmp;
}

function concatenateArraysVertically(ARG_ARR_Primeira, ARG_ARR_Segunda) {

  let ARR_tmp;
  let ARR_adiciona;

  if (!ARG_ARR_Primeira && !ARG_ARR_Segunda) {
    return null;
  } else if (!ARG_ARR_Primeira) {
    ARR_adiciona = ARG_ARR_Segunda;
    ARR_tmp = new Array();
  } else if (!ARG_ARR_Segunda) {
    ARR_adiciona = ARG_ARR_Primeira;
    ARR_tmp = new Array();
  } else {
    ARR_adiciona = ARG_ARR_Segunda;
    ARR_tmp = ARG_ARR_Primeira;
  }

  for (let x = 0; x < ARR_adiciona.length; x++) {
    ARR_tmp.push(ARR_adiciona[x]);
  }

  return ARR_tmp;

}

function sumColumn(ARG_ARR_Analisada, ARG_INT_Coluna) {

  if (!ARG_ARR_Analisada) { return }

  let INT_soma = 0;
  let NumAtual;

  for (let x = 0; x < ARG_ARR_Analisada.length; x++) {
    if (ARG_ARR_Analisada[x][ARG_INT_Coluna]) {
      NumAtual = ARG_ARR_Analisada[x][ARG_INT_Coluna].toString();
      NumAtual = NumAtual.replace(',', '.');
      NumAtual = parseFloat(NumAtual);
      INT_soma = INT_soma + NumAtual;
    }
  }

  INT_soma = Number(INT_soma.toFixed(2));

  return INT_soma;
}

function getOnlyUniqueColumnItens(ARG_ARR_Analisada, col) {

  if (!ARG_ARR_Analisada) { return }

  let ARR_JaAdicionada;

  for (var i = 0; i < ARG_ARR_Analisada.length; i++) {
    let VAR_ItemIteracao;

    if (col) {
      VAR_ItemIteracao = ARG_ARR_Analisada[i][col];
    } else {
      VAR_ItemIteracao = ARG_ARR_Analisada[i];
    }

    if (!ARR_JaAdicionada) {
      ARR_JaAdicionada = new Array();
      ARR_JaAdicionada.push(VAR_ItemIteracao);
    } else {
      let BOL_ItemEncontrado = false;

      for (let y = 0; y < ARR_JaAdicionada.length; y++) {
        let VAR_ItemCompara;

        if (col) {
          VAR_ItemCompara = ARR_JaAdicionada[y][col];
        } else {
          VAR_ItemCompara = ARR_JaAdicionada[y];
        }

        if (VAR_ItemIteracao === VAR_ItemCompara) {
          BOL_ItemEncontrado = true;
        }
      }

      if (!BOL_ItemEncontrado) {
        ARR_JaAdicionada.push(VAR_ItemIteracao);
      }
    }
  }

  console.log(ARR_JaAdicionada);
  return ARR_JaAdicionada;
}

function checkIfValueIsInColumn(arrayToSearch, valueToSearch, opt_columnToSearch) {

  if (!arrayToSearch || !valueToSearch) { return }

  if (opt_columnToSearch) {
    for (let x = 0; x < arrayToSearch.length; x++) {
      if (arrayToSearch[x][opt_columnToSearch] == valueToSearch) {
        return true;
      }
    }
  } else {
    for (let x = 0; x < arrayToSearch.length; x++) {
      if (arrayToSearch[x] == valueToSearch) {
        return true;
      }
    }
  }

  return false;
}

function sortObjectsArrayByKey(arrToSort: any[], keyToSort: string): any[] {
  try {
    if (!arrToSort || !keyToSort) { throw new Error('Parameters were not provided!') }
    let newArr = [...arrToSort]
    newArr = newArr.sort((a: any, b: any) => {
      if (a[keyToSort] === b[keyToSort]) {
        return 0;
      } else {
        return (a[keyToSort] < b[keyToSort]) ? -1 : 1;
      }
    });
    return newArr;
  } catch (e) {
    return []
  }
}
