import log from "../../../utils/log.ts";
import { Command, Flags } from "../../../types/command.d.ts";
import { manageContentfulData } from "../../../lib/contentful-data.ts";
import { writeEnvFile } from "../../../lib/env-io.ts";

/**
 * @description deletes a chosen environment
 * @param args string[]: this expects name to be present
 */
const deleteEnvironment = async (args: Flags) => {
  log(`\ndeleting the ${args.name} environment`, "cyan");

  // const {status: _, data} = await manageContentfulData(`environments/${args.name}`, "DELETE");
  // // erase the current local setting. this will cause a wanted error on run-migrations
  // await writeEnvFile("");

  // console.log(data);

  const table = (rows: string[][]) => {
    const columnCount = rows[0].length;
    const finalString: string[] = [];
    const getMaxStringLength = (a: string, b: string): string =>
      a.length > b.length ? a : b;
    // calculate the longest string in each column across all rows
    const maxStringLengths = rows[0].map(
      (_, colIndex: number) =>
        rows
          .map((columns: string[]) => columns[colIndex])
          .reduce(getMaxStringLength).length
    );

    const stringStyles = { connector: "+", row: "-", cell: "|", eol: "\n" };

    rows.forEach((columns: string[], rowIndex: number) => {
      
      finalString.push(stringStyles.connector);
      columns.forEach((_, colIndex:number) => {
        const rowString = Array.from({length: maxStringLengths[colIndex] + 2}).map((_) => stringStyles.row).join("");
        finalString.push(rowString);
        finalString.push(stringStyles.connector);
      });

      finalString.push(stringStyles.eol);
      finalString.push(stringStyles.cell);
      columns.forEach((column: string, colIndex: number) => {
        const rightPadding =
          column.length >= maxStringLengths[colIndex]
            ? 0
            : maxStringLengths[colIndex] - column.length;
        // hey i made my own string padder, guess I didnt need to import a whole package for that.... never forget left-pad.
        const columnString = column + Array.from({length: rightPadding}).map((_) => " ").join("");

        // pad left 1 space + add string with pad right applied
        finalString.push(" ");
        finalString.push(columnString);

        // pad right 1 space + cell wall
        finalString.push(" ");
        finalString.push(stringStyles.cell);
      });

      finalString.push(stringStyles.eol);
      if (rowIndex === rows.length - 1) {
        finalString.push(stringStyles.connector);
        columns.forEach((_, colIndex:number) => {
          const rowString = Array.from({length: maxStringLengths[colIndex] + 2}).map((_) => stringStyles.row).join("");
          finalString.push(rowString);
          finalString.push(stringStyles.connector);
        });
        finalString.push(stringStyles.eol);
      }  

    });

    console.log(finalString.join(""));
  };

  table([
    ["one", "two", "three"],
    ["1", "2", "3"],
    ["this line should be longer", "yes it is", "oh"],
  ]);

  console.log(table);

  await "";
};

const deleteEnvironmentCommand: Command = {
  name: "delete-env",
  requiredFlags: ["name"],
  docs: "\n delete-env will delete a contentful environment given --name's value \n",
  exec: async (args: Flags) => await deleteEnvironment(args),
};

export default deleteEnvironmentCommand;
