import React, {useEffect, useState} from 'react';

interface JoinProps {
    setJoined: any;
    contract: any;
}

const Join = ({contract, setJoined}: JoinProps) => {

    const join = () => {
        console.log('attempt to join');
        setJoined(true);
    }
 
    return(
        <>
            <div className='container'>
                <input type="text" placeholder="User Name"></input>
                <button className='button' onClick={join}>Join</button>
            </div>
        </>
    )
}

export default Join;