import React from 'react';
import DOMPurify from 'dompurify';


export default function ({ details }) {

    const { prod_image, type } = details

    let id = ''
    let sanitizedSvg;

    if (type === 0) {
        id = 'aisle'
    } else if (type === 1) {
        id = 'shelf'
    } else if (type === 2) {
        id = 'product'
        sanitizedSvg = DOMPurify.sanitize(prod_image, { USE_PROFILES: { svg: true } });
    } else if (type === 3) {
        id = 'path'
    }

    return (

        <div className='box' id={id} >
            {type === 2 && <div id='svg' dangerouslySetInnerHTML={{ __html: sanitizedSvg }} />}

            {type === 3 && <div id='circle'></div>}

        </div >
    )


}