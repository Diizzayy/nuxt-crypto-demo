export default defineNuxtConfig({
  devtools: { enabled: true },

  vite: {
    define: {
      global: 'globalThis'
    },

    resolve: {
      alias: {
        // required to polyfill node crypto module
        crypto: 'crypto-browserify',
        stream: 'stream-browserify',

        buffer: 'unenv/runtime/node/buffer/index',
        'node:buffer': 'unenv/runtime/node/buffer/index'
      }
    },

    plugins: [
      { // work around for `exports is not defined` error within the crypto-browserify > randomfill dep
        name: 'crypto-randomfill-patch',

        apply: 'build',
        enforce: 'pre',

        renderChunk(code, chunk) {
          if (!/randomfill.*\.js$/.test(chunk.fileName)) {
            return null
          }

          console.log('🟪 Patching crypto randomfill dep')

          const modifiedCode = code.split('\n').map(line => {
            if (line.trim() === 'exports.randomFill = randomFill;') {
              return 'var exports = {}; exports.randomFill = randomFill;'
            }

            return line
          }).join('\n')

          return { code: modifiedCode, map: null }
        }
      }
    ],

    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // isolate randomfill as a separate chunk
            if (id.includes('node_modules/randomfill/browser.js')) {
              return 'randomfill'
            }
          }
        }
      }
    }
  }
})
