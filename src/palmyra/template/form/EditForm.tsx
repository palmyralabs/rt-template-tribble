import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { ISaveForm, PalmyraEditForm } from "@palmyralabs/rt-forms";
import { IFormEditInput } from "../Types";
import { Button } from "@mantine/core";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { getTitle } from "../util/TitleUtil";


function EditForm(props: IFormEditInput) {

    const navigate = useNavigate();
    const [isValid, setValid] = useState<boolean>(false);
    const formRef = props.formRef ? props.formRef : useRef<ISaveForm>(null);
    const id = props.id;
    const pageName = props.pageName;

    const isAclAccess = props.aclCode ? (props.aclCheck ? props.aclCheck(props.aclCode) : true) : true;

    const showServerErrorToast = () => {
        toast.error("Something went wrong Please try again later.. ")
    }

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
        saving.then((_d: any) => {
            if (_d) {
                if (props.successMsg)
                    toast.success(props.successMsg);
                if (props.onSaveSuccess)
                    props.onSaveSuccess(_d);
                navigate('../' + pageName);
            }
        }).catch((e) => {
            if (props.onSaveFailure)
                props.onSaveFailure(e);
            if (e.response && e.response.status === 500) {
                showServerErrorToast()
            }
        });
    }

    const onQueryData = (d: any) => {
        if (props.onDataRefresh)
            props.onDataRefresh(d);
        if (props.onQueryData)
            return props.onQueryData(d);
        return d;
    };

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
                    <div>{getTitle(props.title, 'edit')}</div>
                    <div className="py-form-header-button-container">
                        {props.customBtn}
                        <Button
                            className='py-cancel-filled-button'
                            onClick={() => window.history.back()}
                            leftSection={<IoMdClose className="py-button-icon"/>}>
                            Cancel
                        </Button>
                        <Button disabled={isDisabled}
                            className={isDisabled ? 'py-disabled-button' : 'py-filled-button'}
                            onClick={saveFormData} leftSection={<FaCheck className="py-button-icon"/>}>
                            <u>S</u>ave
                        </Button>
                    </div>
                </div>
                {props.headerContent}
                <PalmyraEditForm mode="edit" id={id} {...props.options} onQueryData={onQueryData}
                    onValidChange={setValid} ref={formRef}>
                    {props.children}
                </PalmyraEditForm>
            </form>
        </div >
    );
}

export { EditForm };
