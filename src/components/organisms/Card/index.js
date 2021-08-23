import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import PrimaryButton from '../../atoms/PrimaryButton'
import './Card.css'
import { Link } from 'react-router-dom'
import moment from 'moment'

function Card(props) {
    const data = props.data
    const [like, setLike] = useState(false)
    const [hide, setHide] = useState(false)

    useEffect(() => {
        const getLike = localStorage.getItem('like')
        if (getLike) {
            setLike(JSON.parse(getLike))
        }
    }, [setLike])

    useEffect(() => {
        localStorage.setItem('like', JSON.stringify(like))
    }, [like])

    return (
        <div className={`card ${hide && 'd-none'}`}>
            <img src={data.image} alt={data.title} />
            <h3>{data.title}</h3>
            <div className="articleSource">
                <a href={data.source.url} target="_blank">
                    {data.source.name}
                </a>
                <h5>{moment(data.publishedAt).format('MMMM Do YYYY, h:mm:ss a')}</h5>
            </div>
            <div className="cardPrimAct">
                <Button onClick={() => setLike(!like)} className={like && 'active'}>
                    <span className="material-icons">thumb_up</span>
                </Button>
                <Button onClick={() => setHide(!hide)}>
                    <span className="material-icons">delete</span>
                </Button>
                <PrimaryButton
                    onClick={() => window.open(data.url)}
                    label="View article"
                    btnSize="small"
                />
            </div>
        </div>
    )
}

export default Card
