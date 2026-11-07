// Vitest's global proxy does not inherit JSDOM's Window toStringTag.
Object.defineProperty(window, Symbol.toStringTag, { value: 'Window', configurable: true })
