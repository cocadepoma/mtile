
const { REACT_APP_URL } = process.env;
const baseUrl = REACT_APP_URL;

const fetchWithoutToken = (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`;

    if (method === 'GET') {
        return fetch(url);
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}

const fetchWithToken = (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`;
    const token = localStorage.getItem('token') || '';

    switch (method) {
        case 'GET':
            return fetch(url, {
                method,
                headers: {
                    'x-token': token
                },
            });

        case 'POST':
            return fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': token
                },
                body: JSON.stringify(data)
            });

        case 'DELETE':
            return fetch(url, {
                method,
                headers: {
                    'x-token': token
                }
            });

        case 'PUT':
            return fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': token
                },
                body: JSON.stringify(data)
            });

        default:
            return false;
    }
}

const fetchWithFile = async (endpoint, data) => {

    const token = localStorage.getItem('token') || '';
    const url = `${baseUrl}/${endpoint}`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'x-token': token
        },
        body: data
    });

}

const fetchOperations = async (id, endpoint, arrayOperation, method = 'POST') => {

    const operations_added = [];

    for (const items of arrayOperation) {
        const resp = await fetchWithToken(`events/${endpoint}/${id}`, items, method);
        const { new_operation } = await resp.json();

        if (new_operation) {
            operations_added.push(new_operation);
        }
    }

    return operations_added;
}

const fetchDataWeeksSections = async (section, weeks) => {
    const temp = {
        name: section,
        data: []
    }

    for (const week of weeks) {

        const resp = await fetchWithToken(`statistics/section/${week}`, { section: section }, 'POST');
        const { data } = await resp.json();

        if (data.length > 0) {
            temp.data.push(data[0].total);
        }
        else {
            temp.data.push(0);
            // // Aleatory numbers just for showing more data
            // temp.data.push(Math.floor((Math.random() + 1) * 10));
        }
    }

    return temp;
}


export {
    fetchWithoutToken,
    fetchWithToken,
    fetchWithFile,
    fetchOperations,
    fetchDataWeeksSections
}