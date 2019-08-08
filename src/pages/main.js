import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import deslike from '../assets/dislike.svg'
import like from '../assets/like.svg'
import api from '../services/api'
import './main.css'

function Main({ match }){
    const [ users, setUser ] = useState([])

    useEffect( () => {

        async function loadUser(){

            const res = await api.get('/devs', {
                headers: { user: match.params.id }
            })

            setUser(res.data)
        }

        loadUser()

    }, [match.params.id])

    async function handleLike(id){
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id }
        })

        setUser( users.filter(user => user._id !== id ))
    }
    
    async function handleDeslike(id){
        await api.post(`/devs/${id}/deslikes`, null, {
            headers: { user: match.params.id }
        })

        setUser( users.filter(user => user._id !== id ))
    }
    return (
        <div className="main-container">

            <Link to="/">
                <img src={logo} alt="logo Tindev"/>
            </Link>

            { users.length === 0 ? ( <div className="empty"> Acabou :( </div> ) : '' }
            
            <ul>
                { 
                    users.map( user => (
                        <li key={user._id}>
                            <img src={user.avatar} alt="logo Tindev"/>
                            
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>
                            
                            <div className="button">
                                
                                <button type="button" onClick={() => handleDeslike(user._id)}>
                                    <img src={deslike} alt="deslike"/>
                                </button>

                                <button type="button" onClick={() => handleLike(user._id)}>
                                    <img src={like} alt="like"/>
                                </button>
                            </div>

                        </li>
                        ) )
                }
            </ul>

        </div>
    )
}

export default Main