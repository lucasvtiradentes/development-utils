import path from 'path'
import puppeteer from 'puppeteer'

const isPkg: boolean = typeof process['pkg'] !== 'undefined'
const systemPlataform = process.platform;
const executionFromPath = process.execPath;
const originalPath = puppeteer.executablePath();

(async () => {

  let finalChromiumPath = ''

  if (!isPkg){
    finalChromiumPath = originalPath
  } else if (isPkg && systemPlataform === 'win32') {
    finalChromiumPath = path.join(path.dirname(executionFromPath), 'chromium', 'chrome.exe')
  } else {
    console.log("System is not compatible yet!")
    process.exit()
  }

  console.log("")
  console.log(`isPkg             = ${isPkg}`)
  console.log(`systemPlataform   = ${systemPlataform}`)
  console.log(`finalChromiumPath = ${finalChromiumPath}`)

  try{
    const browser = await puppeteer.launch({ executablePath: finalChromiumPath, headless: false, defaultViewport: null });
    const page = (await browser.pages())[0]
    await page.goto('https://www.google.com')
  } catch(e){
    console.log(`Erro: ${e.message}`)
  }

})()
