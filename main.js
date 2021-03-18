const my_url = 'https://jsonplaceholder.typicode.com/todos';

//AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// GET REQUEST
const getTodos = async () => {
    const result = await axios.get(my_url, { 
        params: { 
            _limit: 5 
        }
    });
    showOutput(result);
};

// POST REQUEST
const addTodo = async () => {
    const result = await axios.post(my_url, {
        data: {
            title: 'New Todo',
            completed: false
        }
    });
    showOutput(result);
};

// PUT REQUEST
const putTodo = async () => {
    const result = await axios.put(`${my_url}/1`, {
        data: {
            title: 'Updated ToDo',
            completed: true
        }
    });
    showOutput(result);
};

// PUT REQUEST
const patchTodo = async () => {
    const result = await axios.patch(`${my_url}/1`, {
        params: {
            id: 1
        },

        data: {
            title: 'Updated ToDo',
            completed: true
        }
    });
    showOutput(result);
};

// DELETE REQUEST
const removeTodo = async () => {
    const result = await axios.delete(`${my_url}/1`);
    showOutput(result);
};

// SIMULTANEOUS DATA
const getData = async () =>{
    const [ res1, res2 ] = await axios.all([
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    ]);
    showOutput(res2);
};

// CUSTOM HEADERS
const customHeaders = async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'sometoken'
        }
    }
    const result = await axios.put(`${my_url}/1`, {
        data: {
            title: 'Updated ToDo',
            completed: true
        }},
        config
    );
    showOutput(result);
};

// TRANSFORMING REQUESTS & RESPONSES
const transformResponse = async () => {
    const options = {
        method: 'post',
        url: my_url,
        data: {
            title: 'Hello World'
        },
        transformResponse: axios.defaults.transformResponse.concat(data => {
            data.title = data.title.toUpperCase();
            return data;
        })
};

    const result = await axios(options);
    showOutput(result);
};

// ERROR HANDLING
const errorHandling = () => {
    axios
        .get('https://jsonplaceholder.typicode.com/todosSSS')
        .then(res => showOutput(res))
        .catch(err => {
            if (err.response) {
                // Server responded with a status other than 200 range
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);

                if (err.response.status === 404) {
                    alert('Error: Page Not Found!');
                };
            } else if (err.request) {
                console.error(err.request);
            } else {
                console.error(err.message);
            };
        });
};    

// CANCEL TOKEN
const cancelToken = () => {
    const source = axios.CancelToken.source();

    axios
        .get('https://jsonplaceholder.typicode.com/todos', {
            cancelToken: source.token
        })
        .then(res => showOutput(res))
        .catch(thrown => {
            if (axios.isCancel(thrown)) {
                console.log(`Request canceled: ${thrown.message}`);
            }
        });

    if (true) {
        source.cancel('Request canceled!');
    };
};

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
    config => {
        console.log(
            `${config.method.toUpperCase()} requst sent to ${
                config.url
            } at ${new Date().toISOString()}`
        );

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// AXIOS INSTANCES
const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

axiosInstance.get('/comments').then(res => showOutput(res));

// Show output in browser
const showOutput = (res) => {
    document.getElementById('res').innerHTML = `
        <div class="card card-body mb-4">
            <h5>Status: ${res.status}</h5>
        </div>
        <div class="card mt-3">
            <div class="card-header">
                Headers
            </div>
            <div class="card-body">
                <pre>${JSON.stringify(res.headers, null, 2)}</pre>
            </div>
        </div>
            <div class="card mt-3">
            <div class="card-header">
                Data
            </div>
            <div class="card-body">
                <pre>${JSON.stringify(res.data, null, 2)}</pre>
            </div>
        </div>
        <div class="card mt-3">
            <div class="card-header">
                Config
            </div>
            <div class="card-body">
                <pre>${JSON.stringify(res.config, null, 2)}</pre>
            </div>
        </div>
    `;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('put').addEventListener('click', putTodo);
document.getElementById('patch').addEventListener('click', patchTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document.getElementById('transform').addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);