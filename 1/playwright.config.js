// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright测试配置文件
 * 用于测试摩洛哥手工艺平台
 */
module.exports = defineConfig({
  testDir: './tests',
  /* 测试超时时间 */
  timeout: 30 * 1000,
  expect: {
    /* 断言超时时间 */
    timeout: 5000
  },
  /* 并行运行测试 */
  fullyParallel: true,
  /* 失败时不重试 */
  retries: 0,
  /* 工作进程数 */
  workers: process.env.CI ? 1 : undefined,
  /* 测试报告配置 */
  reporter: 'html',
  /* 共享测试配置 */
  use: {
    /* 基础URL */
    baseURL: 'http://localhost:8000',
    /* 浏览器追踪 */
    trace: 'on-first-retry',
    /* 截图配置 */
    screenshot: 'only-on-failure',
  },

  /* 配置测试项目 */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    /* 移动端测试 */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* 开发服务器配置 */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:8000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
