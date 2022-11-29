"use strict";

import { existsSync, readFileSync, appendFileSync } from "node:fs";

export {
  readJson,
  appendDataInJson
}

function readJson(jsonPath: string): object {
  try {
    if (!existsSync(jsonPath)) { throw new Error(`Json ${jsonPath} não foi encontrado!`) }
    const rawdata = readFileSync(jsonPath);
    const parsedData = JSON.parse(rawdata.toString());
    return parsedData
  } catch (e) {
    console.log(`error: ${e.message}`)
    return {}
  }
}

function appendDataInJson(jsonPath: string, configObj: any) {
  try {
    const jsonStringfied = JSON.stringify(configObj, null, 2);
    appendFileSync(jsonPath, jsonStringfied);
  } catch (err) {
    console.log(`error: ${err.message}`)
  }
}
