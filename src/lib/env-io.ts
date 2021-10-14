/**
 * @description standard file write wrapper that writes a scli config file to the users home directory
 * @param {string} env name of environment 
 */
export const writeEnvFile = async (env:string) => {
  try {
    await Deno.writeTextFileSync(`${Deno.env.get("HOME")}/.scli`, JSON.stringify({env: env}), {create:true});
  } catch(err) {
    console.log(err);
  }
}


export const readEnvFile = async (): Promise<string> => {
  let response;
  try {
    response = await Deno.readFileSync(`${Deno.env.get("HOME")}/.scli`);
    const decoder = new TextDecoder("utf-8");
    const fileContents = decoder.decode(response);
    response = JSON.parse(fileContents).env;
  } catch(e) {
    console.log(e.message);
  }
  
  return response;
}