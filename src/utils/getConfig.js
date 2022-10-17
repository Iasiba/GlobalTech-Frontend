const getConfig = () => ({
  headers: {
    //Authorization: `Bearer ${localStorage.getItem('token')}`
    Authorization: `JWT ${localStorage.getItem('token')}`
  }
})

export default getConfig