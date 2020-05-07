import {get, post, put} from "../plugins/axios";

// get 请求
const findAllUser = (pageNum, pageSize) => get('/user/findAll/' + pageNum + '/' + pageSize);
const findUserById = id => get('/user/findUser/', id);
const logout = () => get('/pub/logout');


// post 请求
const login = loginInfo => post('/pub/login', loginInfo);
const curMenus = () => post('/user/curMenus');


// put 请求
const updateUser = userForm => put('/user/update', userForm);
const updateUserStatus = (id, status) => put('/user/updateStatus/' + '/' +id + '/' + status);

// delete 请求
const deleteUserById = id => del('/user/delete/' + id);



export default {
    findAllUser,
    findUserById,
    logout,

    login,
    curMenus,

    updateUser,
    updateUserStatus,

    deleteUserById

}


