import { IEndPoint, IEndPointOptions } from "@palmyralabs/palmyra-wire"
import { DataGridPluginOptions, IExportOptions, PalmyraGridOptions } from "@palmyralabs/rt-forms"
import { FC } from "react"

type ITitle = string | {
    grid?: string;
    new?: string;
    edit?: string;
    view?: string;
};

interface IPageInput {
    title?: ITitle,
    pageName: string,
    errorText?: any
}

interface IOptions {
    endPoint: IEndPoint,
    endPointOptions?: IEndPointOptions
    idKey?: string
}

interface queryOptions {
    queryOptions?: {
        filter?: any
    },
}

interface IFormInput {
    onComplete?: (data: any) => void,
    onSave?: (data: any) => void,
    onFailure?: (error: any) => void,
    onCancel?: () => void
}

interface IFormEditInput extends IPageInput {
    options: IOptions,
    id: string,
    children?: any,
    onDataRefresh?: (data: any) => void,
    successMsg?: string
}

interface IFormNewInput extends IPageInput, IFormInput {
    options: IOptions,
    children?: any,
    id?: string,
    initialData?: {},
    successMsg?: string
}

interface IFormViewInput extends IPageInput, IFormInput {
    options: IOptions,
    id: string,
    children: any
}

interface IGridInput {
    customizer?: PalmyraGridOptions<any>['customizer'],
    quickSearch?: string,
    lsKey?: string,
    options: IOptions & queryOptions,
    columns: PalmyraGridOptions<any>['columns'],
    pageSize?: PalmyraGridOptions<any>['pageSize'],
    pagination?: PalmyraGridOptions<any>['pagination']
    exportOptions?: IExportOptions,
    defaultParams?: PalmyraGridOptions<any>['defaultParams'],
    Child?: FC,
    childProps?: Record<any, any>,
    getPluginOptions?: PalmyraGridOptions<any>['getPluginOptions'];
    DataGridControls?: (props: DataGridPluginOptions) => JSX.Element;
    onDataChange?: (newData: any[], oldData?: any[]) => void;
}

interface ISummaryGridInput extends IPageInput, IGridInput {
    densityOptions?: any,
    idKey?: string,
    disableRowClick?: boolean
}

interface SummaryGridPluginOptions extends DataGridPluginOptions {
    newRecord: () => void
}

interface PopupGridPluginOptions extends DataGridPluginOptions {
    setFormData: (d: any) => void
}

export type {
    IPageInput, IFormEditInput, IFormNewInput, IFormViewInput,ITitle,
    ISummaryGridInput, IFormInput, IOptions, SummaryGridPluginOptions, PopupGridPluginOptions
}