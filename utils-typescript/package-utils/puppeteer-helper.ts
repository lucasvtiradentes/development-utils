"use strict";

import { Page, Browser } from 'puppeteer';

export {
  saveScreenShot,
  getActivePage,
  waitTillHTMLRendered,
  runJsOnPage,
  addScriptIntoPage
}

async function saveScreenShot(page: Page): Promise<boolean> {
  try {
    if (!page) { throw new Error("page was not provided") }
    await page.screenshot({ path: `screenShot.png`, fullPage: true })
    return true
  } catch (e) {
    return false
  }
}

async function getActivePage(browser: Browser): Promise<Page | false> {
  try {
    const timeout = 3000
    const start = new Date().getTime();
    while (new Date().getTime() - start < timeout) {
      const pages: Page[] = await browser.pages();
      let arr = [];
      for (const p of pages) {
        if (await p.evaluate(() => { return document.visibilityState == 'visible' })) {
          return p
        }
      }
    }
    throw new Error("Unable to get active page");
  } catch (e) {
    return false
  }
}

async function waitTillHTMLRendered(page: Page): Promise<void> {

  try {

    const timeout = 30000
    const checkDurationMsecs = 1000
    const maxChecks = timeout / checkDurationMsecs
    const minStableSizeIterations = 3

    const delay = (time: number) => {
      return new Promise(function (resolve) {
        setTimeout(resolve, time)
      });
    }

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

async function runJsOnPage(page: Page, command: string): Promise<any> {
  try {
    return await page.evaluate(async (cmd: string) => {
      var result = '';
      try {
        result = eval(cmd)
      } catch (err) {
        result = err.message
      }
      return result
    }, command)
  } catch (e) {
    console.log(`error: ${e.message}`)
  }
}

async function addScriptIntoPage(pageToRun: Page, functionToAdd: string): Promise<void> {
  try {
    await pageToRun.addScriptTag({ content: `\n${functionToAdd}\n` });
  } catch (e) {
    console.log(`error: ${e.message}`)
  }
}
