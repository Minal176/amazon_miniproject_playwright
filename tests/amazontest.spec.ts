
import { test } from '@playwright/test';
import { AmazonPage } from '../pages/Amazon.Pages.ts';
import { launchBrowser, createPage, closeBrowser } from '../utils/testUtils.ts';
import fs from 'fs'
const jsonpath: string = './testdata/testData.json'
const data: any = JSON.parse(fs.readFileSync(jsonpath, 'utf-8'))

test('Search mobiles under 30000 and sort by newest arrivals', async () => {
  // Launch a single browser instance (Chromium by default)
  const browser = await launchBrowser('chromium');
  const { page } = await createPage(browser);

  const amazon = new AmazonPage(page);

  await amazon.gotoHome(data.appUrl);
  await amazon.searchProduct(data.searchQueries[0]);
  await amazon.validateResults();
  await amazon.sortByNewestArrivals(data.sortOptions[0]);
  await closeBrowser(browser);
});

//npx allure open ./allure-report
// npx allure generate ./allure-results --clean

