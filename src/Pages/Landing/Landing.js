import React from "react";
import Carousel from "../../Components/Carousel/Carousel";
import styles from "./Landing.module.css";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import GroupsIcon from "@mui/icons-material/Groups";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Landing = () => {
  const elements = [
    {
      Icon: ExitToAppIcon,
      heading: "JOIN",
      para: "Your codegram account can be linked to your resume, and you'll get that edge with your fellow competitors.",
      iconProps: {
        sx: { fontSize: 40, color: "white" },
      },
    },
    {
      Icon: GroupsIcon,
      heading: "CONNECT",
      para: "We're here to help you find your perfect companion. With our easy-to-use search function, you can search for a partner who shares your interests and values.",
      iconProps: {
        sx: { fontSize: 40, color: "white" },
      },
    },
    {
      Icon: CreateNewFolderIcon,
      heading: "CREATE",
      para: "Create scalable projects with real time status tracking",
      iconProps: {
        sx: { fontSize: 40, color: "white" },
      },
    },
  ];

  return (
    <>
      <Helmet>
        <title>CodeGram | Home</title>
      </Helmet>
      <div className={`${styles.main_div} mt-5`}>
        <div className={`${styles.header_div} mx-auto`}>
          <h1 className={`text-center ${styles.heading_primary} mb-4`}>
            Welcome to CodeGram
          </h1>
          <p className={`text-center ${styles.para_primary} my-3 mb-5`}>
            Have you ever had an idea which you have personally felt is
            scalable, but never had the right set of people to guide and assist
            you? or were you never really able to muster the courage to ask for
            help? CODEGRAM is all about bringing those ideas to fruition and
            hopefully making them a big success!
          </p>

          <Link to="/Search" className="nav-link my-4" href="#search">
            <button className={` btn_prim mx-auto d-block ${styles.btn_prim}`}>
              Explore
            </button>
          </Link>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className={`${styles.lines} ${styles.lines_left}`}>
            <div className={`${styles.line1}`}></div>
            <div className={`${styles.line1}`}></div>
          </div>
          <div className={`${styles.lines} ${styles.lines_right}`}>
            <div className={`${styles.line1}`}></div>
            <div className={`${styles.line1}`}></div>
          </div>
        </div>

        <div className={`${styles.carousel_div}`}>
          <Carousel elements={elements} />
        </div>
      </div>
    </>
  );
};

export default Landing;
