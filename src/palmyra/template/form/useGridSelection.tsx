import { useEffect, useRef, useState } from "react";
import { Checkbox } from "@mantine/core";
import { getFilteredRowModel } from "@tanstack/react-table";

interface IGridSelectionInput {
    selectable?: 'single' | 'multi' | boolean;
    idKey: string;
    dataRef: { current: any[] };
    onSelectionChange?: (rows: any[]) => void;
}

const useGridSelection = (opts: IGridSelectionInput) => {
    const { selectable, idKey, dataRef, onSelectionChange } = opts;
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const rowDataMap = useRef<Record<string, any>>({});

    const enabled = !!selectable;
    const multi = selectable === 'multi' || selectable === true;

    const onRowSelectionChange = (updater: any) => {
        setRowSelection((prev) => {
            const next = typeof updater === 'function' ? updater(prev) : updater;
            Object.keys(next).forEach((id) => {
                if (next[id]) {
                    const found = (dataRef.current || []).find((d) => String(d[idKey]) === id);
                    if (found) rowDataMap.current[id] = found;
                }
            });
            Object.keys(rowDataMap.current).forEach((id) => {
                if (!next[id]) delete rowDataMap.current[id];
            });
            return next;
        });
    };

    const selectedIds = Object.keys(rowSelection).filter((id) => rowSelection[id]);
    const selectedRows = selectedIds.map((id) => rowDataMap.current[id]).filter(Boolean);

    useEffect(() => {
        if (enabled && onSelectionChange) onSelectionChange(selectedRows);
    }, [rowSelection]);

    const clear = () => {
        setRowSelection({});
        rowDataMap.current = {};
    };

    const getTableOptions = () => ({
        state: { rowSelection },
        enableRowSelection: true,
        enableMultiRowSelection: multi,
        onRowSelectionChange,
        getRowId: (row: any) => String(row[idKey]),
        getFilteredRowModel: getFilteredRowModel(),
        debug: false
    });

    const preProcessColumns = (columnDefs: any[]) => {
        const checkBoxColumn = {
            id: 'select',
            header: multi
                ? ({ table }: any) => {
                    const allChecked = (() => { try { return table.getIsAllRowsSelected(); } catch { return false; } })();
                    const someChecked = (() => { try { return table.getIsSomeRowsSelected(); } catch { return false; } })();
                    return (
                        <Checkbox size="xs" checked={allChecked} indeterminate={someChecked}
                            onChange={table.getToggleAllRowsSelectedHandler()} />
                    );
                }
                : () => null,
            cell: ({ row }: any) => (
                <div onClick={(e) => e.stopPropagation()}>
                    <Checkbox size="xs" checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()} indeterminate={row.getIsSomeSelected()}
                        onChange={row.getToggleSelectedHandler()} />
                </div>
            )
        };
        columnDefs.unshift(checkBoxColumn);
    };

    return { enabled, getTableOptions, preProcessColumns, selectedRows, clear };
};

export { useGridSelection };
export type { IGridSelectionInput };
