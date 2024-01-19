import React from 'react';

export default function ProductEntry(props) {


    function correctCase(input) {
        const first = input[0].toUpperCase()
        const last = input.slice(1).toLowerCase()
        console.log('first, last', first, last)
        return first + last

    }

    return (
        <div onClick={() => props.toggle(props.id)} className='productContainer' id={props.listed ? 'onList' : 'offList'}>
            <div> {correctCase(props.name)}</div>
            <div id='symbol'>{props.listed ? '-' : '+'}</div>
        </div>


    )

}