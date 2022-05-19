# How to copy Token?
1. Open Dev Tools in ⋮ ( Ctrl + Shift + I).

2. Select "Console" and enter code in here.

```js
window.webpackChunkdiscord_app.push([[Math.random()], {}, (req) => {for (const m of Object.keys(req.c).map((x) => req.c[x].exports).filter((x) => x)) {if (m.default && m.default.getToken !== undefined) {return copy(m.default.getToken())}if (m.getToken !== undefined) {return copy(m.getToken())}}}]); console.log("%cWorked! Beep Beep", "font-size: 50px"); console.log(`%cYou now have your token in the clipboard!`, "font-size: 16px")
```
3. The code has already copied the TOKEN to your clipboard so you don't need to copy it.
4. Enter TOKEN in Secrets.



## New Method 

1. Create new bookmarklet by click Add Page in Chrome Bar (right click in here)
2. In name of bookmark, put any name you like
3. In url put this copy: 
```js
javascript: (function () {
  async function createAlertModal(title, descr, token) {
    const cache = () => {
      let webp = window.webpackChunkdiscord_app.push([
        [Symbol()],
        {},
        (_) => _.c,
      ]);
      window.webpackChunkdiscord_app.pop();
      return webp;
    };
    let ConfirmationModal = () => {
      let m = [];
      ((n) => {
        m.push(
          ...Object.values(cache()).filter(
            (m) =>
              m?.exports &&
              ((m?.exports?.default &&
                Object.keys(m.exports.default).some((k) =>
                  k.toLowerCase().includes(n)
                )) ||
                (m.exports?.default?.prototype &&
                  Object.keys(m.exports.default.prototype).some((k) =>
                    k.toLowerCase().includes(n)
                  )) ||
                Object.keys(m.exports).some((k) => k.toLowerCase().includes(n)))
          )
        );
      })("confirmmodal");
      m.forEach((f) =>
        m.push(
          typeof f?.exports?.default === "undefined"
            ? f?.exports
            : f?.exports?.default
        )
      );
      for (var i = 0; i < m.length; i++) {
        m.forEach((f, i) =>
          typeof f?.id === "undefined" ? (m = m) : m.splice(i, 1)
        );
      }
      return [...m][0];
    };
    let Button = () => {
      for (const m of Object.keys(cache())
        .map((x) => cache()[x].exports)
        .filter((x) => x)) {
        if (m.default && m.default["ButtonColors"] !== undefined) {
          return m.default;
        }
      }
    };
    let Messages = () => {
      for (const m of Object.keys(cache())
        .map((x) => cache()[x].exports)
        .filter((x) => x)) {
        if (m && m["COMMANDS"] !== undefined) return m;
      }
    };
    let openModal = () => {
      for (const m of Object.keys(cache())
        .map((x) => cache()[x].exports)
        .filter((x) => x)) {
        if (m && m[("openModal", "closeModal")] !== undefined)
          return m.openModal;
      }
    };
    let React = () => {
      for (const m of Object.keys(cache())
        .map((x) => cache()[x].exports)
        .filter((x) => x)) {
        if (m && m["createElement"] !== undefined) return m;
      }
    };
    let Markdown = () => {
      modules = [];
      filter = (m) => m.default?.displayName === "Markdown" && m.default.rules;
      for (let item in cache()) {
        if (Object.hasOwnProperty.call(cache(), item)) {
          let element = cache()[item].exports;
          if (!element) continue;
          if (filter(element)) modules.push(element);
        }
      }
      return modules[0].default;
    };
    let Alert = () => {
      modules = [];
      filter = (m) => m.default?.displayName === "Alert";
      for (let item in cache()) {
        if (Object.hasOwnProperty.call(cache(), item)) {
          let element = cache()[item].exports;
          if (!element) continue;
          if (filter(element)) modules.push(element);
        }
      }
      return modules[0].default;
    };
    console.log(Messages());
    return new Promise((resolve) => {
      openModal()((props) => {
        if (props.transitionState === 3) resolve(null);
        return React().createElement(
          ConfirmationModal(),
          Object.assign(
            {
              header: title,
              confirmButtonColor: Button().ButtonColors.BRAND,
              confirmText: Messages().COPY_CODE,
              cancelText: Messages().CANCEL,
              onConfirm: () => resolve(copy(token)),
              onCancel: () => resolve(false),
            },
            props
          ),
          React().createElement(Markdown(), {}, descr)
        );
      });
    });
  }
  window.webpackChunkdiscord_app.push([
    [Math.random()],
    {},
    (req) => {
      for (const m of Object.keys(req.c)
        .map((x) => req.c[x].exports)
        .filter((x) => x)) {
        if (m.default && m.default.getToken !== undefined) {
          return createAlertModal(
            "Token",
            `Made by hocsinhgioitoan. \n Click BLue Button To Copy: \n ${m.default.getToken()}`,
            m.default.getToken()
          );
        }
        if (m.getToken !== undefined) {
          return createAlertModal(
            "Token",
            `Made by hocsinhgioitoan. \n Click BLue Button To Copy: \n ${m.getToken()}`,
            m.getToken()
          );
        }
      }
    },
  ]);
  
  function copy(text) {
    var input = document.createElement("textarea");
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand("copy");
    document.body.removeChild(input);
    return result;
  }
})();

```
4. Save it
5. Open discord tab, just click it, it will show for u
6. If u don't find the icon bookmark just go to home and right click to Bookmark Bar and choose `Show Bookmark bar`