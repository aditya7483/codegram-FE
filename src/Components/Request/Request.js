import React, { useState } from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import styles from './Request.module.css';
import Box from "@mui/material/Box";

function Request(props) {
  const[count,setCount]=useState(0);
  const [color,setColor]=useState('success')
  const handleclick=()=>{
    setCount(1);
    setColor('danger');
    if(count===1){setCount(0); setColor('success')}
  }
  return (
    <div>
      <Card sx={{ width: '75%', m: 2,  height:100, square: true }} >
        <CardContent  className="d-flex flex-row ">
        <div
            className={`${styles.user_profile_pic} mt-2 `}
            style={{
              backgroundImage: `url("https://avatars.dicebear.com/api/initials/.svg")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div><Box className={`${styles.main_div} d-flex flex-row justify-content-between`}>
        <Typography component={'div'}
              sx={{ fontSize: 18 }}
              color="#8400fd"
              gutterBottom
            >
              <Link to="/profile"> Username</Link>
            </Typography>
        <div><button type="button" className={`btn btn-${color}`}  onClick={handleclick}>{count===0?"accept":"Remove"}</button></div></Box>
        </CardContent>
      </Card>
     
    </div>
  )
}

export default Request
