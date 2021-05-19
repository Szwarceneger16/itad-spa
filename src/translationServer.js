const i18next = require("i18next");
const middleware = require("i18next-http-middleware");
const express = require("express");
const serveStatic = require("serve-static");
const fs = require("fs");
const path = require("path");
const port = 3101;

i18next.use(middleware.LanguageDetector).init({
  preload: ["en", "pl"],
});

var app = express();

// app.use(
//   "/getTranslation",
//   express.static(path.join(__dirname, "api\\mocks\\translations"), {
//     index: "*.json",
//   })
// );

app.use(
  "/getTranslation",
  serveStatic(path.join(__dirname, "api\\mocks\\translations"), {
    redirect: false,
    index: false,
  })
);

app.use(
  middleware.handle(i18next, {
    ignoreRoutes: ["/foo"], // or function(req, res, options, i18next) { /* return true to ignore */ }
  })
);

// in your request handler
// app.get("/getTranslation/*", (req, res) => {
//   var lng = req.language; // 'de-CH'
//   var lngs = req.languages; // ['de-CH', 'de', 'en']
//   req.i18n.changeLanguage("en"); // will not load that!!! assert it was preloaded
//   console.log(lng);
//   console.log(lngs);
//   console.log(req.params);

//   try {
//     if(fs.existsSync('file.txt')) {
//         res.sendFile('');
//     } else {
//         res.sendStatus(404);
//     }
// } catch (err) {
//     console.error(err);
// }

// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
