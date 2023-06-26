import React, { useEffect, useState } from 'react'
import './activities.css'
import DeployAtivity from './deployActivities'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { useDispatch, useSelector } from 'react-redux'
import { setArea } from '../../store/slices/AreaSlice'
const activities = ({ taskId, myhome, home }) => {
    const dispatch = useDispatch()
    const Refresh = useSelector(state => state.Refresh)
    const [AllActivity, setAllActivity] = useState('')
    useEffect(() => searcActivities(), [Refresh, taskId, myhome, home])
    function searcActivities() {
        if (!taskId && !myhome && !home) dispatch(setArea("Actividades"))
        let url = 'http://192.168.0.253:8000/api/v1/activities'//!home && !myhome && !taskId
        if (home) url = 'http://192.168.0.253:8000/api/v1/activities'
        if (myhome) url = `http://192.168.0.253:8000/api/v1/users/me/activities`
        if (taskId) url = `http://192.168.0.253:8000/api/v1/tasks/${taskId}/activities`

        axios.get(url, getConfig())
            .then(res => {

                if (res.data?.data?.activities) {
                    setAllActivity(res.data.data.activities)
                } else {
                    if (res.data?.activities) {
                        if (home) {
                            const date = new Date()
                            const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
                            const month = date.getMonth() < 10 ? "0" + (1 + date.getMonth()) : (1 + date.getMonth())
                            const today = date.getFullYear() + '-' + month + '-' + day
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
            {/*<div className={`${!myhome && "activitiesHeader"} tableHeader ${myhome && "myHomeActivityHeader"}`}>
                <p>fecha</p>
                <p>Proyecto</p>
                {!myhome && <p>Tecnico</p>}
                <p>Description</p>
    </div>*/}
            {
                AllActivity && AllActivity?.map(activity => {
                    return (
                        <DeployAtivity
                            key={activity.id}
                            activity={activity}
                            myhome={myhome}
                        />
                    )
                })
            }
        </div>
    )
}

export default activities