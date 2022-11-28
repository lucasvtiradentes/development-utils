"use strict";

import { existsSync, readFileSync } from "fs";

export { readJson }

function readJson(jsonPath: string): object {
  try {
    if (!existsSync(jsonPath)) { throw new Error(`Json ${jsonPath} não foi encontrado!`) }
    const rawdata = readFileSync(jsonPath);
    const parsedData = JSON.parse(rawdata.toString());
    return parsedData
  } catch(e){
    console.log(`error: ${e.message}`)
    return {}
  }
}
