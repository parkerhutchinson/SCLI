import { Command, Flags } from "../../../types/command.d.ts";
import { readEnvFile } from "../../../lib/env-io.ts";
import makeTable from "../../../utils/make-table.ts";

/**
 * @description shows the currently active environment
 * @param name string: the environment name
 * @returns
 */
const showEnvironment = async (_args: Flags) => {
  const activeEnvironment = await readEnvFile();
  let table;

  if (activeEnvironment.length === 0) {
    table = await makeTable([["active environment"], ["no environment set"]], {
      theme: { rowTextColor: "red" },
    });
  } else {
    table = await makeTable(
      [["active environment"], [`${activeEnvironment}`]],
      { theme: { rowTextColor: "cyan" } }
    );
  }
  console.log("\n");
  console.log(table);
};

const showEnvironmentCommand: Command = {
  name: "show-env",
  docs: "\n shows the active environment the outcome of set-environment \n",
  exec: async (args: Flags) => await showEnvironment(args),
};

export default showEnvironmentCommand;
