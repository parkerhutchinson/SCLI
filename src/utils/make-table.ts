interface StringStyles {
  connector: string;
  row: string;
  cell: string;
  eol: string;
  space: string;
}

/**
 * @description table helper function for adding vertical borders
 * @param {number[]} maxColumnLengths: array of the max column widths
 * @param {StringStyles} stringStyles: styling object of string characters for the table
 * @returns string[]
 */
const makeVerticalRowBorder = (
  maxColumnLengths: number[],
  stringStyles: StringStyles
): string[] => {
  let tableString: string[] = [];

  tableString.push(stringStyles.connector);

  for (let i = 0; i < maxColumnLengths.length; i++) {
    const rowString = stringStyles.row
      .repeat(maxColumnLengths[i] + 2)
      .split("");
    tableString = [...tableString, ...rowString];
    tableString.push(stringStyles.connector);
  }

  tableString.push(stringStyles.eol);

  return tableString;
};


/**
 * @description CLI helper for creating formatted tables.
 * @param {string[][]} rows: multidimensional array of strings [['header1', 'header2'],['value1','value2'],['value3','value4']]
 * @returns string
 */
const makeTable = async (rows: string[][]): Promise<string> => {
  let tableString: string[] = [];
  // string length reducer
  const getMaxStringLengthReducer = (a: string, b: string): string =>
    a.length > b.length ? a : b;
  // calculate the longest string in each column across all rows
  const maxStringLengths = rows[0].map(
    (_, colIndex: number) =>
      rows
        .map((columns: string[]) => columns[colIndex])
        .reduce(getMaxStringLengthReducer).length
  );

  const stringStyles = {
    connector: "+",
    row: "-",
    cell: "|",
    eol: "\n",
    space: " ",
  };

  rows.forEach((columns: string[], rowIndex: number) => {
    // make border top
    tableString = [
      ...tableString,
      ...makeVerticalRowBorder(
        maxStringLengths, 
        stringStyles
      ),
    ];

    // start row
    tableString.push(stringStyles.cell);

    // generate column strings with correct padding
    columns.forEach((column: string, colIndex: number) => {
      const rightPadding =
        column.length >= maxStringLengths[colIndex]
          ? 0
          : maxStringLengths[colIndex] - column.length;
      // hey i made my own string padder, guess I didnt need to import a whole package for that.... never forget left-pad.
      const columnString = column + stringStyles.space.repeat(rightPadding);

      // pad left 1 space + add string with pad right applied
      tableString.push(stringStyles.space);
      tableString.push(columnString);

      // pad right 1 space + cell wall
      tableString.push(stringStyles.space);
      tableString.push(stringStyles.cell);
    });

    tableString.push(stringStyles.eol);

    // end the table with a final border
    if (rowIndex === rows.length - 1) {
      tableString = [
        ...tableString,
        ...makeVerticalRowBorder(
          maxStringLengths,
          stringStyles
        ),
      ];
    }
  });

  return await tableString.join("");
};

export default makeTable;
