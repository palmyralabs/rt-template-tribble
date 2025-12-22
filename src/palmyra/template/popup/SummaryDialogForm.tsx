
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
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
    customDataSection?: {
        new?: any
        edit?: any
    }
    gridRef: any,
    onSaveSuccess?: (data: any) => void;
    onSaveFailure?: (e: any) => void;
    title?: string | {
        grid?: string;
        new?: string;
        edit?: string;
    };
    idKey?: string,
    dialogHeight?: string,
    dialogWidth?: string,
    dialogMinWidth?: string
    enableSaveVariants?: boolean
}

interface IDialogForm {
    setData: (d: any) => void
}

const SummaryDialogForm = forwardRef((props: IDialogGridFormInput, ref: RefObject<IDialogForm>) => {
    const [opened, { open, close }] = useDisclosure(false);
    const idKey = props.idKey || 'id';
    // const height = props.dialogHeight || 'auto';
    // const width = props.dialogWidth || 'auto';
    // const minWidth = props.dialogMinWidth || '600px';

    const [data, setData] = useState<any>(undefined);
    const referenceCount = useRef<number>(0);

    const gridRef: any = props.gridRef;
    const currentRef = ref || useRef(null);

    useImperativeHandle(currentRef, () => {
        return { setData }
    }, [gridRef])

    const onCancel = () => {
        setData(undefined)
        close();
    }

    const onComplete = (d) => {
        setData(undefined)
        onSave();
        close();
        props.onSaveSuccess(d)
    }

    const onSave = () => {
        referenceCount.current += 1;
        gridRef.current.refresh();
    }

    const handleError = (e) => {
        props.onSaveFailure(e)
    }

    const handleOnSave = (d) => {
        props.onSaveSuccess(d)
    }
    
    const onQueryFailure: ErrorHandler = (_e) => {
        onCancel();
        return false;
    }
    if (data !== undefined && !opened) {
        open();
    }
    const { doCancel, doSaveClose, doSaveNew, handleKeyPress,
        setValid, isValid, formRef } = useSaveForm({ onCancel, onComplete, onFailure: handleError, onSave: handleOnSave });

    const EditFormlet = props.EditFormlet;
    const NewFormlet = props.NewFormlet;
    const formTitle = (!data?.[idKey]) ? getTitle(props.title, 'new') : getTitle(props.title, 'edit');

    const newCustomData = props.customDataSection?.new || ''
    const editCustomData = props.customDataSection?.edit || ''
    return (<>
        <Modal opened={opened} onClose={doCancel} onKeyDown={handleKeyPress} title={formTitle}
            centered >
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
                    onClick={doCancel} tabIndex={-1}
                    leftSection={<IoMdClose className="py-button-icon" />}>
                    Cancel
                </Button>
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
        </Modal>
    </>
    );
});

export { SummaryDialogForm };
export type { IDialogForm, IDialogGridFormInput };
