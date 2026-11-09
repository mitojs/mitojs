import { test, expect } from '@playwright/test'

// Load the packed CDN bundle without initializing the example's own client.
test.beforeEach(async ({ page }) => {
  await page.route('**/initMito.js', (route) => route.fulfill({ contentType: 'application/javascript', body: '' }))
  await page.goto('/JS/index.html')
  await page.evaluate(() => { document.body.innerHTML = '<button id="action">Record action</button>' })
})

test('#26: one native click produces one breadcrumb for one initialized client', async ({ page }) => {
  await page.evaluate(() => { (window as any).client = (window as any).MITO.init({ silentConsole: true }) })
  await page.getByRole('button', { name: 'Record action' }).click()
  expect(await page.evaluate(() => (window as any).client.breadcrumb.getStack().filter((entry: any) => entry.type === 'UI.Click'))).toHaveLength(1)
})

test('#42: repeated use installs a custom DOM listener once and captures startup events', async ({ page }) => {
  await page.evaluate(() => {
    const events: string[] = []
    ;(window as any).events = events
    const client = new (window as any).MITO.BrowserClient()
    const plugin = {
      name: 'dom',
      monitor(notify: Function) {
        notify('dom', 'started')
        document.addEventListener('click', () => notify('dom', 'clicked'))
      },
      transform: (event: string) => event,
      consumer: (event: string) => events.push(event)
    }
    client.use([plugin, plugin])
    client.use([plugin])
  })
  await page.getByRole('button', { name: 'Record action' }).click()
  expect(await page.evaluate(() => (window as any).events)).toEqual(['started', 'clicked'])
})

