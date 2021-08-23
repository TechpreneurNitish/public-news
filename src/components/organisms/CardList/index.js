import React, { useEffect } from 'react'
import Card from '../Card'
import './CardList.css'
import NoRecordsFound from '../../atoms/NoRecordsFound'
function CardList({ cardList = [] }) {
    return (
        <>
            {cardList.length > 0 ? (
                <div className="cardContainer">
                    {cardList?.map((data, index) => (
                        <Card data={data} key={index} />
                    ))}
                </div>
            ) : (
                <NoRecordsFound />
            )}
        </>
    )
}

export default CardList
