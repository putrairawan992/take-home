const { TextEncoder, TextDecoder } = require("text-encoding");

// Polyfill TextEncoder if it's not available (e.g., in Node.js environment)
if (typeof TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
}

// Polyfill TextDecoder if it's not available (e.g., in Node.js environment)
if (typeof TextDecoder === "undefined") {
  global.TextDecoder = TextDecoder;
}
