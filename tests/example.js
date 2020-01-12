const puppeteer = require('puppeteer')
const expect = require('chai').expect
const config = require('../lib/config')
const click = require('../lib/helpers').click
const typeText = require('../lib/helpers').typeText
const loadUrl = require('../lib/helpers').loadUrl
const waitForText = require('../lib/helpers').waitForText
const pressKey = require('../lib/helpers').pressKey
const shouldExist = require('../lib/helpers').shouldExist
const getCount = require('../lib/helpers').getCount

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

  const LOGIN_FORM = '#login_form'

  describe('Login test', () => {
    it('Should navigate to homepage', async () => {
      await loadUrl(page, config.baseUrl)
      await shouldExist(page, "#online_banking_features")

    })

    it('Should click on signin button', async () => {
      await click(page, '#signin_button')
      await shouldExist(page, LOGIN_FORM)
    })

    it('Should submit login form', async () => {
      await typeText(page, utils.generateID(), '#user_login')
      await typeText(page, utils.generateNumbers(), '#user_password')
      await click(page, '.btn-primary')
    })

    it('Should get error message', async () => {
      await waitForText(page, 'body', 'Login and/or password are wrong.')
      await shouldExist(page, LOGIN_FORM)
    })
  })

  describe('Search Test', () => {
    it('Should navigate to homrpage', async () => {
      await loadUrl(page, config.baseUrl)
      await shouldExist(page, '#online_banking_features')
    })

    it('Should submit search phrase', async () => {
      await typeText(page, "hello world", '#searchTerm')
      await pressKey(page, 'Enter')
    })

    it('Should display search result', async () => {
      await waitForText(page, 'h2', 'Search Results')
      await waitForText(page, 'body', 'No results were found for the query')
    })
  })

  describe('Navbar Link Test', () => {
    it('Should navigate to homrpage', async () => {
      await loadUrl(page, config.baseUrl)
      await shouldExist(page, '#online_banking_features')
    })

    it('Should have correct number of links', async () => {
      // get count of links
      const numberOfLinks = await getCount(page, '#pages-nav > li')
      // assert the count
      expect(numberOfLinks).to.equal(3)
    })
  })


})



// it('My first test step', async () => {
//   await loadUrl(page, config.baseUrl)
//   await shouldExist(page, '#nav-search')
//   const url = await page.url()
//   const title = await page.title()

//   expect(url).to.contain('dev')
//   expect(title).to.contain("Community")

// })

// it('browser reload', async () => {
//   await page.reload()
//   await shouldExist(page, '#page-content')

//   await waitForText(page, 'body', 'WRITE A POST')

//   const url = await page.url()
//   const title = await page.title()

//   expect(url).to.contain('dev')
//   expect(title).to.contain("Community")

// })

// it('click method', async () => {
//   await loadUrl(page, config.baseUrl)
//   await click(page, '#write-link')
//   await shouldExist(page, '.registration-rainbow')

// })

// it('submit searchbox', async () => {
//   await loadUrl(page, config.baseUrl)
//   // await typeText(page, 'Javascript', '#nav-search')
//   await typeText(page, utils.generateEmail(), '#nav-search')
//   await page.waitFor(3000)
//   await pressKey(page, 'Enter')
//   await shouldExist(page, '#articles-list')
// })