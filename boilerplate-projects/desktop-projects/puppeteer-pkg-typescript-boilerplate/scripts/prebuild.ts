import { existsSync, mkdirSync, statSync, readdirSync, copyFileSync } from 'fs'
import puppeteer from 'puppeteer'
import path from 'path'

try {

  const DIST_FOLDER = './dist';
  const BUILD_FOLDER = './build';
  const CHORMIUM_FOLDER = `${BUILD_FOLDER}/chromium`

  if (!existsSync(DIST_FOLDER)) { mkdirSync(DIST_FOLDER) }
  if (!existsSync(BUILD_FOLDER)) { mkdirSync(BUILD_FOLDER) }

  if (!existsSync(CHORMIUM_FOLDER)) {
    const originalPath = path.join(puppeteer.executablePath(), '..');
    copyRecursiveSync(originalPath, CHORMIUM_FOLDER)
  }

  console.log("PRE-BUILD!")

} catch (e) {
  console.log(`Erro: ${e.message}`)
}

function copyRecursiveSync(src, dest) {
  var exists = existsSync(src);
  var stats: any = exists && statSync(src);
  var isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    mkdirSync(dest);
    readdirSync(src).forEach(function (childItemName) {
      copyRecursiveSync(path.join(src, childItemName),
        path.join(dest, childItemName));
    });
  } else {
    copyFileSync(src, dest);
  }
};
