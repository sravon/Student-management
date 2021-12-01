import React from 'react'

export default function Message(props) {
    return (
        <div className={props.color + " text-white p-2 my-2"}>
            {props.msg}
        </div>
    )
}
