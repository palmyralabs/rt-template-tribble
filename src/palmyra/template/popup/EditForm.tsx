import { FC, MutableRefObject, useContext } from "react";
import { IOptions } from "../Types";
import { ISaveForm, PalmyraEditForm, StoreFactoryContext } from "@palmyralabs/rt-forms";
import { ErrorHandler } from "@palmyralabs/palmyra-wire";


interface IFormInput {
    options: IOptions,
    id: string,
    FORMLET: FC,
    onQueryFailure:ErrorHandler,
    handleKeyPress: (event: any) => void,
    setValid: (s: any) => void,
    formRef: MutableRefObject<ISaveForm>
}

function EditForm(props: IFormInput) {
    const storeFactory = useContext(StoreFactoryContext);
    const id = props.id;
    const { handleKeyPress, setValid, formRef } = props;
    const Children = props.FORMLET;
    return (
        <form onKeyDown={handleKeyPress}>
            <PalmyraEditForm onValidChange={setValid} ref={formRef} storeFactory={storeFactory}
                {...props.options} id={id} onQueryFailure={props.onQueryFailure}>
                <Children />
            </PalmyraEditForm>
        </form>
    );
}

export { EditForm };