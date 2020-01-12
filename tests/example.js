const puppeteer = require('puppeteer')
const expect = require('chai').expect
const config = require('../lib/config')
const click = require('../lib/helpers').click
const typeText = require('../lib/helpers').typeText
const loadUrl = require('../lib/helpers').loadUrl
const waitForText = require('../lib/helpers').waitForText
const pressKey = require('../lib/helpers').pressKey
const shouldExist = require('../lib/helpers').shouldExist
const utils = require('../lib/utils')

describe('My first puppeteer test', () => {
  let brower
  let page
  before(async function () {
    brower = await puppeteer.launch({
      handless: config.isHeadless,
      slowMo: config.slowMo,
      devtools: config.isDevtools,
      timeout: config.launchTimeout
    })
    page = await brower.newPage()
    await page.setDefaultTimeout(config.waitingTimeout)
    await page.setViewport({
      width: config.viewportWidth,
      height: config.viewpoerHeight
    })
  })

  after(async function () {
    await brower.close()
  })
  it('My first test step', async () => {
    await loadUrl(page, config.baseUrl)
    await shouldExist(page, '#nav-search')
    const url = await page.url()
    const title = await page.title()

    expect(url).to.contain('dev')
    expect(title).to.contain("Community")

  })

  it('browser reload', async () => {
    await page.reload()
    await shouldExist(page, '#page-content')

    await waitForText(page, 'body', 'WRITE A POST')

    const url = await page.url()
    const title = await page.title()

    expect(url).to.contain('dev')
    expect(title).to.contain("Community")

  })

  it('click method', async () => {
    await loadUrl(page, config.baseUrl)
    await click(page, '#write-link')
    await shouldExist(page, '.registration-rainbow')

  })

  it('submit searchbox', async () => {
    await loadUrl(page, config.baseUrl)
    // await typeText(page, 'Javascript', '#nav-search')
    await typeText(page, utils.generateEmail(), '#nav-search')
    await page.waitFor(3000)
    await pressKey(page, 'Enter')
    await shouldExist(page, '#articles-list')
  })
})
