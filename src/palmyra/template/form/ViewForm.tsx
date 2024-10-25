import { useNavigate } from "react-router-dom";
import { IFormViewInput } from '../Types';
import { PalmyraViewForm } from '@palmyralabs/rt-forms';
import { Button } from "@mantine/core";
import { IoIosArrowBack } from "react-icons/io";
import { RiEdit2Fill } from "react-icons/ri";


function ViewForm(props: IFormViewInput) {
    const id = props.id;
    const pageName = props.pageName;
    const navigate = useNavigate();

    const goToEditForm = () => {
        return navigate('../' + pageName + '/edit/' + props.id);
    }

    const goToGrid = () => {
        return navigate('../' + pageName);
    }

    return (
        <div className='py-form-container'>
            <div className='py-form-header-container'>
                <div>{props.title}</div>
                <div className="py-form-header-button-container">
                    <Button onClick={goToGrid}
                        className='py-filled-button'
                        leftSection={<IoIosArrowBack className="py-button-icon"/>}>                        
                        Back
                    </Button>
                    <Button
                        className='py-filled-button'
                        onClick={goToEditForm}
                        leftSection={<RiEdit2Fill className="py-button-icon"/>}>
                        Edit
                    </Button>
                </div>
            </div>
            <PalmyraViewForm id={id} {...props.options}>
                {props.children}
            </PalmyraViewForm>
        </div>
    );
}

export { ViewForm };