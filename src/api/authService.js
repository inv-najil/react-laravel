import API from "./axios";


export const loginAPI = (data) => {
    return API.post("/login", data);
};

export const registerAPI = (data) => {
    return API.post("/register", data);
};

export const logoutApi = () => {
    return API.post("/logout");
};

export const refreshAPI = () => {
    return API.post("/refresh");
};

export const getAllStudents = () => {
    return API.get("/students");
};

export const getStudentByID = (id) => {
    return API.get(`/students/${id}`);
};

export const updateStudent = (id, data) => {
    return API.put(`/students/${id}`, data);
};

export const deleteStudent = (id) => {
    return API.delete(`/students/${id}`);
};

export const getStudentProfile = () => {
    return API.get("/student/profile");
};

export const getAllTeachers = () => {
    return API.get("/teachers");
};

export const getTeacherById = (id) => {
    return API.get(`teachers/${id}`);
};

export const updateTeacher = (id, data) => {
    return API.put(`/teachers/${id}`, data);
};

export const deleteTeacher = (id) => {
    return API.delete(`/teachers/${id}`);
};

export const getTeacherStudents = (teacherId) => {
    return API.get(`/teachers/${teacherId}/students`);
};