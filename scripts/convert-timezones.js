const fs = require('fs');
const path = require('path');

// 读取原始文件
const filePath = path.join(__dirname, '../lib/timezones.ts');
const content = fs.readFileSync(filePath, 'utf-8');

// 提取 timezoneLocales 对象
const match = content.match(/export const timezoneLocales: Record<string, TimezoneLocale> = ({[\s\S]*?});/);
if (!match) {
  console.error('无法找到 timezoneLocales 对象');
  process.exit(1);
}

const oldDataStr = match[1];
const oldData = eval('(' + oldDataStr + ')');

// 转换数据结构
const newData = {};
for (const [key, value] of Object.entries(oldData)) {
  newData[key] = {
    name: {
      zh: value.zh,
      en: value.en
    },
    region: {
      zh: value.regionZh,
      en: value.region
    },
    offset: value.offset,
    flag: value.flag
  };
}

// 生成新的代码
const newDataStr = JSON.stringify(newData, null, 2)
  .replace(/"([^"]+)":/g, '$1:')  // 移除键的引号
  .replace(/"/g, '"')  // 保持字符串值的引号
  .replace(/\n/g, '\n    ');  // 调整缩进

// 替换文件内容
const newContent = content.replace(
  /export const timezoneLocales: Record<string, TimezoneLocale> = {[\s\S]*?};/,
  `export const timezoneLocales: Record<string, TimezoneLocale> = ${newDataStr};`
);

// 写回文件
fs.writeFileSync(filePath, newContent, 'utf-8');
console.log('转换完成！');
