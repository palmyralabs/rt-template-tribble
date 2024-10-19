
import serveStatic from 'serve-static';

/**
 * Server Static data from 'testdata'.  
 * 
 * In production, these data would be provided by the backend servers.
 */

export default () => ({  
  name: 'general-assets',
  configureServer(server) {  
    server.middlewares.use(serveStatic('demo/apidata', { index: false }))
  }
})