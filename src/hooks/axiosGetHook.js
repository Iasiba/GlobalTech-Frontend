import { useEffect, useState } from 'react'
import axios from 'axios'
import getConfig from '../utils/getConfig'
const data=(url)=> {
  //console.log(url)
  const [data, setData] = useState('')
  useEffect( ()=>{
    axios.get(`${url}`, getConfig())
 .then(res=>setData(res) )
 .catch(err=> console.log(err))},[])
 return {data}
}
export default data