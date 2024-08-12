import os from "os";
import * as vue from "vue";
import * as element from "element-plus";

console.log(`platform: ${os.platform()}
electron version: ${process.versions.electron}
chrome version: ${process.versions.chrome}
vue version: ${vue.version}
element plus version: ${element.version}
`);
