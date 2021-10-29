import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useState} from "react";
import ChangeDataDialog from "./ChangeDataDialog";


export default function UserCard({id ,firstName, secondName, password, onDelete}) {
    const [editDialogProfileIsOpen, openEditDialog] = useState(false);

    const [userFirstName, updateFirstName] = useState(firstName);
    const [userSecondName, updateSecondName] = useState(secondName);
    const [userPassword, updatePassword] = useState(password);

    return (
        <Box sx={{ maxWidth: 250 }} style={{marginLeft: "auto", marginRight: "auto", marginBottom: '2%'}} id = {id}>
            <ChangeDataDialog
                 firstName={firstName}
                 secondName={secondName}
                 password={password}
                 open={editDialogProfileIsOpen}
                 onClose={()=>openEditDialog(false)}
                 onSave={(newFirstName, newSecondName, newPassword)=>{
                     updateFirstName(newFirstName);
                     updateSecondName(newSecondName);
                     updatePassword(newPassword);
                 }}
            />

            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {userFirstName}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {userSecondName}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {userPassword}
                        </Typography>
                    </CardContent>
                    <CardActions >
                        <Button style={{marginLeft: "auto", marginRight: "auto", color: "red"}} size="small" onClick={() => {onDelete(); console.log("33: " + id)}}>Удалить</Button>
                        <Button style={{marginLeft: "auto", marginRight: "auto"}} size="small" onClick={()=>{openEditDialog(!editDialogProfileIsOpen)}}>Изменить</Button>
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    );
}