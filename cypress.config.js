const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false, 
  
  env: {
    valid_username: 'standard_user',  
    valid_password: 'secret_sauce',
    invalid_password: 'secret_chilisauce'
  },

  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  

    viewportWidth: 1280,
    viewportHeight: 720
})
