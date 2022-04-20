const fs = require("fs");

function rewriteRoutesMeta(path) {
  var data = fs.readFileSync(path, "utf-8");
  const reg = /name: ".*?"/g;
  const matchList = [...data.matchAll(reg)];
  const list = matchList.map((res, i) => {
    let arr = res[0].split(":");
    data = data.replace(
      res[0],
      `${arr[0]}s: ${arr[1]}  , meta:{ ...meta, title: ${res[0].split(":")[1]}}`
    );
    return res[0];
  });
  data = data.replaceAll("names", "name");
  // console.log(data);
  fs.writeFileSync(path, data, "utf-8");
}

rewriteRoutesMeta("./router/bank.js");
