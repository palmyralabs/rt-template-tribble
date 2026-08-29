import { IEndPoint, IEndPointOptions, MultiEndPoint } from "@palmyralabs/palmyra-wire"
import { DataGridPluginOptions, IExportOptions, PalmyraGridOptions } from "@palmyralabs/rt-forms"
import { FC, JSX } from "react"

type ITitle = string | {
    grid?: string;
    new?: string;
    edit?: string;
    view?: string;
};

interface IPageInput {
    title?: String,
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
    options?: IOptions,
    id: string,
    children?: any,
    endPoint: string | MultiEndPoint
    // customizer?: IFormCustomizer,
    onSaveSuccess?: (data: any) => void;
    onSaveFailure?: (e: any) => void;
    preSave?: (data: any) => any;
    onDataRefresh?: (data: any) => void
    aclCode?: string
    formRef?: any
    customRequestData?: Record<string, any>
    successMsg?: string
}

interface IFormNewInput extends IPageInput, IFormInput {
    options?: IOptions,
    children?: any,
    id?: string,
    initialData?: {},
    successMsg?: string,
    endPoint: string
    formListener?: any
    aclCode?: string,
    onSaveSuccess?: (data: any) => void;
    onSaveFailure?: (e: any) => void;
    onQueryData?: (e: any) => void;
    preSave?: (data: any) => any;
    formRef?: any
    customRequestData?: Record<string, any>
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
    onFetchFailure?: (error: any) => void;
    filter?: any
}

interface ISummaryGridInput extends IPageInput, IGridInput {
    densityOptions?: any,
    idKey?: string,
    disableRowClick?: boolean
    showFooter?: boolean
}

interface SummaryGridPluginOptions extends DataGridPluginOptions {
    newRecord: () => void
}

interface PopupGridPluginOptions extends DataGridPluginOptions {
    setFormData: (d: any) => void
}

export type {
    IPageInput, IFormEditInput, IFormNewInput, IFormViewInput, ITitle,
    ISummaryGridInput, IFormInput, IOptions, SummaryGridPluginOptions, PopupGridPluginOptions
}