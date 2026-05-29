import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'v0ztl8cn',
    dataset: 'production'
  },
  deployment: {
    appId: 'fv7eyquip3tjo8lohnuqnnh5',
    autoUpdates: true,
  }
})
