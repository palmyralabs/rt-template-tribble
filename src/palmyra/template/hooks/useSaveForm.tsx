import { MutableRefObject, useRef, useState } from "react";
import { IFormInput } from "../Types";
import { ISaveForm } from "@palmyralabs/rt-forms";

const useSaveForm = (props: IFormInput, fRef?: MutableRefObject<ISaveForm>) => {
    const formRef = fRef || useRef<ISaveForm>();

    const [isValid, setValid] = useState<boolean>(false);
    const doSaveClose = () => {
        if (!isValid)
            return;

        const s = formRef.current.saveData();
        s.then((d) => {
            props.onComplete(d);
        }).catch(processError);
    }

    const doSaveNew = () => {
        if (!isValid)
            return;

        const s = formRef.current.saveData();
        s.then((d) => {
            props.onSave(d);
            formRef.current.setData({})
        }).catch(processError);
    }

    const processError = (e) => {
        props.onFailure(e);
    }

    const doCancel = () => {
        props.onCancel();
    }

    const handleKeyPress = (event: any) => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            doSaveClose();
        }
    };

    return { doCancel, doSaveNew, doSaveClose, handleKeyPress, setValid, isValid, formRef };
}

export { useSaveForm }