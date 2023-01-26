import React from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from './CoderContainer.module.css';
import { Link } from "react-router-dom";
function CoderContainer(props) {
  return (
    <>

      <Card sx={{ Width: 40, m: 2, height: 80, square: true }} >
        <CardContent className='d-flex flex-row p-0'>
          {/* <!-- remove border radius for square shaped pfp paddingB-24px --> */}

          <div
            className={`${styles.user_profile_pic} mt-2 `}
            style={{
              backgroundImage: `url("https://api.dicebear.com/5.x/pixel-art/svg?seed=${props.username}")`
            }}
          ></div>
          <div className='align-self-center'>
            <Typography component={'div'}
              sx={{ fontSize: 18 }}
              color="#8400fd"
              gutterBottom
            >
              <Link to="/profile" style={{ textDecoration: 'none' }}> {props.username}</Link>
            </Typography>

            {/* <Typography component={'div'} variant="body2" className="mt-2" gutterBottom>
              {props.desc}
            </Typography> */}
            {/* <Typography component={'div'} className="mt-2" color="text.secondary">
              skills
              <br />
              <span className="badge bg-secondary">{props.skill}</span>
            </Typography> */}
          </div>
        </CardContent>
      </Card>

    </>
  )
}

export default CoderContainer
