
// TODO: maybe document all row types rather than use generics?
export interface SQL {
    /**
     * Get single value from the given query - first column from first returned row.
     * @param query - SQL query with ? used as parameter placeholder
     * @param [params] - array of params if needed
     * @returns [object] - single value
     */
    getValue<T>(query: string, params?: unknown[]): T;
    /**
     * Get first returned row.
     * @param query - SQL query with ? used as parameter placeholder
     * @param [params] - array of params if needed
     * @returns - map of column name to column value
     */
    getRow<T extends Record<string, unknown>>(query: string, params?: unknown[]): T;
    /**
     * Get all returned rows.
     * @param query - SQL query with ? used as parameter placeholder
     * @param [params] - array of params if needed
     * @returns - array of all rows, each row is a map of column name to column value
     */
    getRows<T extends Record<string, unknown>>(query: string, params?: unknown[]): T[];
    /**
     * Get a map of first column mapping to second column.
     * @param query - SQL query with ? used as parameter placeholder
     * @param [params] - array of params if needed
     * @returns - map of first column to second column
     */
    getMap<K extends string, V>(query: string, params?: unknown[]): Record<K, V>;
    /**
     * Get a first column in an array.
     * @param query - SQL query with ? used as parameter placeholder
     * @param [params] - array of params if needed
     * @returns - array of first column of all returned rows
     */
    getColumn<T>(query: string, params?: unknown[]): T[];
    /**
     * Execute SQL
     * @param query - SQL query with ? used as parameter placeholder
     * @param [params] - array of params if needed
     */
    execute(query: string, params?: unknown[]): void;
}