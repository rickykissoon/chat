import React, {useEffect, useState} from 'react';

interface ChatProps {
    contract: any;
}

const Chat = ({contract}: ChatProps) => {

    const [joined, setJoined] = useState(false);

    useEffect(() => {
        if(contract) {
          console.log(contract);
        }
      }, [contract]);

    /*const join = () => {
        console.log('attempt to join');
        setJoined(true);
    }*/

    return(
        <>
        {joined ? (
            <>
                <div className='container'>
                    <div>Users</div>
                </div>
                <div className='container'>
                    <div>Chat</div>
                </div>
            </>
        ) : (
            <>
                {/*<div className='container'>
                    <input type="text" placeholder="User Name"></input>
                    <button className='button' onClick={join}>Join</button>
        </div>*/}
            </>
        )}
        </>
    )
}

export default Chat;