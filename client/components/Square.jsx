import React from 'react';
import DOMPurify from 'dompurify';


export default function ({ details }) {

    const { prod_image, type } = details

    let id = ''
    let sanitizedSvg;


    switch (type) {
        case 0:
            id = 'aisle';
            break;
        case 1:
            id = 'shelf';
            break;
        case 2:
            id = 'product';
            sanitizedSvg = DOMPurify.sanitize(prod_image, { USE_PROFILES: { svg: true } });
            break;
        case 3:
            id = 'path';
            break;
    }


    return (

        <div className='box' id={id} >
            {type === 2 && <div id='svg' dangerouslySetInnerHTML={{ __html: sanitizedSvg }} />}

            {type === 3 &&
                <>

                    <div className='pathRow'>
                        <div className='lineBox' ></div>
                        <div className='lineBox' id='t'></div>
                        <div className='lineBox' ></div>
                    </div>
                    <div className='pathRow'>
                        <div className='lineBox' id='l'></div>
                        <div className='lineBox' id='c'></div>
                        <div className='lineBox' id='r'></div>
                    </div>
                    <div className='pathRow'>
                        <div className='lineBox' ></div>
                        <div className='lineBox' id='b'></div>
                        <div className='lineBox'></div>
                    </div>
                </>


            }


        </div >
    )


}