"use strict";

import { Page } from "puppeteer"

export {
  loginAtFacebook
}

/* ========================================================================== */

async function loginAtFacebook(page: Page, email: string, password: string): Promise<void> {
  try{
    await page.goto('https://www.facebook.com/login')
    await delay(5000)
    await waitTillHTMLRendered(page)

    await page.waitForSelector('#email', { visible: true })
    await page.type('#email', email)

    await page.waitForSelector('#pass', { visible: true })
    await page.type('#pass', password)

    await page.click('button[name="login"]');
  } catch (e){
    console.log(`Error: ${e.message}`)
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
