import React from 'react';

export default function ProductEntry(props) {




    return (
        <div onClick={() => props.toggle(props.id)} className='productContainer'>
            {props.name}
        </div>


    )

}