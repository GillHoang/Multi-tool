javascript: (function () {
    window.webpackChunkdiscord_app.push([
        [Math.random()],
        {},
        (req) => {
            for (const m of Object.keys(req.c)
                .map((x) => req.c[x].exports)
                .filter((x) => x)) {
                if (m.default && m.default.getToken !== undefined) {

                    return void  (alert(m.default.getToken()));
                }
                if (m.getToken !== undefined) {
                    
                    return void (alert(m.getToken()))
                } else {
                    return void  (alert("Đã có lỗi"))
                }
            }
        },
    ])
})();