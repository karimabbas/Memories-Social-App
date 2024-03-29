import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import React, { useEffect, useState } from 'react';
import App from '../App';


const MySwal = withReactContent(Swal)

const API = axios.create({ baseURL: 'https://localhost:7010' });

// console.log(localStorageItem);

API.interceptors.request.use((req) => {
    if (localStorage.getItem('UserProfile')) {
        req.headers.authorization = `Bearer ${localStorage.getItem('UserToken')}`;

    }
    return req;
},
    error => Promise.reject(error)
)

API.interceptors.response.use(res => res, error => {

    if (error?.response?.status === 401) {
        console.log("lol")
        MySwal.fire({
            title: 'Are you sure?',
            text: "You Not Authorized to this action!",
            icon: 'warning',
            confirmButtonText: 'okay!',

            customClass: {
                confirmButton: 'btn btn-warning',
            }
        });

        return Promise.reject({ status: 403, errors: ['Unauthorized'] })

    }

    if (error?.response?.status === 400) {
        console.log("lol")
        MySwal.fire({
            title: 'Something Wrong,',
            text: "Bad Request, Try Again",
            icon: 'question',
            confirmButtonText: 'okay!',

            customClass: {
                confirmButton: 'btn-btn-danger'
            }
        });

        return Promise.reject({ status: 400, errors: ['Bad Request'] })

    }

    if (error?.response?.status === 500) {
        MySwal.fire({
            title: 'Something Wrong,',
            text: "Internal Server Erro, Faild to saving Data, Try Again",
            icon: 'error',
            confirmButtonText: 'okay!',

            customClass: {
                confirmButton: 'btn-btn-danger'
            }
        });

        return Promise.reject({ status: 500, errors: ['Internal Server Erro'] })

    }

    if (error?.response?.status === 201) {
        MySwal.fire({
            title: 'Success',
            text: "Created successfully",
            icon: 'success',
            confirmButtonText: 'okay!',

            customClass: {
                confirmButton: 'btn-btn-success'
            }
        });

        return Promise.reject({ status: 500, errors: ['Internal Server Erro'] })

    }
})


// api.interceptors.response.use(response => response, error => {


//     if (error?.response?.status === 401) {
//         if (!nonApiRoute) logOut()
//         return Promise.reject({ status: 401, errors: ['Unauthorized'] })
//     }

//     if (error?.response?.status === 403) {
//         toast.error(
//             <ErrorToast
//                 title={<h3>تحذير !</h3>}
//                 result={<h3>أنت غير مصرح لك !</h3>}
//             />, { hideProgressBar: false })

//         return Promise.reject({ status: 403, errors: ['Unauthorized'] })
//     }

//     if (error?.response?.status === 422) {
//         const errors = Object.values(error?.response?.data || {})
//         return Promise.reject({ status: 422, errorsRaw: errors, errors: errors.reduce(error => error) })
//     }

//     console.error(error)

//     return Promise.reject({ status: error?.response?.status, errors: ['Oops!'] })
// })

///Auth Api
export const signUp = (data) => API.post('/Account/SginUp', data);
export const signIn = (data) => API.post('/Account/Sginin', data);
export const users = () => API.get('/AllUsers');
export const CurrentUser = () => API.get('/CurrentUser');
export const logOut = () => API.get('Account/Logout');

///Post Api
export const fetchPosts = () => API.get('/GetAllPosts');
export const createPost = (newPost) => API.post('/CreatePost', newPost);
export const EditPost = (id) => API.get(`/EditPost/${id}`);
export const UpdatePost = (id, post) => API.put(`/UpdatePost/${id}`, post);
export const deletePost = (id) => API.delete(`/DeletePost/${id}`);
export const postreacts = (id, type) => API.put(`/postreacts/${id}/${type}`);

//Dept Api
export const CreateDept = (newDept) => API.post('/department/create', newDept);
export const AllDepts = () => API.get('/department/all');

//Activity Api
export const CreateActivity = (newActivity) => API.post('/Activity/Create', newActivity);
export const AllActivities = () => API.get('/Activity/all');

///Employee Api
export const CreateEmp = (newEmp) => API.post('/Employee/Create', newEmp);
export const AllEmps = () => API.get('/Employee/All');
export const deleteEmployee = (id) => API.delete(`/Employee/Delete/${id}`);
export const GetEmployee = (id) => API.get(`/Employee/GetEmployee/${id}`);
export const UpdateEmployee = (id, EditEmp) => API.put(`/Employee/UpdateEmployee/${id}`, EditEmp);






