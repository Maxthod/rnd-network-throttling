const axios = require('axios').default
const url = "http://localhost:3000"
const total = 1000
const doCreate = async (id) => {
    const { data } = await axios.post(url, {
        id,
        total
    })
    return data
}


const doDelete = async (id) => {
    const { data } = await axios.put(`${url}`, {
        id
    })
    return data
}

const getValue = async (id) => {
    const { data } = await axios.get(`${url}/${id}`)
    return data
}

const start = async () => {
    const id = require('crypto').randomUUID()
    const start = await doCreate(id)
    console.log(start)
    const promises = []
    for (let i = 0; i < 1000; i++) {
        promises.push((async () => {
            const res = await getValue(id)
            console.log(`Request # ${i} - ${res}`)
        })())
    }
    await Promise.all(promises)
    const end = await doDelete(id)
    console.log(end)
}

start().then(() => console.log("we done"))
    .catch(err => console.error(err))
