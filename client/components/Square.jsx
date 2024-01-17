import React from 'react';
import DOMPurify from 'dompurify';


export default function (props) {

    console.log('props.number', props.number.type)

    // prod.number.prod_image && console.log()

    // const parser = new DOMParser()


    let id = ''
    let svg;
    let sanitizedSvg;

    if (props.number.type === 0) {
        id = 'aisle'
    } else if (props.number.type === 1) {
        id = 'shelf'
    } else if (props.number.type === 2) {
        id = 'product'
        sanitizedSvg = DOMPurify.sanitize(props.number.prod_image, { USE_PROFILES: { svg: true } });


        // svg = parser.parseFromString(props.number.prod_image, "image/svg+xml")
        // const htmlObj = { __html: prod.number.prod_image }
    } else if (props.number.type === 3) {
        id = 'path'
    }

    console.log('svg: ', svg)


    return (

        <div className='box' id={id} >
            {props.number.type === 2 && <div id='svg' dangerouslySetInnerHTML={{ __html: sanitizedSvg }} />}





            {props.number.type === 3 && <div id='circle'></div>}

        </div >
    )


}