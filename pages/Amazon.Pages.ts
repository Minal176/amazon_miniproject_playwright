
import { Page, expect, Locator } from '@playwright/test';
import fs from 'fs';

export class AmazonPage {
  private page: Page;
  private searchBox: Locator;
  private resultsFor: Locator;
  private sortDropdown: Locator;
  private sortDropdownOptions: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.locator('#twotabsearchtextbox')
    this.resultsFor = page.locator('span:has-text("results for")')
    this.sortDropdown = page.locator('select#s-result-sort-select')
    this.sortDropdownOptions = page.locator('select#s-result-sort-select option')
  }

  async gotoHome(appUrl:string) {
    await this.page.goto(appUrl);
  }

  async searchProduct(query: string) {
    await this.searchBox.fill(query);
    await this.searchBox.press('Enter');
  }

  async validateResults() {
    await this.page.waitForSelector('span:has-text("results for")');
    const resultsText = await this.resultsFor.first().innerText();
    expect(resultsText).toContain('results for');
  }

  async sortByNewestArrivals(searchstr: string) {
  // Option 1: Using Amazon's native select dropdown
    
  expect(await this.sortDropdownOptions.count()).toBeGreaterThanOrEqual(5)
  await this.sortDropdown.selectOption(searchstr);
  const selectedOption = await this.sortDropdown.inputValue();
  expect(selectedOption).toContain('date-desc-rank')

}

}

