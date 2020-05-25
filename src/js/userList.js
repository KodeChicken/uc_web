import {get, post, put, del} from "../plugins/axios";

// get 请求
export const findAllUser = (pageNum, pageSize) => get('/user/findAll/' + pageNum + '/' + pageSize);
export const findUserById = id => get('/user/findUser/' + id);
export const findRolesByUserId = (id, pageNum, pageSize) => get('/user/findRolesByUserId/' + id + '/' + pageNum + '/' + pageSize);
// put 请求
export const updateUser = userForm => put('/user/update', userForm);
export const updateUserStatus = (id, status) => put('/user/updateStatus/' + '/' +id + '/' + status);
export const updateUserRoles = (userId, roleList) => put('/user/updateUserRoles', {userId: userId, roleList: roleList})
// post 请求
export const uploadUserFile = item => post('/file/uploadUser', item)


// delete 请求
export const deleteUserById = id => del('/user/delete/' + id);

