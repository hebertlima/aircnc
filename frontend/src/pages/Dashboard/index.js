import React, { useEffect, useState, useMemo } from 'react';

import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';

import './style.css';

import api from '../../services/api';

export default function Dashboard() {
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);

    const user = localStorage.getItem("user");

    const socket = useMemo(() => socketio('http://10.0.75.1:3333', {
        query: { user }
    }), [user]);

    useEffect(() => {
        socket.on('booking_request', data => {
            console.log(data);
            setRequests([... requests, data]);
        });
    }, [requests, socket]);

    useEffect(() => {
        async function loadSpots() {
            const user = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user }
            });

            setSpots(response.data);
        }

        loadSpots();
    }, []);

    async function handleAccept(id) {
        await api.post(`bookings/${id}/approvals`);
        setRequests(requests.filter(request => request._id != id));
    }

    async function handleReject(id) {
        await api.post(`bookings/${id}/rejections`);
        setRequests(requests.filter(request => request._id != id));
    }

    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> no dia <strong>{request.date}</strong>
                            <br />
                            <button className="accept" onClick={() => handleAccept(request._id)}>Aceitar</button>
                            <button className="reject" onClick={() => handleReject(request._id)}>Rejeitar</button>
                        </p>
                    </li>
                ))}
            </ul>

            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new" >
                <button className="btn">Cadastror novo spot</button>
            </Link>
        </>
    );
}