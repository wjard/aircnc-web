import React, { useState } from 'react';

import api from '../../services/api';

const Login = function ({ history }) {
    const [email, setEmail] = useState('');

    function handleChangeEmail(event) {
        setEmail(event.target.value);
    }
    async function handelSubmit(event) {
        event.preventDefault();
        console.log(email);

        const res = await api.post('/sessions', {
            email: email
        });
        console.log(res.data);

        if (res && res.status == 200) {
            const { _id } = res.data;
            console.log('user_id', _id);
            localStorage.setItem('user_id', _id);
        }

        history.push('/dashboard');
    }

    return (
        <>
            <p>Ofereça <strong>spots</strong> para programdores e encontre <strong>talentos</strong> para sua empresa
            </p>
            <form onSubmit={handelSubmit}>
                <label htmlFor="email">E-MAIL *</label>
                <input id="email"
                    type="email"
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={handleChangeEmail}>
                </input>
                <button className="btn-primary" type="submit">
                    Entrar
                </button>
            </form>
        </>
    )
}

export default Login;