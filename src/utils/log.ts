import chalk from 'https://deno.land/x/chalk_deno@v4.1.1-deno/source/index.js';

/**
 * 
 * @param value string: the string value you want colorized
 * @param color string: color value to colorize text with
 */
const log = (value:string|unknown, color:string):void => {
  //@ts-ignore: chalk does not have type bindings
  console.log(chalk[color](value))
}

export default log;