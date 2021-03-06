import chalk from "https://deno.land/x/chalk_deno@v4.1.1-deno/source/index.js";

interface StringStyles {
  connector?: string;
  row?: string;
  cell?: string;
  eol?: string;
  space?: string;
}

interface Theme {
  headerTextColor?: string;
  headerBorderColor?: string;
  rowTextColor?: string;
  rowBorderColor?: string;
}

interface Config {
  stringStyles?: StringStyles;
  theme?: Theme;
}

const defaultConfig = {
  stringStyles: {
    connector: "+",
    row: "-",
    cell: "|",
    eol: "\n",
    space: " ",
  },
  theme: {
    headerTextColor: "inherit",
    headerBorderColor: "inherit",
    rowTextColor: "inherit",
    rowBorderColor: "inherit",
  },
};

const chalkW = (value: string, color: string) => {
  // since chalk for deno is trash we cant just use it inline we have to wrap
  // it because of the issues with TS and chalk.
  // @ts-ignore: fuck you chalk, you're old.
  return color === "inherit" ? value : chalk[color](value);
};

/**
 * @description table helper function for adding vertical borders
 * @param {number[]} maxColumnLengths: array of the max column widths
 * @param {StringStyles} stringStyles: styling object of string characters for the table
 * @param {string} color: color value for theming using chalk color names
 * @returns string[]
 */
const makeVerticalRowBorder = (
  maxColumnLengths: number[],
  stringStyles: StringStyles,
  color: string
): string[] => {
  let tableString: string[] = [];
  const styles = Object.assign({}, defaultConfig.stringStyles, stringStyles);
  tableString.push(chalkW(styles.connector, color));

  for (let i = 0; i < maxColumnLengths.length; i++) {
    const rowString = chalkW(styles.row, color)
      .repeat(maxColumnLengths[i] + 2)
      .split("");
    tableString = [...tableString, ...rowString];
    tableString.push(chalkW(styles.connector, color));
  }

  tableString.push(styles.eol);

  return tableString;
};

/**
 * @description CLI helper for creating formatted tables.
 * @param {string[][]} rows: multidimensional array of 
 * strings where the first nested array is inferred as the header followed by rows 
 * [['header1', 'header2'],['value1','value2'],['value3','value4']]
 * @param {Config} config theming settings that not only adds colors for 
 * header text, header border, row text, and row border. But also
 * allows you to replace any character symbol with any other character ascii symbol you want. 
 * if you want custom borders this is how you do it. 
 * @returns string
 */
const makeTable = async (
  rows: string[][],
  config?: Config
): Promise<string> => {
  const stringStyles = Object.assign({},defaultConfig.stringStyles,config?.stringStyles);
  const theme = Object.assign({}, defaultConfig.theme, config?.theme);

  let tableString: string[] = [];

  const getMaxStringLengthReducer = (a: string, b: string): string =>
    a.length > b.length ? a : b;

  // calculate the longest string in each column across all rows and return the int value of string length.
  const maxStringLengths = rows[0].map(
    (_, colIndex: number) =>
      rows
        .map((columns: string[]) => columns[colIndex])
        .reduce(getMaxStringLengthReducer).length
  );

  rows.forEach((columns: string[], rowIndex: number) => {
    // start row
    tableString = [
      ...tableString,
      ...makeVerticalRowBorder(
        maxStringLengths,
        stringStyles,
        rowIndex === 0 ? theme.headerBorderColor : theme.rowBorderColor
      ),
    ];
    
    tableString.push(
      chalkW(
        stringStyles.cell,
        rowIndex === 0 ? theme.headerBorderColor : theme.rowBorderColor
      )
    );

    // generate column strings with correct padding
    columns.forEach((column: string, colIndex: number) => {
      const rightPadding =
        column.length >= maxStringLengths[colIndex]
          ? 0
          : maxStringLengths[colIndex] - column.length;

      // hey i made my own string padder, guess I didnt need to
      // import a whole package for that.... never forget left-pad.
      const columnString = column + stringStyles.space.repeat(rightPadding);

      // pad left 1 space + add columnString
      tableString.push(stringStyles.space);
      tableString.push(
        chalkW(
          columnString,
          rowIndex === 0 ? theme.headerTextColor : theme.rowTextColor
        )
      );

      // pad right 1 space + cell wall
      tableString.push(stringStyles.space);
      tableString.push(
        chalkW(
          stringStyles.cell,
          rowIndex === 0 ? theme.headerBorderColor : theme.rowBorderColor
        )
      );
    });

    tableString.push(stringStyles.eol);

    // end the table with a final border
    if (rowIndex === rows.length - 1) {
      tableString = [
        ...tableString,
        ...makeVerticalRowBorder(
          maxStringLengths,
          stringStyles,
          theme.rowBorderColor
        ),
      ];
    }
  });

  return await tableString.join("");
};

export default makeTable;
