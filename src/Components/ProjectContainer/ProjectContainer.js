import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
// import Box from "@mui/material/Box";
// import styles from "./ProjectContainer.module.css";
function ProjectContainer(props) {
  return (

    <Card sx={{ width: '100%', m: 2, height: 120, square: true }} className=" mx-auto">
      <CardContent>
        <Typography
          className="d-flex flex-row flex-fill justify-content-between"
          component={'div'}
          sx={{ fontSize: 18, margin: "auto" }}
          color="#8400fd"
          gutterBottom
        >
          <Link to={`/project/view?pid=${props.pid}`} style={{ fontWeight: "600", textDecoration: 'none' }}> {props.name}</Link>
          <Stack direction="row" className="flex-wrap" spacing={1}>
            <Chip
              sx={{ fontFamily: "var(--font-primary)", fontWeight: "600", backgroundColor: "#89FF84" }}
              label={`${props.status}`}
            /></Stack>
        </Typography>

        <Typography component={'div'} variant="body2" className="mt-2" sx={{ fontFamily: "var(--font-primary)" }}>
          {props.description?.slice(0, 25)}
        </Typography>
        <Typography sx={{ mb: 1.5 }} component={'div'}
          className="mt-2" color="text.secondary">
          <span className="badge " style={{ backgroundColor: "var( --color-primary-light)", color: 'black' }}>{props.domain}</span>
        </Typography>
      </CardContent>
    </Card>

  );
}

export default ProjectContainer;
