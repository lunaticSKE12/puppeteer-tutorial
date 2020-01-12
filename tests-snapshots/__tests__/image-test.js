const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot')

expect.extend({ toMatchImageSnapshot })

describe('My first snapshot test', () => {
  let browser
  let page

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true
    })
    page = await browser.newPage()
  })

  afterAll(async () => {
    await browser.close()
  })

  test('homepage snapshot', async () => {
    await page.goto('https://example.com')
    const image = await page.screenshot()
    // error less than percent/pixel pass
    // should not use in production
    expect(image).toMatchImageSnapshot({
      failureThreshold: "0.01",
      failureThresholdType: 'percent'
    })
  })

  test('single element snapshot', async () => {
    await page.goto('https://example.com')
    const h1 = await page.waitForSelector('h1')
    const image = await h1.screenshot()
    expect(image).toMatchImageSnapshot()
  })
})
