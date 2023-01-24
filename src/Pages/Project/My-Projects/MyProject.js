import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProjectContainer from '../../../Components/ProjectContainer/ProjectContainer';
import styles from './MyProject.module.css'

const MyProject = (props) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    axios.defaults.baseURL = 'https://codegram-be.vercel.app/api';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    const AUTH = window.localStorage.getItem('auth-token');
    if (AUTH && AUTH !== undefined && AUTH.length > 0) {
      axios.defaults.headers.common['auth-token'] = AUTH;
    }
    (async () => {
      try {
        const res = await axios.get(`project/userProjects`)
        setData([...res.data])
        console.log(res.data)
      } catch (error) {
        window.alert(`${error.response.data.err || 'An error occured'}`)
        console.log(error)
      }
    })()
    setLoading(false)
  }, []);

  return (
    <div className={`${styles.main_div} my-4 mx-5`}>
      <h1 className='text-center'>YOUR PROJECTS</h1>
      {loading && <CircularProgress className="mx-auto d-block" color="inherit" />}
      {data.map((ele) => {
        return <ProjectContainer key={ele.pid} {...ele} />
      })}
    </div>
  )
}

export default MyProject