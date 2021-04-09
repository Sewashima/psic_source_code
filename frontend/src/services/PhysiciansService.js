import http from "../http-common";

const getAll = () => {
    return http.get("/physicians");
};

const get = id => {
    return http.get(`/physicians/${id}`);
};

const create = data => {
    return http.post("/physicians", data);
};

const update = (id, data) => {
    return http.put(`/physicians/${id}`, data);
};

const remove = id => {
    return http.delete(`/physicians/${id}`);
};

const removeAll = () => {
    return http.delete(`/physicians`);
};

const findByTitle = title => {
    return http.get(`/physicians?title=${title}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};