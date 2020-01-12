module.exports = {
  click: async function (page, selector) {
    try {
      await page.waitForSelector(selector)
      await page.click(selector)
    } catch{
      throw new Error(`Could not click on selector: ${selector}`)
    }
  }
}