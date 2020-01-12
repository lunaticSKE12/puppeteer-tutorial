const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('My first puppeteer test', () => {
  let brower
  let page
  before(async function () {
    brower = await puppeteer.launch({
      handless: false,
      slowMo: 0,
      devtools: false,
      timeout: 10000
    })
    page = await brower.newPage()
    await page.setViewport({
      width: 800,
      height: 600
    })
  })

  after(async function () {
    await brower.close()
  })
  it('My first test step', async () => {
    await page.goto('https://dev.to/')
    await page.waitForSelector('#nav-search')

    const url = await page.url()
    const title = await page.title()

    expect(url).to.contain('dev')
    expect(title).to.contain("Community")

  })

  it('browser reload', async () => {
    await page.reload()
    await page.waitForSelector('#page-content')

    const url = await page.url()
    const title = await page.title()

    expect(url).to.contain('dev')
    expect(title).to.contain("Community")


  })
})
