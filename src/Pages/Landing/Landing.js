import React from 'react'
import Carousel from '../../Components/Carousel/Carousel'
import styles from './Landing.module.css'
import CodeIcon from '@mui/icons-material/Code';
import TerminalIcon from '@mui/icons-material/Terminal';
import GroupIcon from '@mui/icons-material/Group';
import { Helmet } from 'react-helmet';
const Landing = () => {
  
  const elements = [
    {
      Icon: CodeIcon,
      heading: 'Coding',
      para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem neque reprehenderit ratione velit expedita!',
      iconProps: {
        sx: { fontSize: 40, color: 'white' }
      }
    },
    {
      Icon: GroupIcon,
      heading: 'Connection',
      para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem neque reprehenderit ratione velit expedita!',
      iconProps: {
        sx: { fontSize: 40, color: 'white' }
      }
    },
    {
      Icon: TerminalIcon,
      heading: 'Web',
      para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem neque reprehenderit ratione velit expedita!',
      iconProps: {
        sx: { fontSize: 40, color: 'white' }
      }
    },
  ]
  return (
    <><Helmet>
    <title>CodeGram | Home</title>
  </Helmet>
    <div className={`${styles.main_div} mt-5`}>
      <div className={`${styles.header_div} mx-auto`}>
        <h1 className={`text-center ${styles.heading_primary}`}>Welcome to CodeGram</h1>
        <p className={`text-center ${styles.para_primary} mt-3`}>Lorem ipsum dolor sit,Lorem ipsum dolor sit amet consectetur adipisicing elit. Est voluptate neque in veritatis quas! amet consectetur adipisicing elit. Atque architecto illum rem maxime omnis?</p>
        <p className={`text-center ${styles.para_primary} mt-5`}>Lorem ipsum dolor sit, elit.</p>
        <button className={` btn_prim mx-auto d-block ${styles.btn_prim}`}>
          Explore
        </button>
      </div>

      <div className='d-flex justify-content-between align-items-center'>
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
  )
}

export default Landing