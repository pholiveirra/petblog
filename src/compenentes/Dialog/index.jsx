import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import { useRef } from 'react';
import Draggable from 'react-draggable';

function PaperComponent(props) {
    const paperRef = useRef(null);

    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
            nodeRef={paperRef}
        >
            <Paper {...props} ref={paperRef} />
        </Draggable>
    );
}

export default function DraggableDialog({
    open,
    title = "Dialog Title",
    message = "Dialog message goes here.",
    onConfirm,
    onCancel,
}) {
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onCancel}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move'}} id="draggable-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  onClick={onCancel}>Cancelar</Button>
                    <Button style={{color:"red"}} onClick={onConfirm} autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
