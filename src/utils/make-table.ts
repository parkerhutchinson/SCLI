interface StringStyles {
  connector: string 
  row: string
  cell: string
  eol: string
  space: string
}

const makeVerticalRowBorder = (maxColumnLengths:number[], numberOfColumns:number, stringStyles:StringStyles):string[] => {
  const finalString:string[] = [];

  finalString.push(stringStyles.connector);

  for(let i = 0; i < numberOfColumns; i++) {
    const rowString = Array.from({length: maxColumnLengths[i] + 2}).map((_) => stringStyles.row).join("");
    finalString.push(rowString);
    finalString.push(stringStyles.connector);
  }
  
  finalString.push(stringStyles.eol);

  return finalString;
}

const printTable = async (rows: string[][]) => {
  let finalString: string[] = [];
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

  const stringStyles = { connector: "+", row: "-", cell: "|", eol: "\n", space: " " };

  rows.forEach((columns: string[], rowIndex: number) => {
    // make border top
    finalString = [...finalString, ...makeVerticalRowBorder(maxStringLengths, columns.length, stringStyles)];

    // start row
    finalString.push(stringStyles.cell);

    // generate column strings with correct padding
    columns.forEach((column: string, colIndex: number) => {
      const rightPadding =
        column.length >= maxStringLengths[colIndex]
          ? 0
          : maxStringLengths[colIndex] - column.length;
      // hey i made my own string padder, guess I didnt need to import a whole package for that.... never forget left-pad.
      const columnString = column + Array.from({length: rightPadding}).map((_) => stringStyles.space).join("");

      // pad left 1 space + add string with pad right applied
      finalString.push(stringStyles.space);
      finalString.push(columnString);

      // pad right 1 space + cell wall
      finalString.push(stringStyles.space);
      finalString.push(stringStyles.cell);
    });

    finalString.push(stringStyles.eol);

    // end the table with a final border
    if (rowIndex === rows.length - 1) {
      finalString = [...finalString, ...makeVerticalRowBorder(maxStringLengths, columns.length, stringStyles)];
    }  

  });

  return await finalString.join("");
};

export default printTable