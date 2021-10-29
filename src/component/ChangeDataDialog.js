import React, { useState } from 'react';

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, DialogContentText } from '@mui/material';
import {IconButton} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";

export default function ChangeDataDialog({firstName, secondName, password, open, onClose, onSave}) {
    const [editableFirstName, editFirstName] = useState(firstName);
    const [editableSecondName, editSecondName] = useState(secondName);
    const [editablePassword, editPassword] = useState(String(password));
    const [showPass, showPassword] = useState(false);

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
                <TextField
                    margin="dense"
                    id="password"
                    label="Пароль (больше 8 символов)"
                    variant = 'standard'
                    fullWidth
                    value={editablePassword}
                    error={editablePassword.length < 8}
                    onChange={event => editPassword(event.target.value)}
                    type={showPass ? '' : 'password'}
                    inputProps={{
                        size: 40
                    }}
                    InputProps={{
                        endAdornment: showPass ?
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => {
                                    showPassword(false)
                                }}
                                children={<Visibility/>}
                                color="inherit"/>
                            :
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => {
                                    showPassword(true)
                                }}
                                children={<VisibilityOff/>}
                                color="inherit"/>,

                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick = {onClose}>Выйти</Button>
                <Button onClick = {() => {
                    onSave(editableFirstName, editableSecondName, editablePassword);
                    onClose();
                }}>Сохранить</Button>
            </DialogActions>
        </Dialog>
    );
}