const my_url = 'https://jsonplaceholder.typicode.com/todos';

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
function customHeaders() {
console.log('Custom Headers');
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
console.log('Transform Response');
}

// ERROR HANDLING
function errorHandling() {
console.log('Error Handling');
}

// CANCEL TOKEN
function cancelToken() {
console.log('Cancel Token');
}

// INTERCEPTING REQUESTS & RESPONSES

// AXIOS INSTANCES

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
document
.getElementById('transform')
.addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);