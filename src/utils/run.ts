
/**
 * @description small wrapper around running subprocesses
 * @param commands string[]: array of commands to run.
 */
const run = async (commands: string[]): Promise<void> => {
  const p = Deno.run({
    cmd: commands,
    stdout: "inherit",
  });
  
  const { code } = await p.status();
  
  if (code !== 0) {
    console.log(p)
  }
}

export default run;