import React from "react";

export type SortDir = "asc" | "desc";

export type Column<T> = {
  key: keyof T | string;
  header: string;
  className?: string;
  render?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  /** Ex.: "120px" | "20%" */
  width?: string | number;
};

export type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  rowKey: (row: T, index: number) => string;
  onRowClick?: (row: T) => void;
  sortKey?: string;
  sortDir?: SortDir;
  onSort?: (key: string, nextDir: SortDir) => void;
  className?: string;
  bordered?: boolean;
};

function SortIcon({ active, dir }: { active: boolean; dir?: SortDir }) {
  if (!active) {
    return (
      <span
        aria-hidden
        className="ml-1 inline-block text-gray-300 dark:text-gray-500"
      >
        ⇅
      </span>
    );
  }
  return (
    <span
      aria-hidden
      className="ml-1 inline-block text-gray-500 dark:text-gray-300"
    >
      {dir === "asc" ? "▲" : "▼"}
    </span>
  );
}

export default function Table<T>({
  data,
  columns,
  rowKey,
  onRowClick,
  sortKey,
  sortDir,
  onSort,
  className = "",
  bordered = true,
}: TableProps<T>) {
  const tableBase = "min-w-full border-collapse text-sm";
  const wrap = bordered
    ? "overflow-auto rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
    : "overflow-auto";

  return (
    <div className={[wrap, className].filter(Boolean).join(" ")}>
      <table className={tableBase}>
        <colgroup>
          {columns.map((col, i) => (
            <col
              key={i}
              {...(col.width !== undefined ? { width: col.width } : {})}
            />
          ))}
        </colgroup>

        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr className="text-left text-gray-600 dark:text-gray-300">
            {columns.map((col) => {
              const align =
                col.align === "center"
                  ? "text-center"
                  : col.align === "right"
                  ? "text-right"
                  : "text-left";
              const active = String(col.key) === String(sortKey);
              const sortable = col.sortable ?? !!onSort;

              const common = "px-4 py-3 font-semibold";
              const classes = [common, align, col.className]
                .filter(Boolean)
                .join(" ");

              if (!sortable) {
                return (
                  <th
                    key={String(col.key)}
                    scope="col"
                    role="columnheader"
                    className={classes}
                  >
                    {col.header}
                  </th>
                );
              }

              const nextDir: SortDir = active
                ? sortDir === "asc"
                  ? "desc"
                  : "asc"
                : ("asc" as const);

              return (
                <th
                  key={String(col.key)}
                  scope="col"
                  role="columnheader"
                  className={classes}
                  {...(active
                    ? {
                        "aria-sort":
                          sortDir === "asc" ? "ascending" : "descending",
                      }
                    : { "aria-sort": "none" })}
                >
                  <button
                    type="button"
                    onClick={() => onSort?.(String(col.key), nextDir)}
                    className="inline-flex items-center gap-1 hover:text-brand-600 focus:outline-none focus:underline"
                    aria-label={`Sort by ${col.header}`}
                  >
                    <span>{col.header}</span>
                    <SortIcon active={active} dir={sortDir} />
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {data.map((row, index) => {
            const clickable = !!onRowClick;
            return (
              <tr
                key={rowKey(row, index)}
                className={[
                  "bg-white dark:bg-gray-900",
                  clickable
                    ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={clickable ? () => onRowClick?.(row) : undefined}
              >
                {columns.map((col) => {
                  const align =
                    col.align === "center"
                      ? "text-center"
                      : col.align === "right"
                      ? "text-right"
                      : "text-left";

                  const value =
                    col.render?.(row, index) ??
                    ((row as Record<string, unknown>)[
                      col.key as string
                    ] as React.ReactNode);

                  return (
                    <td
                      key={String(col.key)}
                      className={[
                        "px-4 py-3 text-gray-800 dark:text-gray-100",
                        align,
                        col.className,
                        // força branco na coluna ID em dark mode, mesmo que a coluna defina outra cor
                        String(col.key) === "id" ? "dark:!text-white" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            );
          })}

          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
              >
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
