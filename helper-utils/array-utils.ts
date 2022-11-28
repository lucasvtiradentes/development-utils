"use strict";

export { sortObjectsArrayByKey }

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
