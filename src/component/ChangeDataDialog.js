import React, { useState } from 'react';

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, DialogContentText } from '@mui/material';
import {IconButton} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";

export default function ChangeDataDialog({firstName, secondName, open, onClose, onSave}) {
    const [editableFirstName, editFirstName] = useState(firstName);
    const [editableSecondName, editSecondName] = useState(secondName);

    return (
        <Dialog open = {open} onClose = {onClose}>
            <DialogTitle>Меняем что-то?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Измениете данные пользователя!
                </DialogContentText>
                <TextField
                    autoFocus
                    margin = 'dense'
                    id = 'name'
                    label = 'Имя'
                    type = 'text'
                    fullWidth
                    variant = 'standard'
                    value={editableFirstName}
                    onChange={event => editFirstName(event.target.value)}
                />
                <TextField
                    margin = 'dense'
                    id = 'name'
                    label = 'Фамилия'
                    type = 'text'
                    fullWidth
                    variant = 'standard'
                    value={editableSecondName}
                    onChange={event => editSecondName(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick = {onClose}>Выйти</Button>
                <Button onClick = {() => {
                    onSave(editableFirstName, editableSecondName);
                    onClose();
                }}>Сохранить</Button>
            </DialogActions>
        </Dialog>
    );
}