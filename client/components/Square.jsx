import React from 'react'

export default function (props) {


    let id = ''
    if (props.number === 0) {
        id = 'aisle'
    } else if (props.number === 1) {
        id = 'shelf'
    } else if (props.number === 2) {
        id = 'product'
    }


    return (
        <div className='box' id={id}>
            {props.number === 2 && '🌮'}

        </div>
    )


}