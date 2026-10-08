import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IFormViewInput } from '../Types';
import { PalmyraViewForm } from '@palmyralabs/rt-forms';
import { Button } from "@mantine/core";
import { IoIosArrowBack } from "react-icons/io";
import { RiEdit2Fill } from "react-icons/ri";
import { getTitle } from "../util/TitleUtil";


function ViewForm(props: IFormViewInput) {
    const id = props.id;
    const pageName = props.pageName;
    const navigate = useNavigate();

    const formRef = props.formRef ? props.formRef : useRef<any>(null);

    const showEditButton = props.showEditButton !== false;
    const showBackButton = props.showBackButton !== false;

    const isAclAccess = props.aclCode ? (props.aclCheck ? props.aclCheck(props.aclCode) : true) : true;
    const isEditDisabled = !!props.isEnableEdit || !isAclAccess;

    const goToEditForm = () => {
        return navigate('../' + pageName + '/edit/' + props.id);
    }

    const goToGrid = () => {
        return navigate('../' + pageName);
    }

    return (
        <div className='py-form-container'>
            <div className='py-form-header-container'>
                <div>{props.leftContent ? props.leftContent : getTitle(props.title, 'view')}</div>
                <div className="py-form-header-button-container">
                    {props.customBtn}
                    {showBackButton &&
                        <Button onClick={goToGrid}
                            className='py-filled-button'
                            leftSection={<IoIosArrowBack className="py-button-icon"/>}>
                            Back
                        </Button>}
                    {showEditButton &&
                        <Button disabled={isEditDisabled}
                            className={isEditDisabled ? 'py-disabled-button' : 'py-filled-button'}
                            onClick={goToEditForm}
                            leftSection={<RiEdit2Fill className="py-button-icon"/>}>
                            Edit
                        </Button>}
                </div>
            </div>
            {props.headerContent}
            <PalmyraViewForm id={id} {...props.options} onQueryData={props.onQueryData} ref={formRef}>
                {props.children}
            </PalmyraViewForm>
        </div>
    );
}

export { ViewForm };
