// LAST EDIT: 01/06/2020

export {
  deleteRow,
  deleteColumn,
  addRow,
  addColumn,
  addCell,

  table2Array,
  changeColumnsOrder,
  fixBreakLine
}

/* ========================================================================== */

function deleteRow(table, rowToDelete) {
  table.deleteRow(rowToDelete);
}

function deleteColumn(table, colunaApagar) {
  for (let i = 0; i < table.rows.length; i++) {
    table.rows[i].deleteCell(colunaApagar);
  }
}

function addRow(table) {

  var row = table.insertRow(table.rows.length);

  for (let i = 0; i < table.rows[0].cells.length; i++) {
    addCell(row.insertCell(i), i, 'row');
  }

}

function addColumn(table, headname) {
  for (let i = 0; i < table.rows.length; i++) {
    if (i == 0) {
      addCell(table.rows[i].insertCell(table.rows[i].cells.length), headname, 'col');
    } else {
      addCell(table.rows[i].insertCell(table.rows[i].cells.length), null, 'col');
    }
  }
}

function addCell(cell, text, style) {

  var div = document.createElement('div');
  var txt;

  if (text) {
    txt = document.createTextNode(text);
    div.appendChild(txt);
  }

  div.setAttribute('class', style);
  div.setAttribute('className', style);
  cell.appendChild(div);
}

function table2Array(table_id) {

  if (!table_id) { return null }

  var myData = table_id.rows;
  var my_liste = new Array();

  for (var i = 0; i < myData.length; i++) {
    let el = myData[i].children;
    let my_el = new Array();

    for (var j = 0; j < el.length; j++) {
      my_el.push(el[j].innerText);
    }

    my_liste.push(my_el)
  }

  return my_liste
}

function changeColumnsOrder(el_table, indiceA, indiceB) {

  if (!el_table) { return }

  for (let x = 0; x < el_table.rows.length; x++) {
    var tmp = el_table.rows[x].cells[indiceA].innerHTML
    el_table.rows[x].cells[indiceA].innerHTML = el_table.rows[x].cells[indiceB].innerHTML
    el_table.rows[x].cells[indiceB].innerHTML = tmp
  }

}

function fixBreakLine(EL_table) {
  if (EL_table) {
    for (let x = EL_table.rows.length - 1; 0 <= x; x--) {
      for (let y = 0; y < EL_table.rows[0].cells.length; y++) {
        EL_table.rows[x].cells[y].classList.add("table_nowrap");
      }
    }
  }
}
