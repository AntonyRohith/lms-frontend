export const BASE_URL = "http://localhost:8080/";

const getHeaders = (auth) => {
    let headers = {
        "content-type": "application/json"
    };
    if (auth) {
        let Authorization = localStorage.getItem("Token");
        headers = { ...headers, Authorization }
    }
    return headers;
};

export const put = async (path, data) => {
    const headers = getHeaders(true);
    let response = await fetch(BASE_URL + path, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers
    });
    let result = await response.json();
    if(response.status==200)
        return result;
    alert(result.message);
    return null;
};

export const post = async (path, data, auth) => {
    const headers = getHeaders(auth);
    let response = await fetch(BASE_URL + path, {
        method: 'POST',
        body: JSON.stringify(data),
        headers
    });
    let result = await response.json();
    if(response.status==200)
        return result;
    alert(result.message);
    return null;
};

export const get = async (path) => {
    const headers = getHeaders(true);
    let response = await fetch(BASE_URL + path, {
        method: 'GET',
        headers
    });
    let result = await response.json();
    if(response.status==200)
        return result;
    alert(result.message);
    return null;
};

export const del = async (path) => {
    const headers = getHeaders(true);
    let response = await fetch(BASE_URL + path, {
        method: 'DELETE',
        headers
    });
    let result = await response.json();
    if(response.status==200)
        return result;
    alert(result.message);
    return null;
};

export const upload = async (path,file,id) => {
    const formData = new FormData();
    formData.append("file",file);
    formData.append("id",id);
    let response = await fetch(BASE_URL + path, {
        method: 'POST',
        body: formData,
        headers:{
           Authorization: localStorage.getItem("Token")
        }
    });
    let result = await response.json();
    if(response.status==200)
        return result;
    alert(result.message);
    return null;
};
