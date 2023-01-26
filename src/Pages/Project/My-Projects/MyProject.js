import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProjectContainer from '../../../Components/ProjectContainer/ProjectContainer';
import styles from './MyProject.module.css'
import DefaultMessage from '../../../Components/DefaultMessage/DefaultMessage';

const MyProject = (props) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  axios.defaults.baseURL = 'https://codegram-be.vercel.app/api';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  const AUTH = window.localStorage.getItem('auth-token');
  if (AUTH && AUTH !== undefined && AUTH.length > 0) {
    axios.defaults.headers.common['auth-token'] = AUTH;
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`project/userProjects`)
      setData([...res.data])
    } catch (error) {
      window.alert(`${error.response.data.err || 'An error occured'}`)
      console.log(error)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className={`${styles.main_div} my-4 mx-5`}>
      <h1 className='text-center'>YOUR PROJECTS</h1>
      {loading ? (
              <CircularProgress color="inherit" className="mx-auto d-block" />
            ) :data.length === 0 ? (
              <div className="d-flex flex-column align-items-center my-4">
              <DefaultMessage/></div>
            ) :data.map((ele) => {
        return <ProjectContainer key={ele.pid} {...ele} />
      })}
    </div>
  )
}

export default MyProject