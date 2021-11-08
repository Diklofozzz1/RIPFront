import React, { useState } from 'react';

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, DialogContentText } from '@mui/material';
import {IconButton} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";

export default function ChangeDescriptionDialog({description, open, onClose, onSave}) {
    const [editableDescription, editDescription] = useState(description);

    return (
        <Dialog open = {open} onClose = {onClose}>
            <DialogTitle>Меняем что-то?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Измениете описание!
                </DialogContentText>
                <TextField
                    autoFocus
                    margin = 'dense'
                    id = 'name'
                    label = 'Описание'
                    type = 'text'
                    fullWidth
                    variant = 'standard'
                    value={editableDescription}
                    onChange={event => editDescription(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick = {onClose}>Выйти</Button>
                <Button onClick = {() => {
                    onSave(editableDescription);
                    onClose();
                }}>Сохранить</Button>
            </DialogActions>
        </Dialog>
    );
}