import React from 'react'

export default function (props) {

    console.log('props.number', props.number.type)

    // prod.number.prod_image && console.log()


    let id = ''
    if (props.number.type === 0) {
        id = 'aisle'
    } else if (props.number.type === 1) {
        id = 'shelf'
    } else if (props.number.type === 2) {
        id = 'product'
    } else if (props.number.type === 3) {
        id = 'path'
    }


    return (
        <div className='box' id={id}>
            {props.number.type === 2 && props.number.prod_image}
            {props.number.type === 3 && <div id='circle'></div>}

        </div>
    )


}