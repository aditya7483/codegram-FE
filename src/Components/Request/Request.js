import React, { useState } from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import axios from 'axios';

function Request(props) {

  const [color, setColor] = useState('primary');

  axios.defaults.baseURL = 'https://codegram-be.vercel.app/api';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  const AUTH = window.localStorage.getItem('auth-token');
  if (AUTH && AUTH !== undefined && AUTH.length > 0) {
    axios.defaults.headers.common['auth-token'] = AUTH;
  }

  const handleclick = async () => {
    setColor('secondary')
    try {
      const res = await axios.post(`project/acceptRequest/${props.pid}/${props.username}`)
    } catch (error) {
      window.alert(`An error occured`)
    }
  }
  return (
    <div>
      <Card sx={{ Width: 6, m: 2, height: 70, square: true }}>
        <CardContent className="d-flex flex-row justify-content-between">
          <Typography component={'div'}
            sx={{ fontSize: 18 }}
            color="#8400fd"
            gutterBottom
          >
            <Link style={{ textDecoration: 'none' }}> {props.username}</Link>
          </Typography>
          {!props.accepted && <div>
            <button type="button" className={`btn btn-${color}`} onClick={handleclick}>accept</button>
          </div>}
        </CardContent>
      </Card>

    </div>
  )
}

export default Request
