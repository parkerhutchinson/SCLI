
/**
 * @description small wrapper around running subprocesses
 * @param {string[]} commands: array of commands to run.
 */
const run = async (commands: string[]): Promise<void> => {
  const p = await Deno.run({
    cmd: commands,
    stdout: "inherit",
  });

  const { code } = await p.status();
  
  if (code !== 0) {
    console.log(p)
  }
}

export default run;