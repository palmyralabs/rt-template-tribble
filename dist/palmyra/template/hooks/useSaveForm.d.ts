import { RefObject } from 'react';
import { IFormInput } from '../Types';
import { ISaveForm } from '@palmyralabs/rt-forms';
declare const useSaveForm: (props: IFormInput, fRef?: RefObject<ISaveForm>) => {
    doCancel: () => void;
    doSaveNew: () => void;
    doSaveClose: () => void;
    handleKeyPress: (event: any) => void;
    setValid: import('react').Dispatch<import('react').SetStateAction<boolean>>;
    isValid: boolean;
    formRef: RefObject<ISaveForm>;
};
export { useSaveForm };
