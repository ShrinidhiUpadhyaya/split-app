"use client";

import React, {useCallback, useEffect, useMemo, useState} from "react";

import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {splitByPercentage, splitEqually} from "@/lib/splitAmount";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {clsx} from "clsx";
import {ArrowUpDown} from "lucide-react";
import {Input} from "../ui/input";

export type Payment = {
  _id: string;
  amount: number;
  email: string;
  name: string;
  inputValue?: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({table}) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({row}) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

interface TableProps {
  tableData: Payment[];
  totalAmount: number;
  type?: "equal" | "percentage" | "exact";
  onValueChange?: Function;
}

const ExpenseTable: React.FC<TableProps> = ({
  tableData,
  totalAmount,
  type = "percentage",
  onValueChange = () => {},
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<Payment[]>(tableData);
  const [remainingPercentage, setRemainingPercentage] = useState(0);

  const inputValueColumn: ColumnDef<Payment> = {
    accessorKey: "percentage",
    header: () => <div className="text-right">{type == "exact" && "Amount"}</div>,
    cell: ({row}) => {
      return (
        <div className="flex items-center gap-2 text-right font-medium">
          <Input
            className="h-8 max-w-32"
            disabled={!row.getIsSelected()}
            value={row.getValue("percentage")}
            onChange={(e) => handlePercentageChange(e, row.index)}
          />
          %
        </div>
      );
    },
  };

  const allColumns = useMemo(() => {
    const baseColumns = [...columns.slice(0, 2)];
    if (type === "equal") return columns;
    const extraColumns =
      type === "exact" ? [inputValueColumn] : [inputValueColumn, ...columns.slice(2)];
    return [...baseColumns, ...extraColumns];
  }, [type]);

  const table = useReactTable({
    data,
    columns: allColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const selectedRows = useMemo(
    () => table.getSelectedRowModel().rows.map((row) => row.original),
    [rowSelection],
  );

  const newValues = useMemo(() => {
    if (!selectedRows.length) {
      return data.map((value) => ({...value, amount: 0}));
    }

    const splitFunction = type === "equal" ? splitEqually : splitByPercentage;
    return splitFunction(selectedRows, totalAmount);
  }, [selectedRows, totalAmount, type]);

  const mergeValues = useCallback(() => {
    return data.map((dataObj) => {
      const matchingValues = newValues.find(
        (selectedRowsObj) => selectedRowsObj._id === dataObj._id,
      );
      return matchingValues ? {...dataObj, ...matchingValues} : dataObj;
    });
  }, [newValues]);

  function calculateTotalPercentage(data) {
    return data.reduce((total, item) => {
      const percentage = Number(item.percentage) || 0;
      return total + percentage;
    }, 0);
  }

  const handlePercentageChange = (e, rowIndex) => {
    const value = e.target.value;
    let percentageValue = parseFloat(value);
    percentageValue = isNaN(percentageValue) ? 0 : percentageValue;

    const updatedData = data;
    updatedData[rowIndex].percentage = percentageValue;

    const splitValues = splitByPercentage(updatedData, totalAmount);
    const totalPercentage = calculateTotalPercentage(updatedData);
    setData(splitValues);
    setRemainingPercentage(100 - totalPercentage);
  };

  useEffect(() => {
    setData(mergeValues);
  }, [mergeValues]);

  useEffect(() => {
    onValueChange(data);
  }, [data]);

  return (
    <div className="h-full w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="h-11">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="!max-w-full"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}

            {type === "percentage" && (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className="p-0">
                  <h1
                    className={clsx(
                      remainingPercentage !== 0 && "text-[#E01563]",
                      "w-full p-4 text-right font-bold text-[#3EB991]",
                    )}
                  >
                    {remainingPercentage}% Left
                  </h1>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ExpenseTable;
