import {get, post, post2} from "../plugins/axios";

// get 请求
const findAllUser = (pageNum, pageSize) => get('/user/findAll/' + pageNum + '/' + pageSize);


// post 请求
const login = loginInfo => post('/pub/login', loginInfo);
const curMenus = () => post2('/user/curMenus');


// delete 请求
const deleteUserById = id => del('/user/delete/' + id);



export default {
    findAllUser,

    login,
    curMenus,

    deleteUserById

}


