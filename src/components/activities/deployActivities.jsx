import React from 'react'
import { useState } from 'react'
const deployActivities = ({activity}) => {
    const [Visible, setVisible] = useState(false)
  return (
    <>
    <div onClick={() => setVisible(!Visible)} className={`activity table`}>
        <p>{activity.task.room.project.name}</p>
        <p>{activity.description}</p>
        <p>{activity.createdAt}</p>
        <p>{activity.user.firstName}</p>
    </div>
</>
  )
}

export default deployActivities