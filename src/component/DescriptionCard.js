import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useState} from "react";
import ChangeDataDialog from "./ChangeDataDialog";
import {apiCreateUser, apiUpdateUser} from "../api/api";
import ChangeDescriptionDialog from "./ChangeDescriptionDialog";


export default function DescriptionCard({id ,_description, onDelete}) {
    const [editDescriptionDialogIsOpen, openEditDescriptionDialog] = useState(false);

    const [description, updateDescription] = useState(_description);

    const updateHandler = (_id, _description) => {

    }


    return (
        <Box sx={{ minWidth: 450 }} style={{marginLeft: "auto", marginRight: "auto", marginBottom: '2%'}} id = {id}>
            <ChangeDescriptionDialog
                description={_description}
                open={editDescriptionDialogIsOpen}
                onClose={()=>{openEditDescriptionDialog(false)}}
                onSave={(newDescription)=>{
                    updateHandler(id, description);
                    updateDescription(newDescription)
                }}
            />

            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {description}
                        </Typography>
                    </CardContent>
                    <CardActions >
                        <Button style={{marginLeft: "auto", marginRight: "auto", color: "red"}} size="small" onClick={() => {onDelete()}}>Удалить</Button>
                        <Button style={{marginLeft: "auto", marginRight: "auto"}} size="small" onClick={()=>{openEditDescriptionDialog(!editDescriptionDialogIsOpen)}}>Изменить</Button>
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    );
}