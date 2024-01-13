import React from 'react'
import Square from './Square.jsx'

export default function Row(props) {

    const boxes = props.row.map(square => {
        return <Square number={square} />
    })


    return (
        <div className='row'>
            {boxes}
        </div>

    )

}