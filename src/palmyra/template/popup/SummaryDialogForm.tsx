
import { FC, forwardRef, MutableRefObject, useImperativeHandle, useRef, useState } from "react";
import { useSaveForm } from "../hooks/useSaveForm";
import { EditForm } from "./EditForm";
import { NewForm } from "./NewForm";
import { IOptions } from "../Types";
import { ErrorHandler } from "@palmyralabs/palmyra-wire";
import { Button, Modal } from "@mantine/core";
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { useDisclosure } from '@mantine/hooks';
import { getTitle } from "../util/TitleUtil";

interface IDialogGridFormInput {
    options: IOptions,
    EditFormlet: FC,
    NewFormlet: FC,
    customDataSection?: {
        new?: any
        edit?: any
    }
    gridRef: any,
    title?: string | {
        grid?: string;
        new?: string;
        edit?: string;
    };
    idKey?: string,
    dialogHeight?: string,
    dialogWidth?: string,
    dialogMinWidth?: string
}

interface IDialogForm {
    setData: (d: any) => void
}

const SummaryDialogForm = forwardRef((props: IDialogGridFormInput, ref: MutableRefObject<IDialogForm>) => {
    const [opened, { open, close }] = useDisclosure(false);
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
        close();
    }

    const onComplete = () => {
        setData(undefined)
        onSave();
        close();
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
    if (data !== undefined && !opened) {
        open();
    }
    const { doCancel, doSaveClose, handleKeyPress,
        setValid, isValid, formRef } = useSaveForm({ onCancel, onComplete, onFailure: handleError, onSave });

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
                <Button disabled={!isValid}
                    className={!isValid ? 'py-disabled-button' : 'py-filled-button'}
                    onClick={doSaveClose} leftSection={<FaCheck className="py-button-icon" />}>
                    <u>S</u>ave
                </Button>
            </div>
        </Modal>
    </>
    );
});

export { SummaryDialogForm };
export type { IDialogGridFormInput, IDialogForm }