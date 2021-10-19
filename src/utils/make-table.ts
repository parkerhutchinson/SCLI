const printTable = async (rows: string[][]) => {
  const finalString: string[] = [];
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
      const columnString = column + Array.from({length: rightPadding}).map((_) => stringStyles.space).join("");

      // pad left 1 space + add string with pad right applied
      finalString.push(stringStyles.space);
      finalString.push(columnString);

      // pad right 1 space + cell wall
      finalString.push(stringStyles.space);
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

  return await finalString.join("");
};

export default printTable