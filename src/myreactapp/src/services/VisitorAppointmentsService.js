import http from "../http-common";

const base = '/visitor-appointments';

const getAll = () => {
    return http.get(`${base}`);
};

const get = id => {
    return http.get(`${base}/${id}`);
};

const create = data => {
    return http.post(`${base}`, data);
};

const update = (id, data) => {
    return http.put(`${base}/${id}`, data);
};

const cancel = (id) => {
    return http.put(`${base}/${id}/cancel`);
};

const attend = (id) => {
    return http.put(`${base}/${id}/attend`);
};

const remove = id => {
    return http.delete(`${base}/${id}`);
};

const removeAll = () => {
    return http.delete(`${base}`);
};

const findByTitle = name => {
    return http.get(`${base}?name=${name}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    cancel,
    attend,
    removeAll,
    findByTitle
};