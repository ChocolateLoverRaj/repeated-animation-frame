> [!WARNING]  
> I no longer use or maintain this library. I don't really code in JavaScript anymore (I switched to Rust). If you want to maintain or fork it let me know and I can put the link here.

# repeated-animation-frame

![Created with ](https://img.shields.io/badge/Created%20with-@programmerraj/create-3cb371?style=flat)
[![TS-Standard - Typescript Standard Style Guide](https://badgen.net/badge/code%20style/ts-standard/blue?icon=typescript)](https://github.com/standard/ts-standard)

Repeatedly call a function or async function with [request animation frame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame).

## Npm Package
[`repeated-animation-frame`](https://npmjs.com/package/repeated-animation-frame)

## Example
```js
import { repeatedAnimationFrame } from 'repeated-animation-frame'

const stop = repeatedAnimationFrame(() => {
  // Animate something idk
  // This function keeps on getting called
})

// If you want to stop
stop()
```

## Docs
https://chocolateloverraj.github.io/repeated-animation-frame/
