const formDOM = document.querySelector('.form');
const usernameInputDOM = document.querySelector('.username-input');
const passwordInputDOM = document.querySelector('.password-input');
const formAlertDOM = document.querySelector('.form-alert');
const resultDOM = document.querySelector('.result');
const btnDOM = document.querySelector('#data');
const tokenDOM = document.querySelector('.token');
const orderFormDOM = document.querySelector('.order-form');
const nameInputDOM = document.querySelector('.name-input');
const emailInputDOM = document.querySelector('.email-input');
const quantityInputDOM = document.querySelector('.quantity-input');
const orderAlertDOM = document.querySelector('.order-alert');


formDOM.addEventListener('submit', async (e) => {
    e.preventDefault();
    formAlertDOM.classList.remove('text-success');

    const username = usernameInputDOM.value;
    const password = passwordInputDOM.value;

    try {
        const { data } = await axios.post('/api/v1/logon', { username, password });

        formAlertDOM.style.display = 'block';
        formAlertDOM.textContent = data.msg;

        formAlertDOM.classList.add('text-success');
        usernameInputDOM.value = '';
        passwordInputDOM.value = '';

        localStorage.setItem('token', data.token);
        tokenDOM.textContent = 'User authenticated';
        tokenDOM.classList.add('text-success');
    } catch (error) {
        formAlertDOM.style.display = 'block';
        formAlertDOM.textContent = error.response.data.msg;
        localStorage.removeItem('token');
        tokenDOM.textContent = 'No user authenticated';
    }
    setTimeout(() => {
        formAlertDOM.style.display = 'none';
    }, 2000);
});


btnDOM.addEventListener('click', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        resultDOM.innerHTML = `<p>Please log in first</p>`;
        return;
    }

    try {
        const { data } = await axios.get('/api/v1/hello', {
            headers: { Authorization: `Bearer ${token}` },
        });
        resultDOM.innerHTML = `<h5>${data.msg}</h5><p>${data.secret}</p>`;
    } catch (error) {
        localStorage.removeItem('token');
        resultDOM.innerHTML = `<p>${error.response.data.msg}</p>`;
    }
});


orderFormDOM.addEventListener('submit', async (e) => {
    e.preventDefault();
    orderAlertDOM.classList.remove('text-success', 'text-danger');

    const token = localStorage.getItem('token');
    const name = nameInputDOM.value;
    const email = emailInputDOM.value;
    const quantity = parseInt(quantityInputDOM.value, 10);

    if (!token) {
        orderAlertDOM.textContent = 'Please log in to order tickets.';
        orderAlertDOM.classList.add('text-danger');
        return;
    }

    try {
        const { data } = await axios.post(
            '/api/v1/order',
            { name, email, quantity },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        orderAlertDOM.textContent = data.msg;
        orderAlertDOM.classList.add('text-success');
        nameInputDOM.value = '';
        emailInputDOM.value = '';
        quantityInputDOM.value = '';
    } catch (error) {
        orderAlertDOM.textContent = error.response.data.msg;
        orderAlertDOM.classList.add('text-danger');
    }
});
