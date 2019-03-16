const puppeteer = require('puppeteer');
const _ = require('lodash');

let browser;
let page;

beforeEach(async () => {
  browser = await puppeteer.launch({headless: false, slowMo: 100});

  page = await browser.newPage();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await browser.close();
});

describe('Calculation feature', () => {
  it('opens the Client page', async () => {
    const titleSelector = '[data-e2e-id="app-title"]';
    const pageTitle = await page.$(titleSelector);
    const title = await (await pageTitle.getProperty('textContent')).jsonValue();
    expect(pageTitle).not.toBeNull();
    expect(title).toBe('Calculadora Científica');
  });

  it('renders the values in the screen as the buttons are typed', async () => {
    const screenSelector = '[data-e2e-id="screen"]';

    let finalNumber = '';
    const buttonSelectors = _.range(3).map(() => {
      const randomDigit = Math.floor(Math.random()*10);
      finalNumber = finalNumber + randomDigit;
      return `[data-e2e-id="digit-button-${randomDigit}"]`;
    });

    await page.click(buttonSelectors[0]);
    await page.click(buttonSelectors[1]);
    await page.click(buttonSelectors[2]);

    const screenText = await page.$eval(screenSelector, el => el.textContent);
    expect(screenText).toBe(finalNumber);
  });

  it('calculates an expression typed in', async () => {
    const screenSelector = '[data-e2e-id="screen"]';
    const number1Selectors = [
      '[data-e2e-id="digit-button-4"]',
      '[data-e2e-id="digit-button-5"]'
    ];
    const number2Selectors = [
      '[data-e2e-id="digit-button-3"]',
      '[data-e2e-id="digit-button-9"]'
    ];
    const operatorSelector = '[data-e2e-id="sign-button-+"]';
    const equalButtonSelector = '[data-e2e-id="equal-button"]';

    // Expression to type in: 45+39
    await page.click(number1Selectors[0]);
    await page.click(number1Selectors[1]);
    await page.click(operatorSelector);
    await page.click(number2Selectors[0]);
    await page.click(number2Selectors[1]);

    let screenText = await page.$eval(screenSelector, el => el.textContent);
    await page.click(equalButtonSelector);

    while (screenText === '45+39') {
      screenText = await page.$eval(screenSelector, el => el.textContent);
    }

    expect(screenText).toBe('84');
  });
});
