import React, { useEffect, useState } from 'react'
import './activities.css'
import DeployAtivity from './deployActivities'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
const activities = ({ taskId, myhome, home }) => {
    const [AllActivity, setAllActivity] = useState('')
    useEffect(() => searcActivities(), [])
    function searcActivities() {
        let url = 'http://localhost:8000/api/v1/activities'//!home && !myhome && !taskId
        if (home) url = 'http://localhost:8000/api/v1/activities'
        if (myhome) url = `http://localhost:8000/api/v1/users/me/activities`
        if (taskId) url = `http://localhost:8000/api/v1/tasks/${taskId}/activities`

        axios.get(url, getConfig())
            .then(res => {

                if (res.data?.data?.activities) {
                    setAllActivity(res.data.data.activities)
                } else {
                    if (res.data?.activities) {
                        if (home) {
                            const date = new Date()
                            const day = date.getDate() < 10 ? "-0" + date.getDate() : date.getDate()
                            const month = date.getMonth() < 10 ? "-0" + (1 + date.getMonth()) : (1 + date.getMonth())
                            const today = date.getFullYear() + month + day
                            const aux = []
                            res.data.activities.map(activity => { if (activity.createdAt === today) { aux.push(activity) } })
                            setAllActivity(aux)
                        } else {
                            setAllActivity(res.data.activities)
                        }
                    } else {
                        setAllActivity(res.data)
                    }

                }
                /*
                console.log(res)
                if (home) setAllActivity(res.data.activities)
                if (myhome) setAllActivity(res.data)
                if (taskId) setAllActivity(res.data.data.activities)
                if (!home && !myhome && !taskId) setAllActivity(res.data.activities)*/
            })
    }
    return (
        <div className='contentDeploy'>
            <div className={`${!myhome && "activitiesHeader"} tableHeader ${myhome && "myHomeActivityHeader"}`}>
                <p>fecha</p>
                <p>Proyecto</p>
                <p>Description</p>
                {!myhome && <p>Tecnico</p>}
            </div>
            {
                AllActivity && AllActivity?.map(activity => {
                    return (
                        <DeployAtivity
                            key={activity.id}
                            activity={activity}
                            searcActivities={searcActivities}
                            myhome={myhome}
                        />
                    )
                })
            }
        </div>
    )
}

export default activities