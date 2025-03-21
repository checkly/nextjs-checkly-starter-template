import {BrowserCheck, Frequency, RetryStrategyBuilder} from "checkly/constructs"

new BrowserCheck("landing-page-check-1", {
  name: "Landing Page Check",
  frequency: Frequency.EVERY_1H,
  tags: ["web"],
  locations: ["us-east-1", "us-west-1"],
  runParallel: true,
  code: {
    entrypoint: "./landing-page.spec.ts"
  },
  playwrightConfig: {
    use: {
      extraHTTPHeaders: {
        "x-vercel-protection-bypass": process.env.VERCEL_AUTOMATION_BYPASS_SECRET || ""
      }
    }
  },
  retryStrategy: RetryStrategyBuilder.exponentialStrategy({
    maxRetries: 3,
    baseBackoffSeconds: 1,
    sameRegion: true
  })
})
