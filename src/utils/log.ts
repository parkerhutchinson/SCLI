import chalk from 'https://deno.land/x/chalk_deno@v4.1.1-deno/source/index.js';

/**
 * 
 * @param {string} value: the string value you want colorized
 * @param {string} color: color value to colorize text with
 */
const log = (value:string|unknown, color:string):void => {
  //@ts-ignore: chalk doesn't have type bindings
  console.log(chalk[color](value))
}

export default log;