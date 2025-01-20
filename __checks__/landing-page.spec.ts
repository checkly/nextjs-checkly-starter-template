import { test, expect } from '@playwright/test'

test('Landing page', async ({ page }) => {
  const baseURL = process.env.ENVIRONMENT_URL || 'https://nextjs-checkly-starter-template.vercel.app'
  const response = await page.goto(baseURL)
  expect(response?.status()).toBeLessThan(400)
  await page.screenshot({ path: 'test-results/screenshot/landing-page.jpg' })
  await expect(page.getByText('deploy now')).toBeVisible()
})
