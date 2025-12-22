
import { Button, Drawer } from "@mantine/core";
import { ErrorHandler } from "@palmyralabs/palmyra-wire";
import { FC, forwardRef, RefObject, useImperativeHandle, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { useSaveForm } from "../hooks/useSaveForm";
import { IOptions } from "../Types";
import { getTitle } from "../util/TitleUtil";
import { EditForm } from "./EditForm";
import { NewForm } from "./NewForm";

interface IDialogGridFormInput {
    options: IOptions,
    EditFormlet: FC,
    NewFormlet: FC,
    gridRef: any,
    title?: any,
    idKey?: string,
    dialogHeight?: string,
    dialogWidth?: string,
    dialogMinWidth?: string
    enableSaveVariants?: boolean,
    onSaveSuccess?: (data: any) => void;
    onSaveFailure?: (e: any) => void;
    customDataSection?: {
        new?: any
        edit?: any
    }
}

interface IDrawerForm {
    setData: (d: any) => void
}

const SummaryDrawerForm = forwardRef((props: IDialogGridFormInput, ref: RefObject<IDrawerForm>) => {

    const idKey = props.idKey || 'id';
    // const drawerWidth = props.dialogWidth || '600px';

    const [data, setData] = useState<any>(undefined);
    const referenceCount = useRef<number>(0);

    const gridRef: any = props.gridRef;
    const currentRef = ref || useRef(null);

    useImperativeHandle(currentRef, () => {
        return { setData }
    }, [gridRef])

    const onCancel = () => {
        setData(undefined)
    }

    const onComplete = (d) => {
        setData(undefined)
        onSave();
        props.onSaveSuccess(d)
    }

    const onSave = () => {
        referenceCount.current += 1;
        gridRef.current.refresh();
    }

    const onQueryFailure: ErrorHandler = (_e) => {
        onCancel();
        return false;
    }

    const handleError = (e) => {
        props.onSaveFailure(e)
    }

    const handleOnSave = (d) => {
        props.onSaveSuccess(d)
    }

    const { doCancel, doSaveClose, doSaveNew, handleKeyPress,
        setValid, isValid, formRef } = useSaveForm({ onCancel, onComplete, onFailure: handleError, onSave: handleOnSave });

    const drawerOpen: boolean = data != undefined;
    const EditFormlet = props.EditFormlet;
    const NewFormlet = props.NewFormlet;
    const formTitle = (!data?.[idKey]) ? getTitle(props.title, 'new') : getTitle(props.title, 'edit');

    const newCustomData = props.customDataSection?.new || ''
    const editCustomData = props.customDataSection?.edit || ''
    return (<Drawer position="right" opened={drawerOpen} onClose={onCancel} title={formTitle}>
        <div className="py-drawer-content-container">
            {data?.[idKey] ?
                <EditForm setValid={setValid} formRef={formRef} onQueryFailure={onQueryFailure}
                    handleKeyPress={handleKeyPress} options={props.options} customDataSection={editCustomData}
                    {...props.options} id={data?.[idKey]} FORMLET={EditFormlet} />
                : <NewForm setValid={setValid} formRef={formRef} customDataSection={newCustomData}
                    handleKeyPress={handleKeyPress} options={props.options}
                    {...props.options} initialData={data} FORMLET={NewFormlet} />}
            <div className="py-drawer-form-btn-container">
                <div>
                    <Button
                        className='py-cancel-filled-button'
                        onClick={doCancel} tabIndex={-1} leftSection={<IoMdClose className="py-button-icon" />}>
                        Cancel
                    </Button>
                </div>

                {(!data?.[idKey] && props.enableSaveVariants) ? <>
                    <div>
                        <Button disabled={!isValid}
                            className={!isValid ? 'py-disabled-button' : 'py-filled-button'}
                            onClick={doSaveNew} leftSection={<MdDone className="py-button-icon" />}>
                            <u>S</u>ave & New
                        </Button>
                    </div>
                    <div>
                        <Button disabled={!isValid}
                            className={!isValid ? 'py-disabled-button' : 'py-filled-button'}
                            onClick={doSaveClose} leftSection={<MdDone className="py-button-icon" />}>
                            <u>S</u>ave & Close
                        </Button>
                    </div>
                </> : <div>
                    <Button disabled={!isValid}
                        className={!isValid ? 'py-disabled-button' : 'py-filled-button'}
                        onClick={doSaveClose} leftSection={<MdDone className="py-button-icon" />}>
                        <u>S</u>ave
                    </Button>
                </div>}
            </div>
        </div>
    </Drawer>);
});

export { SummaryDrawerForm };

