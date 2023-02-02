/*! itty-compressor. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */

/** @typedef {'gzip' | 'deflate' | 'deflate-raw'} SupportedFormats */

/**
 * @param {*} body
 * @param {SupportedFormats} [format]
 */
export var compress = (body, format = 'gzip') => new Response(
  new Response(body == null ? '' : body).body
    .pipeThrough(new CompressionStream(format)))

/**
 * @param {*} body
 * @param {SupportedFormats} [format]
 */
export var decompress = (body, format = 'gzip') => new Response(
  new Response(body == null ? '' : body).body
    .pipeThrough(new DecompressionStream(format)))
