import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { IFormNewInput } from "../Types";
import { ISaveForm, PalmyraNewForm } from "@palmyralabs/rt-forms";
import { Button } from "@mantine/core";
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { getTitle } from "../util/TitleUtil";


function NewForm(props: IFormNewInput) {

    const navigate = useNavigate();
    const [isValid, setValid] = useState<boolean>(false);
    const formRef = props.formRef ? props.formRef : useRef<ISaveForm>(null);
    const initialData = props.initialData || {};
    const pageName = props.pageName;
    const errorText = props.errorText;

    const isAclAccess = props.aclCode ? (props.aclCheck ? props.aclCheck(props.aclCode) : true) : true;

    const showServerErrorToast = () => {
        toast.error("Something went wrong Please try again later.. ")
    }
    const showUniqueErrorToast = () => {
        if (errorText) {
            toast.error(errorText);
        } else {
            toast.error("Data Already Exit");
        }
    };

    const prepareRequestData = (ref: any, customProps?: any) => {
        const oldData = ref?.current?.getData() || {};
        const mergedData = { ...oldData, ...(customProps || {}) };
        ref.current?.setData(mergedData);
        return mergedData;
    };

    const saveFormData = () => {
        if (!isAclAccess) {
            toast.error("You do not have permission to perform this action");
            return;
        }
        if (props.customRequestData) {
            prepareRequestData(formRef, props.customRequestData);
        }
        const saving = props.saveOverride
            ? props.saveOverride(formRef.current?.getData())
            : formRef.current.saveData();
        saving.then(async (_d: any) => {
            if (_d) {
                if (props.successMsg)
                    toast.success(props.successMsg);
                if (props.onSaveSuccess)
                    await props.onSaveSuccess(_d);
                return navigate('../' + pageName);
            }
        }).catch((e) => {
            if (props.onSaveFailure)
                props.onSaveFailure(e);
            if (e.response && e.response.status === 400) {
                showUniqueErrorToast()
            } else if (e.response && e.response.status === 500) {
                showServerErrorToast()
            }
        });
    }
    const handleKeyPress = (event: any) => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            if (isValid && !props.saveDisabled) {
                saveFormData();
            }
        }
    };

    const isDisabled = !(isValid && isAclAccess) || !!props.saveDisabled;

    return (
        <div className='py-form-container'>
            <form onKeyDown={handleKeyPress}>
                <div className='py-form-header-container'>
                    <div>{getTitle(props.title, 'new')}</div>
                    <div className="py-form-header-button-container">
                        {props.customBtn}
                        <Button
                            className='py-cancel-filled-button'
                            onClick={() => window.history.back()}
                            leftSection={<IoMdClose className="py-button-icon" />}>
                            Cancel
                        </Button>
                        <Button disabled={isDisabled}
                            className={isDisabled ? 'py-disabled-button' : 'py-filled-button'}
                            onClick={saveFormData} leftSection={<FaCheck className="py-button-icon" />}>
                            <u>S</u>ave
                        </Button>
                    </div>
                </div>
                {props.headerContent}
                <PalmyraNewForm onValidChange={setValid} {...props.options}
                    ref={formRef} initialData={initialData}>
                    {props.children}
                </PalmyraNewForm>
            </form>
        </div>
    );
}

export { NewForm };
