// 生成所有时区的映射表
const fs = require('fs');
const path = require('path');

// 获取所有支持的时区
const timezones = Intl.supportedValuesOf('timeZone');

// 导入完整的城市翻译表
const cityNames = require('./city-translations');
const regionTranslations = require('./region-translations');

// 国家/地区的国旗 emoji
const regionFlags = {
  'Africa': '🌍',
  'America': '🌎',
  'Antarctica': '🇦🇶',
  'Arctic': '🌐',
  'Asia': '🌏',
  'Atlantic': '🌊',
  'Australia': '🇦🇺',
  'Europe': '🇪🇺',
  'Indian': '🌊',
  'Pacific': '🌊',
};

// 特定国家的国旗
const countryFlags = {
  'China': '🇨🇳',
  'Japan': '🇯🇵',
  'Korea': '🇰🇷',
  'India': '🇮🇳',
  'Singapore': '🇸🇬',
  'Thailand': '🇹🇭',
  'Malaysia': '🇲🇾',
  'Indonesia': '🇮🇩',
  'Philippines': '🇵🇭',
  'Vietnam': '🇻🇳',
  'Russia': '🇷🇺',
  'Turkey': '🇹🇷',
  'UAE': '🇦🇪',
  'Saudi': '🇸🇦',
  'Israel': '🇮🇱',
  'Egypt': '🇪🇬',
  'South_Africa': '🇿🇦',
  'Nigeria': '🇳🇬',
  'Kenya': '🇰🇪',
  'UK': '🇬🇧',
  'France': '🇫🇷',
  'Germany': '🇩🇪',
  'Italy': '🇮🇹',
  'Spain': '🇪🇸',
  'Netherlands': '🇳🇱',
  'Belgium': '🇧🇪',
  'Switzerland': '🇨🇭',
  'Austria': '🇦🇹',
  'Sweden': '🇸🇪',
  'Norway': '🇳🇴',
  'Denmark': '🇩🇰',
  'Finland': '🇫🇮',
  'Poland': '🇵🇱',
  'Czech': '🇨🇿',
  'Hungary': '🇭🇺',
  'Greece': '🇬🇷',
  'Portugal': '🇵🇹',
  'USA': '🇺🇸',
  'Canada': '🇨🇦',
  'Mexico': '🇲🇽',
  'Brazil': '🇧🇷',
  'Argentina': '🇦🇷',
  'Chile': '🇨🇱',
  'Colombia': '🇨🇴',
  'Peru': '🇵🇪',
  'Australia': '🇦🇺',
  'New_Zealand': '🇳🇿',
};

// 获取时区的 UTC 偏移量
function getUTCOffset(timezone) {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      timeZoneName: 'longOffset'
    });
    
    const parts = formatter.formatToParts(now);
    const offsetPart = parts.find(part => part.type === 'timeZoneName');
    
    if (offsetPart && offsetPart.value.startsWith('GMT')) {
      const offset = offsetPart.value.replace('GMT', '');
      return offset === '' ? '+00:00' : offset;
    }
    
    return '+00:00';
  } catch (e) {
    return '+00:00';
  }
}

// 生成友好的城市名称
function generateCityName(timezone) {
  const parts = timezone.split('/');
  const city = parts[parts.length - 1].replace(/_/g, ' ');
  return city;
}

// 生成中文名称
function generateChineseName(timezone) {
  const parts = timezone.split('/');
  const region = parts[0];
  const city = parts[parts.length - 1];
  
  const chineseCity = cityNames[city] || city.replace(/_/g, ' ');
  
  return chineseCity;
}

