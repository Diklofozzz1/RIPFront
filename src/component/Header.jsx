import React, {useEffect, useState} from "react";
import {Button, IconButton, makeStyles, TextField} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import UserCard from "./UserCard";
import {apiCreateUser, apiDeleteUser, apiGetUsersPool, apiUpdateUser} from "../api/api";
import DescriptionDialog from "./DescriptionDialog";
import DescriptionCard from "./DescriptionCard";
import {socket} from "../api/socket";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },


    midTitle: {
        color: '#151E2B',
        fontSize: '3rem',
    },

    midTextContainer: {
        textAlign: 'center',
        fontFamily: 'Didact Gothic',
    },

    fieldContainer: {
        width: 200,
    }

}));

let id = 0;

export default function Header() {

    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, showPassword] = useState(false);

    const classes = useStyles();
    const [checked, setChecked] = useState(false);

    const [userCards, createUserCards] = useState([]);

    const [description, setDescription] = useState('')
    const [descriptionCard, createDescriptionCard] = useState([]);

    const [descriptionDialogIsOpen, openDescriptionDialog] = useState(false)

    const deleteDescriptionHandler = (_id) => {
        socket.emit("delete_description", {
            id: _id
        })
        createDescriptionCard(descriptionCard.filter(rec => rec.id !== _id))
    }

    const cardCreate = () => {
        apiCreateUser(firstName, secondName, password).then(response => {
            if (response.status === 200) {
                createUserCards([...userCards, {
                    id: response.data.id,
                    firstName: response.data.firstName,
                    secondName: response.data.lastName,
                    password: response.data.password
                }]);
            }
        }).catch((err) => {
            alert('походу навернулся докер, вот тебе ошибка: ' + err)
        })
    }

    useEffect(async () => {
        try {
            socket.emit("get_all_descriptions", {});
            await socket.on('get_all_descriptions_answer', (arg)=>{
                let descripts = [];
                for (const item of arg ){
                    descripts.push({
                        id: item.id,
                        description: item.description
                    });
                }
                createDescriptionCard(descripts)
            })

            const response = await apiGetUsersPool();
            let users = [];

            response.data.forEach(user => {
                users.push({
                    id: user.id,
                    firstName: user.firstName,
                    secondName: user.lastName,
                    password: user.password
                })
            });

            createUserCards(users);

        } catch (err) {
            createUserCards([]);
            alert('походу навернулся докер, вот тебе ошибка: ' + err)
        }
        setChecked(true);
    }, [])

    const deleteHandler = (_id) => {
        console.log('api: '+_id);
        apiDeleteUser(_id).then(response => {
            if (response.status === 200) {
                console.log("22: " + _id)
                createUserCards(userCards.filter(rec => rec.id !== _id));
            }
        }).catch((err) => {
            alert('походу навернулся докер, вот тебе ошибка: ' + err)
        })
    }

    const descriptionCreator = async (newDescription) => {
        try{
            socket.emit("create_description", {
                description: newDescription
            })
            await socket.on("create_description_answer", (arg)=>{
                createDescriptionCard([...descriptionCard, {id: arg.id, description: arg.description}])
            })
        }catch (err){
            alert('походу навернулся докер(но возможно и сокеты), вот тебе ошибка: ' + err)
        }
    }

    return (
        <div className={classes.midTextContainer}>
            <h1 className={classes.midTitle}>Добро пожаловать в мое бесполезное приложение)<br/></h1>
            <h2 color='blue'> Введите данные пользователя в полях ниже </h2>


            <DescriptionDialog
                open={descriptionDialogIsOpen}
                onClose={()=>{openDescriptionDialog(false)}}
                onSave={(newDescription)=>{
                    // setDescription(newDescription);
                    descriptionCreator(newDescription)
                }}
            />


            <div>
                <TextField
                    autoFocus
                    margin="dense"
                    id="firstName"
                    label="Nмя"
                    error={firstName.length < 2}
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    inputProps={{
                        size: 50,
                    }}
                />

                <br/>

                <TextField
                    margin="dense"
                    id="secondName"
                    label="Фамилия"
                    error={secondName.length < 2}
                    value={secondName}
                    onChange={e => setSecondName(e.target.value)}
                    inputProps={{
                        size: 50,
                    }}
                />

                <br/>

                <TextField
                    margin="dense"
                    id="password"
                    label="Пароль (больше 8 символов)"
                    value={password}
                    error={password.length < 8}
                    onChange={e => setPassword(e.target.value)}
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

                <br/>

                <Button variant="contained" style={{margin: 10}} onClick={() => {
                    cardCreate()
                }} color="primary">
                    Зарегистрировать
                </Button>

                <Button variant="contained" style={{margin: 10}} onClick={() => {
                    openDescriptionDialog(!descriptionDialogIsOpen)
                }} color="primary">
                    Добавить заметку
                </Button>


                <hr/>
                    {
                        descriptionCard.map(el => {
                            return(
                                <DescriptionCard
                                    id={el.id}
                                    key={el.id}
                                    _description={el.description}
                                    onDelete={()=>{
                                        deleteDescriptionHandler(el.id)
                                    }}
                                />
                            )
                        })
                    }

                <hr/>

                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: '3%',
                    }}>
                    {
                        userCards.map(el => {
                            console.log(el.id)
                            return (
                                <UserCard
                                    id={el.id}
                                    key={el.id}
                                    firstName={el.firstName}
                                    secondName={el.secondName}
                                    password={el.password}
                                    onDelete={() => {
                                        deleteHandler(el.id);
                                    }}
                                />
                            );
                        })
                    }
                </div>

            </div>

        </div>

    )
}