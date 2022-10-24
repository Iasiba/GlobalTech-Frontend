import React from 'react'
const deployNotes = ({ note }) => {
    return (
        <>
            <div className={`table noteGrid`}>
                <p>{note.tittle}</p>
                <p>{note.note}</p>
            </div>
        </>
    )
}

export default deployNotes