// 获取国旗
function getFlag(timezone) {
  const parts = timezone.split('/');
  const region = parts[0];
  
  // 检查特定国家
  for (const [country, flag] of Object.entries(countryFlags)) {
    if (timezone.includes(country)) {
      return flag;
    }
  }
  
  // 特殊处理
  if (timezone.includes('London')) return '🇬🇧';
  if (timezone.includes('Paris')) return '🇫🇷';
  if (timezone.includes('Berlin')) return '🇩🇪';
  if (timezone.includes('Rome')) return '🇮🇹';
  if (timezone.includes('Madrid')) return '🇪🇸';
  if (timezone.includes('Amsterdam')) return '🇳🇱';
  if (timezone.includes('Brussels')) return '🇧🇪';
  if (timezone.includes('Zurich')) return '🇨🇭';
  if (timezone.includes('Vienna')) return '🇦🇹';
  if (timezone.includes('Stockholm')) return '🇸🇪';
  if (timezone.includes('Oslo')) return '🇳🇴';
  if (timezone.includes('Copenhagen')) return '🇩🇰';
  if (timezone.includes('Helsinki')) return '🇫🇮';
  if (timezone.includes('Warsaw')) return '🇵🇱';
  if (timezone.includes('Prague')) return '🇨🇿';
  if (timezone.includes('Budapest')) return '🇭🇺';
  if (timezone.includes('Athens')) return '🇬🇷';
  if (timezone.includes('Lisbon')) return '🇵🇹';
  if (timezone.includes('Dublin')) return '🇮🇪';
  if (timezone.includes('Moscow')) return '🇷🇺';
  if (timezone.includes('Istanbul')) return '🇹🇷';
  if (timezone.includes('Dubai')) return '🇦🇪';
  if (timezone.includes('Riyadh')) return '🇸🇦';
  if (timezone.includes('Jerusalem')) return '🇮🇱';
  if (timezone.includes('Cairo')) return '🇪🇬';
  if (timezone.includes('Johannesburg')) return '🇿🇦';
  if (timezone.includes('Lagos')) return '🇳🇬';
  if (timezone.includes('Nairobi')) return '🇰🇪';
  if (timezone.includes('Shanghai') || timezone.includes('Chongqing') || timezone.includes('Urumqi') || timezone.includes('Harbin')) return '🇨🇳';
  if (timezone.includes('Hong_Kong')) return '🇭🇰';
  if (timezone.includes('Taipei')) return '🇹🇼';
  if (timezone.includes('Tokyo')) return '🇯🇵';
  if (timezone.includes('Seoul')) return '🇰🇷';
  if (timezone.includes('Singapore')) return '🇸🇬';
  if (timezone.includes('Bangkok')) return '🇹🇭';
  if (timezone.includes('Kuala_Lumpur')) return '🇲🇾';
  if (timezone.includes('Jakarta')) return '🇮🇩';
  if (timezone.includes('Manila')) return '🇵🇭';
  if (timezone.includes('Ho_Chi_Minh')) return '🇻🇳';
  if (timezone.includes('Kolkata') || timezone.includes('Mumbai') || timezone.includes('Delhi')) return '🇮🇳';
  if (timezone.includes('Karachi')) return '🇵🇰';
  if (timezone.includes('Dhaka')) return '🇧🇩';
  if (timezone.includes('New_York') || timezone.includes('Los_Angeles') || timezone.includes('Chicago') || timezone.includes('Phoenix') || timezone.includes('Denver')) return '🇺🇸';
  if (timezone.includes('Toronto') || timezone.includes('Vancouver') || timezone.includes('Montreal')) return '🇨🇦';
  if (timezone.includes('Mexico_City')) return '🇲🇽';
  if (timezone.includes('Sao_Paulo') || timezone.includes('Rio')) return '🇧🇷';
  if (timezone.includes('Buenos_Aires')) return '🇦🇷';
  if (timezone.includes('Santiago')) return '🇨🇱';
  if (timezone.includes('Bogota')) return '🇨🇴';
  if (timezone.includes('Lima')) return '🇵🇪';
  if (timezone.includes('Sydney') || timezone.includes('Melbourne') || timezone.includes('Brisbane') || timezone.includes('Perth')) return '🇦🇺';
  if (timezone.includes('Auckland')) return '🇳🇿';
  
  return regionFlags[region] || '🌐';
}

