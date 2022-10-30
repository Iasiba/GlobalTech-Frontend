import React from 'react'
import './activities.css'
import DeployAtivity from './deployActivities'
import AxiosGetHook from '../../hooks/axiosGetHook'
const activities = ({taskId}) => {
    const AllActivity = AxiosGetHook(taskId?`http://localhost:8000/api/v1/tasks/${taskId}/activities`:'http://localhost:8000/api/v1/activities')
    const AllActivities = taskId? AllActivity.data?.data:AllActivity.data.data?.activities

    return (
        <div>
            <div className='activitiesHeader tableHeader'>
                <p>Proyecto</p>
                <p>Description</p>
                <p>fecha</p>
                <p>Tecnico</p>
            </div>
            {
                AllActivities && AllActivities?.map(activity => {
                    return (<DeployAtivity key={activity.id} activity={activity} />)
                })
            }
        </div>
    )
}

export default activities