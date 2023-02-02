# itty-compressor <img src="https://user-images.githubusercontent.com/1148376/183421896-8fea5bef-6d32-4f49-ab6c-f2fe7e6ac4ab.svg" width="20px" height="20px" title="This package contains built-in JSDoc declarations (...works as equally well as d.ts)" alt="JSDoc icon, indicating that this package has built-in type declarations">


## Install

`itty-compressor` is an ESM-only module - you are not able to import it with `require`. If you are unable to use ESM in your project you can use the async `import('itty-compressor')` from CommonJS to load `itty-compressor` asynchronously.<br>
`npm install itty-compressor`

To use it in node then you need to have global support for `CompressionStream`,
`DecompressionStream` and `Response` globally installed (Requires NodeJS v18)

note: This dose not currently work in FireFox. (due to lack of Compression stream)

## Usage

For browsers you should use `type="module"`
```html
<script type="module">
  import { compress, decompress } from 'https://cdn.jsdelivr.net/npm/itty-compressor'
  const { compress, decompress } = await import('https://jspm.dev/itty-compressor')
</script>
```

```js
import { compress, decompress } from 'itty-compressor'
import { compress, decompress } from 'https://cdn.jsdelivr.net/npm/itty-compressor'

const body = 'hello world'.repeat(1024)
const compressed = compress(body) // Returns a `Response`
const decompressed = decompress(compressed.body) // Returns a `Response`
```

Both `compress` and ``decompress` takes the same argument that the `Response`
constructor accepts, meaning ArrayBuffer, typed arrays, Blob, File, FormData,
String, URLSearchParams ReadableStream and more. (Unsupported types will be casted to string)<br>

fyi, NodeJS Response version also supports async iterator (so node streams works too)

Both method also supports a 2nd optional format that can be either
`gzip`, `deflate` or `deflate-raw`. it defaults to `gzip`

Both method will return a Response back, so you can consume it anyway you like

```js
await compress(body, 'deflate').arrayBuffer()
await compress(body, 'deflate').blob()
await compress(body, 'deflate').body.pipeTo(new WritableStream({ ... }))

await decompress(body, 'deflate').arrayBuffer()
await decompress(body, 'deflate').blob()
await decompress(body, 'deflate-raw').body.pipeTo(dest)
await decompress(body, 'deflate-raw').text()
await decompress(body, 'deflate-raw').json()
```

`null` and `undefined` is converted to empty string.
