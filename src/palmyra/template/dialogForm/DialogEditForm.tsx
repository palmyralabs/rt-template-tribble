import { Button, Modal } from "@mantine/core";
import { ISaveForm, PalmyraEditForm } from "@palmyralabs/rt-forms";
import { topic } from "@palmyralabs/ts-utils";
import { FC, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IFormEditInput } from "../Types";

interface IDialogEditInput extends IFormEditInput {
    open: boolean
    onClose: () => void
    size?: string | number
    onRefresh?: () => void
    refreshTopic?: any
}

const DialogEditForm: FC<IDialogEditInput> = (props) => {
    const { onClose, open, onRefresh, size, refreshTopic } = props;
    const [isValid, setValid] = useState<boolean>(false);
    const formRef = props.formRef ? props.formRef : useRef<ISaveForm>(null);

    const isAclAccess = props.aclCode ? (props.aclCheck ? props.aclCheck(props.aclCode) : true) : true;

    const handleSaveData = () => {
        if (!isAclAccess) {
            toast.error("You do not have permission to perform this action");
            return;
        }
        const saving = props.saveOverride
            ? props.saveOverride(formRef.current?.getData())
            : formRef.current.saveData();
        saving.then((d: any) => {
            if (props.successMsg)
                toast.success(props.successMsg);
            if (onRefresh) onRefresh();
            if (refreshTopic) topic.publish(refreshTopic, {});
            if (props.onSaveSuccess) props.onSaveSuccess(d);
            if (onClose) onClose();
        }).catch((e) => {
            if (props.onSaveFailure) props.onSaveFailure(e);
            if (e.response && e.response.status === 500) {
                toast.error("Something went wrong Please try again later.. ");
            }
        });
    }

    const handleKeyPress = (event: any) => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            if (isValid && !props.saveDisabled) handleSaveData();
        }
    };

    const modalSize = size || 'lg';
    const isDisabled = !(isValid && isAclAccess) || !!props.saveDisabled;

    return (
        <Modal opened={open} onClose={onClose} title={props.title || ''} zIndex={999}
            centered size={modalSize} closeOnClickOutside={false} trapFocus={false}>
            {props.headerContent}
            <PalmyraEditForm ref={formRef} onValidChange={setValid} id={props.id}
                {...props.options} onQueryData={props.onQueryData}>
                <div onKeyDown={handleKeyPress}>
                    {props.children}
                </div>
            </PalmyraEditForm>
            <div className="py-drawer-form-btn-container">
                {props.customBtn}
                <Button onClick={onClose}
                    leftSection={<IoMdClose className="py-button-icon" />}
                    className="py-cancel-filled-button">
                    Cancel
                </Button>
                <Button
                    className={isDisabled ? 'py-disabled-button' : 'py-filled-button'}
                    disabled={isDisabled} onClick={handleSaveData}
                    leftSection={<FaCheck className="py-button-icon" />}>
                    <u>S</u>ave
                </Button>
            </div>
        </Modal>
    );
};

export { DialogEditForm };
export type { IDialogEditInput };
