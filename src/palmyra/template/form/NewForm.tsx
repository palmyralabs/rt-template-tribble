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
    const formRef = useRef<ISaveForm>();
    const initialData = props.initialData || {};
    const pageName = props.pageName;
    const errorText = props.errorText;

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

    const saveFormData = () => {
        formRef.current.saveData().then((_d: any) => {
            if (_d) {
                if (props.successMsg)
                    toast.success(props.successMsg);
                return navigate('../' + pageName);
            }
        }).catch((e) => {
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
            if (isValid) {
                saveFormData();
            } else {
                // show sweet alert
            }
        }
    };

    return (
        <div className='py-form-container'>
            <form onKeyDown={handleKeyPress}>
                <div className='py-form-header-container'>
                    <div>{getTitle(props.title, 'new')}</div>
                    <div className="py-form-header-button-container">
                        <Button
                            className='py-cancel-filled-button'
                            onClick={() => window.history.back()}
                            leftSection={<IoMdClose className="py-button-icon" />}>
                            Cancel
                        </Button>
                        <Button disabled={!isValid}
                            className={!isValid ? 'py-disabled-button' : 'py-filled-button'}
                            onClick={saveFormData} leftSection={<FaCheck className="py-button-icon" />}>
                            <u>S</u>ave
                        </Button>
                    </div>
                </div>
                <PalmyraNewForm onValidChange={setValid} {...props.options}
                    ref={formRef} initialData={initialData}>
                    {props.children}
                </PalmyraNewForm>
            </form>
        </div>
    );
}

export { NewForm };