
import { FC, forwardRef, MutableRefObject, useImperativeHandle, useRef, useState } from "react";
import { useSaveForm } from "../hooks/useSaveForm";
import { EditForm } from "./EditForm";
import { NewForm } from "./NewForm";
import { IOptions } from "../Types";
import { ErrorHandler } from "@palmyralabs/palmyra-wire";
import { Button, Modal } from "@mantine/core";

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
}

interface IDialogForm {
    setData: (d: any) => void
}

const SummaryDialogForm = forwardRef((props: IDialogGridFormInput, ref: MutableRefObject<IDialogForm>) => {
    const title: any = props.title;
    const idKey = props.idKey || 'id';
    // const height = props.dialogHeight || 'auto';
    // const width = props.dialogWidth || 'auto';
    // const minWidth = props.dialogMinWidth || '600px';

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

    const handleError = (e) => {
        console.log(e);
    }
    const onQueryFailure: ErrorHandler = (_e) => {
        onCancel();
        return false;
    }

    const { doCancel, doSaveClose, handleKeyPress,
        setValid, isValid, formRef } = useSaveForm({ onCancel, onComplete, onFailure: handleError, onSave });

    const dialogOpen: boolean = data != undefined;
    const EditFormlet = props.EditFormlet;
    const NewFormlet = props.NewFormlet;

    return (<>
        {dialogOpen &&
            <Modal opened={dialogOpen} onClose={doCancel} onKeyDown={handleKeyPress} title={title}
                centered>
                {data?.[idKey] ?
                    <EditForm setValid={setValid} formRef={formRef} onQueryFailure={onQueryFailure}
                        handleKeyPress={handleKeyPress} options={props.options}
                        {...props.options} id={data?.[idKey]} FORMLET={EditFormlet} />
                    : <NewForm setValid={setValid} formRef={formRef}
                        handleKeyPress={handleKeyPress} options={props.options}
                        {...props.options} initialData={data} FORMLET={NewFormlet} />}
                <div className="py-drawer-form-btn-container">
                    <Button
                        className='py-cancel-filled-button'
                        onClick={doCancel} tabIndex={-1}>
                        Cancel
                    </Button>
                    <Button disabled={!isValid}
                        className={!isValid ? 'py-disabled-button' : 'py-filled-button'}
                        onClick={doSaveClose}>
                        <u style={{ width: '5px' }}>S</u>ave
                    </Button>
                </div>
            </Modal>}
    </>
    );
});

export { SummaryDialogForm };
export type { IDialogGridFormInput, IDialogForm }