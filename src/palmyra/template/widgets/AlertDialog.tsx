import ReactDOM from 'react-dom/client'
import React, { forwardRef, MutableRefObject, useImperativeHandle, useRef, useState } from 'react';
import { Button, Modal } from '@mantine/core';

interface IAlertDialogProps {
    title: any
    content: JSX.Element,
    hidden?: boolean,
    onClose?: () => void;
    mode?: 'normal' | 'info' | 'warning' | 'critical'
    buttonText?: string;
}

interface IDialog {
    hide: () => void,
    show: () => void
}

const AlertDialog = forwardRef(function AlertDialog(props: IAlertDialogProps, ref: MutableRefObject<IDialog>) {

    const { buttonText = 'OK' } = props;
    const [open, setOpen] = useState<boolean>(!props.hidden);
    const currentRef = ref || useRef<IDialog>();

    useImperativeHandle(currentRef, () => {
        return {
            hide: () => setOpen(false),
            show: () => setOpen(true)
        }
    }, [])

    const doClose = () => {
        props.onClose && props.onClose();
        setOpen(false);
    }

    return (
        <>
            {open &&
                <Modal className='py-alert-dialog' opened={open} onClose={doClose}
                    title={props.title}>
                    <div className='py-alert-dialog-content'>
                        {props.content}
                    </div>
                    <div className='py-alert-dialog-action'>
                        <Button onClick={doClose}
                            className='py-alert-dialog-button py-alert-dialog-button-ok'>
                            {buttonText}
                        </Button>
                    </div>
                </Modal>
            }
        </>
    )
})


const showDialog = (options: Omit<IAlertDialogProps, 'hidden'>, Dialog?: React.FC) => {
    const Element = Dialog || AlertDialog;
    const root = ReactDOM.createRoot(document.getElementById('PalmyraDialogRoot')!);

    const unmount = () => {
        root.unmount();
        options.onClose && options.onClose();
    }

    root.render(
        <Element {...options} onClose={unmount} />
    )
}

const PyDialogRoot = () => <div id='PalmyraDialogRoot'></div>

export { AlertDialog, PyDialogRoot, showDialog };