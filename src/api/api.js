import axios from "axios";

export function apiCreateUser(firstName, secondName, password){
    return axios({
        method: 'POST',
        url: 'http://127.0.0.1:3070/create_user',
        data: {
            firstName: firstName,
            lastName: secondName,
            password: password
        }
    })
}

export function apiGetUsersPool(){
    return axios({
        method: 'GET',
        url: 'http://127.0.0.1:3070/get_all_users'
    })
}

export function apiDeleteUser(id){
    return axios({
        method: 'DELETE',
        url: `http://127.0.0.1:3070/delete_user_data/${id}`
    })
}

export function  apiUpdateUser(id, firstName, secondName){
    return axios({
        method: 'PATCH',
        url: `http://127.0.0.1:3070/update_user_data/${id}`,
        data:{
            firstName: firstName,
            lastName: secondName
        }
    })
}