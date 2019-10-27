import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import './styles.css';
import api from '../../services/api';

export default function New({ history }) {
    const [company, setCompany] = useState('');
    const [price, setPrice] = useState('');
    const [techs, setTechs] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    async function handleSubmit(event) {
        event.preventDefault();
        const user_id = localStorage.getItem('user_id');

        const data = new FormData();
        data.append('company', company);
        data.append('price', price);
        data.append('techs', techs);
        data.append('thumbnail', thumbnail);

        const res = await api.post('/spots', data, {
            headers: {
                user_id: user_id
            }
        });

        if (res.status == 200) {
            console.log(res.data);
            history.push('/dashboard');
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label id="thumbnail"
                    style={{ backgroundImage: `url(${preview})` }}
                    className={thumbnail ? 'has-thumbnail' : ''}>
                    <input
                        type="file"
                        onChange={event => setThumbnail(event.target.files[0])}>
                    </input>
                    <img src={camera} alt="Escolher uma image">
                    </img>
                </label>

                <label htmlFor="company">Empresa *</label>
                <input
                    id="company"
                    placeholder="Sua empresa"
                    value={company}
                    onChange={event => setCompany(event.target.value)}>
                </input>
                <label htmlFor="techs">Tecnologias * <span>(separadas por vírgula)</span></label>
                <input
                    id="techs"
                    placeholder="Quais tecnologias usam?"
                    value={techs}
                    onChange={event => setTechs(event.target.value)}>
                </input>
                <label htmlFor="price">Preço por dia <span>(em branco quando for gratuito)</span></label>
                <input
                    id="price"                                        
                    placeholder="Valor cobrado por dia"
                    value={price}
                    onChange={event => setPrice(event.target.value)}>
                </input>
                <button type="submit" className="btn-primary">Cadastrar</button>
            </form>
        </>
    )
}