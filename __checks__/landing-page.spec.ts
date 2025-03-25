import { test, expect } from "@playwright/test"

test.use({
  extraHTTPHeaders: {
    "x-vercel-protection-bypass": process.env.VERCEL_AUTOMATION_BYPASS_SECRET || ""
  }
})

test("Landing page", async ({ page }) => {
  const baseURL = process.env.ENVIRONMENT_URL! || process.env.PRODUCTION_URL!
  const response = await page.goto(baseURL)
  expect(response?.status()).toBeLessThan(400)
  await page.screenshot({ path: "test-results/screenshot/landing-page.jpg" })
  await expect(page.getByText("Go to the GitHub repo")).toBeVisible()
})
