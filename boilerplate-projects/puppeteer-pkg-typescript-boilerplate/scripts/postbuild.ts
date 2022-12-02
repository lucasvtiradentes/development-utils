import {existsSync, rmSync} from 'fs'

const DIST_FOLDER = './dist';
if (existsSync(DIST_FOLDER)){ rmSync(DIST_FOLDER, { recursive: true, force: true }) }

console.log("POST-BUILD!")
