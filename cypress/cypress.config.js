const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  e2e: {
    baseUrl: 'https://quickpizza.grafana.com',
    setupNodeEvents(on, config) {},
    // Record videos for the full-run evidence required by the lab.
    video: true,
  },
})
