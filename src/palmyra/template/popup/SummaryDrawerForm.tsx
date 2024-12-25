
import { FC, forwardRef, MutableRefObject, useImperativeHandle, useRef, useState } from "react";
import { useSaveForm } from "../hooks/useSaveForm";
import { EditForm } from "./EditForm";
import { NewForm } from "./NewForm";
import { IOptions } from "../Types";
import { ErrorHandler } from "@palmyralabs/palmyra-wire";
import { Button, Drawer } from "@mantine/core";
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

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
    customDataSection?: {
        new?: any
        edit?: any
    }
}

interface IDrawerForm {
    setData: (d: any) => void
}

const SummaryDrawerForm = forwardRef((props: IDialogGridFormInput, ref: MutableRefObject<IDrawerForm>) => {
    const title: any = props.title;
    const editTitle: any = typeof title === "string" ? `Edit ${title}` : title?.edit;
    const newTitle: any = typeof title === "string" ? `New ${title}` : title?.new;
    const idKey = props.idKey || 'id';
    // const drawerWidth = props.dialogWidth || '600px';

    const [data, setData] = useState<any>(undefined);
    const referenceCount = useRef<number>(0);

    const gridRef: any = props.gridRef;
    const currentRef = ref || useRef();

    useImperativeHandle(currentRef, () => {
        return { setData }
    }, [gridRef])

    const onCancel = () => {
        setData(undefined)
    }

    const onComplete = () => {
        setData(undefined)
        onSave();
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
        console.log(e);
    }

    const { doCancel, doSaveClose, handleKeyPress,
        setValid, isValid, formRef } = useSaveForm({ onCancel, onComplete, onFailure: handleError, onSave });

    const drawerOpen: boolean = data != undefined;
    const EditFormlet = props.EditFormlet;
    const NewFormlet = props.NewFormlet;
    const formTitle = (!data?.[idKey]) ? newTitle : editTitle;

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
                <Button
                    className='py-cancel-filled-button'
                    onClick={doCancel} tabIndex={-1} leftSection={<IoMdClose className="py-button-icon" />}>
                    Cancel
                </Button>
                <Button disabled={!isValid}
                    className={!isValid ? 'py-disabled-button' : 'py-filled-button'}
                    onClick={doSaveClose} leftSection={<FaCheck className="py-button-icon" />}>
                    <u>S</u>ave
                </Button>
            </div>
        </div>
    </Drawer>);
});

export { SummaryDrawerForm };