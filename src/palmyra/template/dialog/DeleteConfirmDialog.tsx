import { Modal } from '@mantine/core';
import { useContext } from 'react';
import { StoreFactoryContext } from '@palmyralabs/rt-forms';
import { FiAlertTriangle, FiTrash2, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import "./DeleteConfirmDialog.css";

interface ContentItem {
    label: string;
    value: any;
}

interface DeleteConfirmDialogInput {
    isOpen?: boolean;
    onClose: () => void;
    label: string;
    contentData: ContentItem[];
    onDelete: () => void;
    id?: any;
    endPoint: any;
    aclCode?: string;
    aclCheck?: (code?: string) => boolean;
    className?: string;
}

function DeleteConfirmDialog(props: DeleteConfirmDialogInput) {
    const { isOpen, onClose, contentData, onDelete, id, endPoint, label, aclCode, className } = props;
    const storeFactory: any = useContext(StoreFactoryContext);
    const isAclAccess = aclCode ? (props.aclCheck ? props.aclCheck(aclCode) : true) : true;
    const isDisabled = !isAclAccess;

    const handleKeyClose = (event: any) => {
        if (event.keyCode === 27) onClose();
    };

    const handleDelete = () => {
        if (!isAclAccess) {
            toast.error("You do not have permission to perform this action");
            return;
        }
        storeFactory.getFormStore({}, endPoint, id)
            .remove({})
            .then((_d: any) => {
                if (label) toast.success(`${label} deleted successfully`);
                onDelete();
                onClose();
            })
            .catch((e: any) => {
                toast.error(e?.response?.data?.errorMessage || "Delete failed");
            });
    };

    return (
        <Modal opened={isOpen} onClose={onClose} onKeyDown={handleKeyClose}
            className={className || ''} centered zIndex={999} withCloseButton={false}
            padding={0} radius="lg" size={420}>
            <div className="py-del-dialog-header">
                <div className="py-del-dialog-icon">
                    <FiTrash2 />
                </div>
                <div className="py-del-dialog-heading">
                    <p className="py-del-dialog-title">Delete {label}</p>
                    <p className="py-del-dialog-sub">This action cannot be undone</p>
                </div>
                <button className="py-del-dialog-close" onClick={onClose}>
                    <FiX />
                </button>
            </div>

            <div className="py-del-dialog-body">
                <div className="py-del-dialog-warning">
                    <FiAlertTriangle className="py-del-dialog-warning-icon" />
                    <p>
                        Are you sure you want to permanently delete this{' '}
                        <span className="py-del-dialog-strong">{label}</span>? All associated data will be removed.
                    </p>
                </div>

                {contentData?.length > 0 && (
                    <div className="py-del-dialog-records">
                        <div className="py-del-dialog-records-head">Record Details</div>
                        <div className="py-del-dialog-records-body">
                            {contentData.map((d, idx) => (
                                <div key={idx} className="py-del-dialog-record">
                                    <span className="py-del-dialog-record-label">{d.label}</span>
                                    <span className="py-del-dialog-record-value">{d.value ?? '—'}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="py-del-dialog-footer">
                <button className="py-del-dialog-cancel" onClick={onClose}>Cancel</button>
                <button className="py-del-dialog-delete" onClick={handleDelete} disabled={isDisabled}>
                    <FiTrash2 />
                    Delete
                </button>
            </div>
        </Modal>
    );
}

export { DeleteConfirmDialog };
export type { DeleteConfirmDialogInput, ContentItem };