// 生成地区名称
function generateRegionName(timezone) {
  const parts = timezone.split('/');
  const region = parts[0];
  
  // 处理特殊情况
  if (parts.length > 2) {
    // 如 America/Argentina/Buenos_Aires
    const subRegion = parts[1];
    if (regionTranslations[subRegion]) {
      return regionTranslations[subRegion];
    }
  }
  
  return regionTranslations[region] || { zh: region, en: region };
}

// 生成时区数据
const timezoneData = {};

timezones.forEach(timezone => {
  const regionInfo = generateRegionName(timezone);
  timezoneData[timezone] = {
    zh: generateChineseName(timezone),
    en: generateCityName(timezone),
    region: regionInfo.en,
    regionZh: regionInfo.zh,
    offset: getUTCOffset(timezone),
    flag: getFlag(timezone)
  };
});

// 手动添加可能缺失的时区（某些浏览器可能支持但 Node.js 不支持）
const additionalTimezones = ['America/Coyhaique'];

additionalTimezones.forEach(timezone => {
  if (!timezoneData[timezone]) {
    try {
      const regionInfo = generateRegionName(timezone);
      timezoneData[timezone] = {
        zh: generateChineseName(timezone),
        en: generateCityName(timezone),
        region: regionInfo.en,
        regionZh: regionInfo.zh,
        offset: getUTCOffset(timezone),
        flag: getFlag(timezone)
      };
      console.log(`✅ 添加额外时区: ${timezone}`);
    } catch (e) {
      console.log(`⚠️  无法添加时区: ${timezone}`);
    }
  }
});

// 生成 TypeScript 文件
const finalCount = Object.keys(timezoneData).length;
const tsContent = `// 自动生成的时区映射表
// 生成时间: ${new Date().toISOString()}
// 总计: ${finalCount} 个时区

export interface TimezoneLocale {
  zh: string;
  en: string;
  region: string;
  regionZh: string;
  offset: string;
  flag: string;
}

export const timezoneLocales: Record<string, TimezoneLocale> = ${JSON.stringify(timezoneData, null, 2)};

export const timezoneKeys = Object.keys(timezoneLocales);

// 按地区分组的时区
export const timezonesByRegion = {
  Africa: timezoneKeys.filter(tz => tz.startsWith('Africa/')),
  America: timezoneKeys.filter(tz => tz.startsWith('America/')),
  Antarctica: timezoneKeys.filter(tz => tz.startsWith('Antarctica/')),
  Arctic: timezoneKeys.filter(tz => tz.startsWith('Arctic/')),
  Asia: timezoneKeys.filter(tz => tz.startsWith('Asia/')),
  Atlantic: timezoneKeys.filter(tz => tz.startsWith('Atlantic/')),
  Australia: timezoneKeys.filter(tz => tz.startsWith('Australia/')),
  Europe: timezoneKeys.filter(tz => tz.startsWith('Europe/')),
  Indian: timezoneKeys.filter(tz => tz.startsWith('Indian/')),
  Pacific: timezoneKeys.filter(tz => tz.startsWith('Pacific/')),
  Other: timezoneKeys.filter(tz => !tz.includes('/'))
};

// 热门城市时区（用于默认显示）
export const popularTimezones = [
  'Asia/Shanghai',
  'Asia/Tokyo',
  'Asia/Seoul',
  'Asia/Hong_Kong',
  'Asia/Singapore',
  'Asia/Dubai',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Europe/Moscow',
  'America/New_York',
  'America/Los_Angeles',
  'America/Chicago',
  'America/Toronto',
  'America/Mexico_City',
  'America/Sao_Paulo',
  'Australia/Sydney',
  'Pacific/Auckland'
];
`;

// 写入文件
const outputPath = path.join(__dirname, '..', 'lib', 'timezones.ts');
fs.writeFileSync(outputPath, tsContent, 'utf-8');

console.log(`✅ 成功生成 ${finalCount} 个时区的映射表`);
console.log(`📁 文件位置: ${outputPath}`);
