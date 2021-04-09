import http from "../http-common";

const base = '/physicians';

const getAll = () => {
    return http.get(`${base}`);
};

const getExpertise = () => {
    return http.get(`${base}/expertise`);
};

const getPhysicianByExpertise = (name) => {
    return http.get(`${base}/expertise/${name}`);
};

const getPhysicianConsultationTime = (id) => {
    return http.get(`${base}/${id}/consultation-times`);
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

const remove = id => {
    return http.delete(`${base}/${id}`);
};

const removeAll = () => {
    return http.delete(`${base}`);
};

const findByTitle = name => {
    return http.get(`${base}?name=${title}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle,
    getExpertise,
    getPhysicianByExpertise,
    getPhysicianConsultationTime,
};