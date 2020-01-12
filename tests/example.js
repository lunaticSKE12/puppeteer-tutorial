// Core Packages
const puppeteer = require('puppeteer')
const expect = require('chai').expect

// Helper Functions
const config = require('../lib/config')
const click = require('../lib/helpers').click
const typeText = require('../lib/helpers').typeText
const loadUrl = require('../lib/helpers').loadUrl
const waitForText = require('../lib/helpers').waitForText
const pressKey = require('../lib/helpers').pressKey
const shouldExist = require('../lib/helpers').shouldExist
const getCount = require('../lib/helpers').getCount

// Utility Functions
const utils = require('../lib/utils')

const homePage = require('../page-object/home-page')
const loginPage = require('../page-object/login-page')

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

  describe('Login test', () => {
    it('Should navigate to homepage', async () => {
      await loadUrl(page, config.baseUrl)
      await shouldExist(page, homePage.BANKING_FEATURES)

    })

    it('Should click on signin button', async () => {
      await click(page, homePage.SIGN_IN_BUTTON)
      await shouldExist(page, loginPage.LOGIN_FORM)
    })

    it('Should submit login form', async () => {
      await typeText(page, utils.generateID(), loginPage.USER_NAME)
      await typeText(page, utils.generateNumbers(), loginPage.USER_PASSWORD)
      await click(page, '.btn-primary')
    })

    it('Should get error message', async () => {
      await waitForText(page, 'body', 'Login and/or password are wrong.')
      await shouldExist(page, loginPage.LOGIN_FORM)
    })
  })

  describe('Search Test', () => {
    it('Should navigate to homrpage', async () => {
      await loadUrl(page, config.baseUrl)
      await shouldExist(page, homePage.BANKING_FEATURES)
    })

    it('Should submit search phrase', async () => {
      await typeText(page, "hello world", homePage.SEARCH_BAR)
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
      await shouldExist(page, homePage.BANKING_FEATURES)

    })

    it('Should have correct number of links', async () => {
      // get count of links
      const numberOfLinks = await getCount(page, '#pages-nav > li')
      // assert the count
      expect(numberOfLinks).to.equal(3)
    })
  })

  describe('Feedback Test', () => {
    it('Should navigate to homrpage', async () => {
      await loadUrl(page, config.baseUrl)
      await shouldExist(page, homePage.BANKING_FEATURES)

    })

    it('Should click on feedback link', async () => {
      await click(page, homePage.FEEDBACK)
      await shouldExist(page, 'form')
    })
    it('Should submit feedback form', async () => {
      await typeText(page, 'Kaniel', '#name')
      await typeText(page, utils.generateEmail(), '#email')
      await typeText(page, 'Just Subject', '#subject')
      await typeText(page, "comment", '#comment')
      await click(page, 'input[type="submit"]')
    })

    it('Should display success message', async () => {
      await shouldExist(page, '#feedback-title')
      await waitForText(page, 'body', 'Thank you for your comments')
    })
  })

  describe('Forgotten password', () => {
    it('Should navigate to homrpage', async () => {
      await loadUrl(page, config.baseUrl)
      await shouldExist(page, homePage.BANKING_FEATURES)
    })

    it('Should load forgotten password form', async () => {
      await loadUrl(page, 'http://zero.webappsecurity.com/forgot-password.html')
      await waitForText(page, 'h3', 'Forgotten Password')
    })
    it('Should submit email', async () => {
      await typeText(page, utils.generateEmail(), '#user_email')
      await click(page, ".btn-primary")
    })
    it('Should display success', async () => {
      await waitForText(
        page, 'body', 'Your password will be sent to the following email'
      )
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