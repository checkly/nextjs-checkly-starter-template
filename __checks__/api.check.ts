import { ApiCheck, Frequency, AssertionBuilder, RetryStrategyBuilder } from "checkly/constructs"

new ApiCheck("api-check-1", {
  name: "Greetings API",
  frequency: Frequency.EVERY_1H,
  tags: ["api"],
  locations: ["us-east-1", "us-west-1"],
  runParallel: true,
  setupScript: {
    content: "process.env.BASE_URL = process.env.ENVIRONMENT_URL || process.env.PRODUCTION_URL"
  },
  request: {
    url: "{{BASE_URL}}/api/greetings",
    method: "GET",
    assertions: [
      AssertionBuilder.statusCode().equals(200),
      AssertionBuilder.jsonBody("$[0].text").notEmpty()
    ]
  },
  retryStrategy: RetryStrategyBuilder.exponentialStrategy({
    maxRetries: 3,
    baseBackoffSeconds: 1,
    sameRegion: true
  })
})
