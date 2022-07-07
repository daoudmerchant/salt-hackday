const unwrap = cb => async (...params) => {
    const response = await cb(...params);
    const data = await response.json();
    return data;
}

const createUser = unwrap(({ username, password}) => {
    const formBody = new URLSearchParams();
    formBody.append('username', username);
    formBody.append('password', password)
    return fetch('http://localhost:3001/users/register', {
        method: "POST",
        body: formBody
    })
});

const signInUser = unwrap(({ username, password}) => {
    const formBody = new URLSearchParams();
    formBody.append('username', username);
    formBody.append('password', password)
    return fetch('http://localhost:3001/users/login', {
        method: "POST",
        body: formBody
    })
});

const addSnippet = unwrap((id, snippet) => {
    const formBody = new URLSearchParams();
    Object.entries(snippet).forEach(([key, val]) => {
        formBody.append(key, val);
    })
    return fetch(`http://localhost:3001/users/${id}`, {
        method: "POST",
        body: formBody
    })
})

const deleteSnippet = unwrap((id, snippetId) => {
    const formBody = new URLSearchParams();
    formBody.append('id', snippetId)
    return fetch(`http://localhost:3001/users/${id}`, {
        method: "DELETE",
        body: formBody
    })
})

export default { createUser, signInUser, addSnippet, deleteSnippet }