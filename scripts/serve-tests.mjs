import { createServer } from 'node:http'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { resolve, extname, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const consumers = process.env.SDK_CONSUMER_ROOT ?? resolve(root, '.cache/consumers')
const routes = {
  '/browserDist': resolve(root, 'artifacts/unpacked/browser/dist'),
  '/webDist': resolve(root, 'artifacts/unpacked/web/dist'),
  '/JS': resolve(root, 'examples/JS'), '/Vue': resolve(root, 'examples/Vue'),
  '/Vue3': resolve(root, 'examples/Vue3'), '/React': resolve(root, 'examples/React'),
  '/react-sdk-demo': resolve(consumers, 'react-sdk-demo/docs'),
  '/vue2-sdk-demo': resolve(consumers, 'vue2-sdk-demo/docs'),
  '/vue3-sdk-demo': resolve(consumers, 'vue3-sdk-demo/docs'),
  '/vendor/react.js': resolve(root, 'node_modules/react/umd/react.production.min.js'),
  '/vendor/react-dom.js': resolve(root, 'node_modules/react-dom/umd/react-dom.production.min.js')
}
const reports = []
const mime = { '.js': 'application/javascript', '.css': 'text/css', '.html': 'text/html', '.json': 'application/json', '.svg': 'image/svg+xml' }
const server = createServer(async (request, response) => {
  const url = new URL(request.url, 'http://localhost')
  const path = decodeURIComponent(url.pathname)
  if (/^\/(normal|exception|abnormal)(\/post)?$/.test(path)) {
    response.statusCode = path.includes('exception') || path.includes('abnormal') ? 500 : 200
    response.setHeader('Content-Type', 'application/json')
    return response.end('{"data":"test response"}')
  }
  if (request.method === 'POST') {
    let body = ''
    for await (const chunk of request) body += chunk
    if (path === '/__reset') reports.length = 0
    else { try { reports.push(JSON.parse(body)) } catch { /* Non-SDK request. */ } }
    response.setHeader('Content-Type', 'application/json')
    return response.end('{"ok":true}')
  }
  if (path === '/__reports') {
    response.setHeader('Content-Type', 'application/json')
    return response.end(JSON.stringify(reports))
  }
  for (const [prefix, directory] of Object.entries(routes)) {
    if (path !== prefix && !path.startsWith(`${prefix}/`)) continue
    const target = extname(directory) ? directory : resolve(directory, `.${path.slice(prefix.length) || '/'}`)
    if (target !== directory && !target.startsWith(`${directory}${sep}`)) { response.statusCode = 403; return response.end() }
    const file = existsSync(target) && statSync(target).isDirectory() ? resolve(target, 'index.html') : target
    if (!existsSync(file)) { response.statusCode = 404; return response.end('Not found') }
    let body = readFileSync(file)
    if (extname(file) === '.html') body = Buffer.from(body.toString().replace(/https:\/\/[^"']*\/react@[^"']*\/umd\/react[^"']*\.js/g, '/vendor/react.js').replace(/https:\/\/[^"']*\/react-dom@[^"']*\/umd\/react-dom[^"']*\.js/g, '/vendor/react-dom.js'))
    response.setHeader('Content-Type', mime[extname(file)] ?? 'application/octet-stream')
    return response.end(body)
  }
  response.statusCode = 404
  response.end('Not found')
})
server.listen(2021, '127.0.0.1', () => console.log('SDK test server: http://localhost:2021'))
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => server.close(() => process.exit()))
