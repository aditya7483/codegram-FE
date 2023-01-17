import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import styles from "./ProjectContainer.module.css";
function ProjectContainer() {
  return (
    
      <Card sx={{ Width: 10, m: 2, height: 150, square: true }}>
        <CardContent>
          <Typography
            sx={{ fontSize: 18, margin: "auto" }}
            color="#8400fd"
            gutterBottom
          >
            ProjectTitle
          </Typography>

          <Typography variant="body2" className="mt-2">
            Project based on react.js
          </Typography>
          <Typography sx={{ mb: 1.5 }} className="mt-2" color="text.secondary">
            <span className="badge bg-secondary">c++</span>
          </Typography>
        </CardContent>
      </Card>
    
  );
}

export default ProjectContainer;
