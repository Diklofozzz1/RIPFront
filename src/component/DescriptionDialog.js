import React, { useState } from 'react';

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, DialogContentText } from '@mui/material';

export default function DescriptionDialog({_description , open, onClose, onSave}) {
    const [description, setDescription] = useState(_description);


    return (
        <Dialog open = {open} onClose = {onClose}>
            <DialogTitle>Описание</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Напишите описание
                </DialogContentText>
                <TextField
                    autoFocus
                    margin = 'dense'
                    id = 'name'
                    label = 'Имя'
                    type = 'text'
                    fullWidth
                    variant = 'standard'
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick = {onClose}>Выйти</Button>
                <Button onClick = {() => {
                    onSave(description);
                    onClose();
                }}>Сохранить</Button>
            </DialogActions>
        </Dialog>
    );
}