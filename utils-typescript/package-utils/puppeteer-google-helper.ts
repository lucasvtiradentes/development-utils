"use strict";

import { Page } from "puppeteer"

export {
  loginAtGoogle,
  checkGoogleLogin
}

/* ========================================================================== */

async function loginAtGoogle(page: Page, email: string, password: string): Promise<void> {
  try {
    await page.goto('https://accounts.google.com/')
    await waitTillHTMLRendered(page)
    await delay(10000)

    await page.type('input[type="email"]', email)
    await page.keyboard.press('Enter')
    await waitTillHTMLRendered(page)
    await delay(10000)

    await page.type('input[type="password"]', password)
    await page.keyboard.press('Enter')
    await delay(10000)
  } catch (err) {
    console.log(`Error: ${err.message}`)
  }
}

async function checkGoogleLogin(page: Page): Promise<string | false> {
  try{
    await waitTillHTMLRendered(page)
    const loginResult = await page.evaluate(async () => {
      const elName = document.querySelector('h1.XY0ASe') as HTMLElement
      if (elName) {
        var name = (elName.innerText).toString()
        name = name.replace("Olá, ", "")
        name = name.replace("Hi, ", "")
        name = name.replace("Welcome, ", "")
        name = name.replace("Bem-vindo, ", "")
        return name
      } else {
        return false
      }
    })

    if (loginResult === false) { throw new Error(`Não conseguiu logar no Google`) }

    console.log(`Logou no Google como: [${loginResult}]`)
    return loginResult
  } catch(e){
    console.log(`Error: ${e.message}`)
    return false
  }
}

/* ========================================================================== */

function delay(time: number): Promise<void> {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  });
}

async function waitTillHTMLRendered(page: Page): Promise<void> {
  try {
    const timeout = 30000
    const checkDurationMsecs = 1000
    const maxChecks = timeout / checkDurationMsecs
    const minStableSizeIterations = 3

    let checkCounts = 1
    let lastHTMLSize = 0
    let countStableSizeIterations = 0

    while (checkCounts++ <= maxChecks) {
      let html = await page.content()
      let currentHTMLSize = html.length

      if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize) {
        countStableSizeIterations++
      } else {
        countStableSizeIterations = 0 //reset the counter
      }

      if (countStableSizeIterations >= minStableSizeIterations) {
        console.log("Page rendered fully..")
        break
      } else {
        // console.log('last: ', lastHTMLSize, ' <> curr: ', currentHTMLSize, 'iteractions: ', countStableSizeIterations)
      }

      lastHTMLSize = currentHTMLSize
      await delay(checkDurationMsecs)
    }
  } catch (e) {
    console.log(`Error while waiting page to load: ${e.message}`)
  }

}

/* ========================================================================== */
