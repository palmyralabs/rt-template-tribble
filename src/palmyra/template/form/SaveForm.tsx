import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { IFormEditInput } from "../Types";
import { ISaveForm, PalmyraEditForm } from "@palmyralabs/rt-forms";
import { Button } from "@mantine/core";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";


function SaveForm(props: IFormEditInput) {

    const navigate = useNavigate();
    const [isValid, setValid] = useState<boolean>(false);
    const formRef = useRef<ISaveForm>();
    const id = props.id;
    const pageName = props.pageName;

    const onQueryData = (d: any) => {
        if (props.onDataRefresh)
            props.onDataRefresh(d);
        return d;
    };

    const showServerErrorToast = () => {
        toast.error("Something went wrong Please try again later.. ")
    }

    const saveFormData = () => {
        const s = formRef.current.saveData();
        s.then((_d: any) => {
            navigate('../' + pageName);
        }).catch((e) => {
            if (e.response && e.response.status === 500) {
                showServerErrorToast()
            }
        });

    }

    const handleKeyPress = (event: any) => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            if (isValid) {
                saveFormData();
            }
        }
    };

    return (
        <div className='py-form-container'>
            <form onKeyDown={handleKeyPress}>
                <div className='py-form-header-container'>
                    <div>{props.title}</div>
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
                <PalmyraEditForm mode="save" id={id} {...props.options} onQueryData={onQueryData}
                    onValidChange={setValid} ref={formRef}>
                    {props.children}
                </PalmyraEditForm>
            </form>
        </div >
    );
}

export { SaveForm };