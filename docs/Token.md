# How to copy Token?
1. Open Dev Tools in ⋮ ( Ctrl + Shift + I).

2. Select "Console" and enter code in here.

```js
window.webpackChunkdiscord_app.push([[Math.random()], {}, (req) => {for (const m of Object.keys(req.c).map((x) => req.c[x].exports).filter((x) => x)) {if (m.default && m.default.getToken !== undefined) {return copy(m.default.getToken())}if (m.getToken !== undefined) {return copy(m.getToken())}}}]); console.log("%cWorked! Beep Beep", "font-size: 50px"); console.log(`%cYou now have your token in the clipboard!`, "font-size: 16px")
```
3. The code has already copied the TOKEN to your clipboard so you don't need to copy it.
4. Enter TOKEN in Secrets.
