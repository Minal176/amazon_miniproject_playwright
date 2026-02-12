// utils/testUtils.ts
import { chromium, firefox, Browser, BrowserContext, Page } from 'playwright';

export async function launchBrowser(browserType: 'chromium' | 'firefox') {
  if (browserType === 'chromium') {
    return await chromium.launch({ headless: false });
  }
  if (browserType === 'firefox') {
    return await firefox.launch({ headless: false });
  }
  throw new Error(`Unsupported browser type: ${browserType}`);
}

export async function createPage(browser: Browser): Promise<{ context: BrowserContext; page: Page }> {
  const context = await browser.newContext();
  const page = await context.newPage();
  return { context, page };
}

export async function closeBrowser(browser: Browser) {
  await browser.close();
}
