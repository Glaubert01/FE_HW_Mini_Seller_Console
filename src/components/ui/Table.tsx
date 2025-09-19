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

  /** agora recebe também o próximo dir calculado */
  onSort?: (key: string, nextDir: SortDir) => void;

  className?: string;
  bordered?: boolean;
};

function SortIcon({ active, dir }: { active: boolean; dir?: SortDir }) {
  if (!active) {
    return (
      <span aria-hidden className="ml-1 inline-block text-gray-300">
        ⇅
      </span>
    );
  }
  return (
    <span aria-hidden className="ml-1 inline-block text-gray-500">
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
  // força overflow horizontal em telas estreitas
  const tableBase = "min-w-[720px] sm:min-w-full border-collapse text-sm";

  // NÃO usar overflow-hidden aqui (ele bloqueia o scroll horizontal)
  const chrome = bordered
    ? "rounded-lg border border-gray-200 bg-white shadow-sm"
    : "";

  return (
    // wrapper com scroll lateral
    <div
      className={["w-full overflow-x-auto", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={chrome}>
        <table className={tableBase}>
          <colgroup>
            {columns.map((col, i) => (
              <col
                key={i}
                {...(col.width !== undefined ? { width: col.width } : {})}
              />
            ))}
          </colgroup>

          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600">
              {columns.map((col) => {
                const align =
                  col.align === "center"
                    ? "text-center"
                    : col.align === "right"
                    ? "text-right"
                    : "text-left";
                const isActive = String(col.key) === String(sortKey);
                const isSortable = (col.sortable ?? true) && !!onSort;

                const base = "px-4 py-3 font-semibold whitespace-nowrap";
                const classes = [base, align, col.className]
                  .filter(Boolean)
                  .join(" ");

                if (!isSortable) {
                  return (
                    <th key={String(col.key)} scope="col" className={classes}>
                      {col.header}
                    </th>
                  );
                }

                const nextDir: SortDir = isActive
                  ? sortDir === "asc"
                    ? "desc"
                    : "asc"
                  : "asc";

                return (
                  <th
                    key={String(col.key)}
                    scope="col"
                    className={classes}
                    {...(isActive
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
                      <SortIcon active={isActive} dir={sortDir} />
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data.map((row, index) => {
              const clickable = !!onRowClick;
              return (
                <tr
                  key={rowKey(row, index)}
                  className={[
                    "bg-white",
                    clickable ? "cursor-pointer hover:bg-gray-50" : "",
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
                          "px-4 py-3 text-gray-800 whitespace-nowrap",
                          align,
                          col.className,
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
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
