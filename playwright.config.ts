import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 45_000,
  fullyParallel: true,
  workers: process.env.CI ? 2 : 2,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', {open:'never'}]],
  use: {
    baseURL: process.env.TEST_BASE_URL || 'http://127.0.0.1:4173/',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    launchOptions: process.env.PLAYWRIGHT_EXECUTABLE_PATH ? {executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH} : {},
  },
  projects: [
    {name:'desktop',use:{viewport:{width:1366,height:768}}},
    {name:'mobile',use:{viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true}},
  ],
  webServer: process.env.TEST_BASE_URL ? undefined : {command:'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort',url:'http://127.0.0.1:4173',reuseExistingServer:!process.env.CI},
});
