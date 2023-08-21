export interface SQL {
    /**
     * Get single value from the given query - first column from first returned row.
     * @param query - SQL query with ? used as parameter placeholder
     * @param [params] - array of params if needed
     * @returns [object] - single value
     */
    getValue(query: string, params?: object[]): any;
    /**
     * Get first returned row.
     * @param query - SQL query with ? used as parameter placeholder
     * @param [params] - array of params if needed
     * @returns - map of column name to column value
     */
    getRow(query: string, params?: object[]): any;
    /**
     * Get all returned rows.
     * @param query - SQL query with ? used as parameter placeholder
     * @param [params] - array of params if needed
     * @returns - array of all rows, each row is a map of column name to column value
     */
    getRows(query: string, params?: object[]): object[];
    /**
     * Get a map of first column mapping to second column.
     * @param query - SQL query with ? used as parameter placeholder
     * @param [params] - array of params if needed
     * @returns - map of first column to second column
     */
    getMap(query: string, params?: object[]): any;
    /**
     * Get a first column in an array.
     * @param query - SQL query with ? used as parameter placeholder
     * @param [params] - array of params if needed
     * @returns - array of first column of all returned rows
     */
    getColumn(query: string, params?: object[]): object[];
    /**
     * Execute SQL
     * @param query - SQL query with ? used as parameter placeholder
     * @param [params] - array of params if needed
     */
    execute(query: string, params?: object[]): void;
}