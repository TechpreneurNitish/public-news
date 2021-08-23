import { Button } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import SearchBar from '../../components/molecules/SearchBar'
import Card from '../../components/organisms/Card'
import CardList from '../../components/organisms/CardList'
import './Home.css'

function Home() {
    const [input, setInput] = useState('')
    const [articleListDefault, setArticleListDefault] = useState()
    const [cardList, setCardList] = useState()
    const [language, setLanguage] = useState('en')
    const [itemsToShow, setItemsToShow] = useState(3)

    const fetchData = async () => {
        return await fetch(
            `https://gnews.io/api/v4/top-headlines?token=291742be1da2dc9dac8d136c0fb804a8&lang=${language}&max=${itemsToShow}&page=1`,
        )
            .then((response) => response.json())
            .then((data) => {
                setCardList(data.articles)
                setArticleListDefault(data.articles)
            })
    }

    const updateInput = async (input) => {
        const filtered = articleListDefault?.filter((data) => {
            return data.title.toLowerCase().includes(input.toLowerCase())
        })
        setInput(input)
        setCardList(filtered)
    }

    useEffect(() => {
        fetchData()
    }, [language, itemsToShow])

    return (
        <div className="home container mt-3">
            <Button onClick={() => setLanguage('en')}>English</Button>
            <Button onClick={() => setLanguage('ru')}>Russian</Button>
            <Button onClick={() => setLanguage('ja')}>Japanese</Button>
            <SearchBar keyword={input} setKeyword={updateInput} />
            <CardList cardList={cardList} />
            <Button className="m-3" onClick={() => setItemsToShow(itemsToShow + 3)}>
                Load More
            </Button>
        </div>
    )
}

export default Home
