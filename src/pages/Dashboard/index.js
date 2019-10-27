import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function Dashboard() {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user_id');

            const res = await api.get('/dashboard', {
                headers: { user_id }
            });
            if (res.status == 200) {
                console.log(res.data);
                setSpots(res.data);
            }
        }

        loadSpots();
    }, []);

    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}>
                        </header>
                        <strong>
                            {spot.company}
                        </strong>
                        <span>
                            {spot.price ? `R$${spot.price} por dia` : 'Gratuito'}
                        </span>
                    </li>
                ))}
            </ul>
            <Link to='/new'>
                <button className="btn-primary">Cadastrar novo spot</button>
            </Link>
        </>
    )
}