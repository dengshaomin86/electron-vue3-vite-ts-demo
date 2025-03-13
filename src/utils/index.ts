/**
 * utils
 */

/**
 * 格式化文件大小, 输出成带单位的字符串
 * @param size 文件大小
 * @param pointLength 精确到的小数点数
 * @param units 单位数组。从字节，到千字节，一直往上指定
 * @returns
 */
export const formatterSize = (size: number, pointLength = 2, units?: string[]) => {
  let unit: string = "";
  units = units || ["B", "K", "M", "G", "TB"];
  while ((unit = units.shift() as string) && size > 1024) {
    size = size / 1024;
  }
  return (unit === "B" ? size : size.toFixed(pointLength)) + unit;
};
