const fs = require("fs");
const path = require("path");

/**
 * 格式化日期
 * @param {*} fmt
 * @param {*} date
 * @returns
 */
function dateFormat(date, fmt) {
  var o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}

/**
 * 收集目录下所有vue文件
 * @param {*} filePath 查找目录范围
 * @param {*} fileExtension 文件扩展名
 * @returns 匹配到的文件列表
 */
function collectFiles(filePath, fileExtension) {
  const list = [];
  fs.readdirSync(filePath).forEach((file) => {
    const itemPath = path.join(filePath, file);
    const stats = fs.statSync(itemPath);
    if (stats.isFile() && file.includes(fileExtension)) {
      list.push(itemPath);
    }
    if (stats.isDirectory()) {
      list.push(...collectFiles(itemPath, fileExtension));
    }
  });
  return list;
}

/**
 * 匹配并替换文件内容
 * @param {*} fileList 文件列表
 * @param {*} startTagStr 匹配起始标签str
 * @param {*} EndTagStr 匹配结束标签str
 * @param {*} startReplaceStr 起始替换内容
 * @param {*} endReplaceStr 结束替换内容
 */
function rewriteFiles(dir, fileList, startTagStr, EndTagStr, startReplaceStr, endReplaceStr) {
  let replaceCount = 0;
  let replaceList = []; // 匹配到的文件列表
  let unmatchedList = []; // 未匹配到的文件列表
  function log(data, dir, fileList, replaceCount, replaceList) {
    return `${data}
    -----------------${dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss")} -----------------
    ${dir}目录下共找到了${fileList.length}个文件，替换了${replaceCount}个。
    替换前：
    ${startTagStr} 
    替换后：
    ${startReplaceStr}
    替换前：
    ${EndTagStr}
    替换后：
    ${endReplaceStr}
    \n${replaceList}
    \n未匹配的：${unmatchedList}\n\n
    `;
  }
  fileList.forEach((file) => {
    const data = fs.readFileSync(file, "utf8");
    if (data.includes(startTagStr) && data.includes(EndTagStr)) {
      replaceCount++;
      replaceList.push(file);

      let result1 = data.replace(startTagStr, startReplaceStr);
      let result = result1.replace(EndTagStr, endReplaceStr);
      fs.writeFileSync(file, result, "utf8");
    } else {
      // 未匹配到
      unmatchedList.push(file);
    }
  });
  fs.readFile("./src/replaceLog.txt", "utf-8", function (err, data) {
    if (err) throw new Error(err);
    fs.writeFileSync(
      "./src/replaceLog.txt",
      log(data, dir, fileList, replaceCount, replaceList),
      "utf-8"
    );
  });
}
// 替换d2-container
let dir = "./src/views/tmp";
let strA = `<template>\n  <div class="app-container calendar-list-container">`;
let strB = `</template>\n\n<script>`;
let strB_2 = "</template>\n<script>";

const startReplaceStr = `<template>\n <d2-container>\n  <div class="app-container calendar-list-container">`;
const endReplaceStr = `</d2-container>\n</template>\n\n<script>`;
rewriteFiles(dir, collectFiles(dir, ".vue"), strA, strB_2, startReplaceStr, endReplaceStr);

// 替换分页template
// 嵌套太多，slot不好使
// let strPageA = /<div class="pagination-container">\s+<el-pagination/g;
// let strPageB = /<\/el-pagination>/g;
// let startReplaceStr1 = `<div class="pagination-container"><template slot="footer"><el-pagination`;
// let endReplaceStr1 = `</el-pagination></template>`;
// rewriteFiles(dir, collectFiles(dir, ".vue"), strPageA, strPageB, startReplaceStr1, endReplaceStr1);
