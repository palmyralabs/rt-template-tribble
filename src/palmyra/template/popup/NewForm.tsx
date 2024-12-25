import { FC, MutableRefObject, useContext } from "react";
import { IOptions } from "../Types";
import { ISaveForm, PalmyraNewForm, StoreFactoryContext } from "@palmyralabs/rt-forms";


interface IFormInput {
    options: IOptions,
    initialData?: any,
    FORMLET: FC
    handleKeyPress: (event: any) => void,
    setValid: (s: any) => void,
    formRef: MutableRefObject<ISaveForm>
    customDataSection?: any
}

function NewForm(props: IFormInput) {
    const storeFactory = useContext(StoreFactoryContext);
    const { handleKeyPress, setValid, formRef } = props;
    const initialData = props.initialData || {};
    const Children = props.FORMLET;
    return (
        <form onKeyDown={handleKeyPress}>
            {props.customDataSection}
            <PalmyraNewForm onValidChange={setValid} ref={formRef} storeFactory={storeFactory}
                {...props.options} initialData={initialData}>
                <Children />
            </PalmyraNewForm>
        </form>
    );
}

export { NewForm };