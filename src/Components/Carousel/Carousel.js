import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import styles from './Carousel.module.css'
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import gsap from 'gsap';
const Carousel = (props) => {

  const [current, setCurrent] = useState({});
  const [count, setCount] = useState(0);
  const carouselRef = useRef()
  let timeoutFunc = null

  timeoutFunc = setTimeout(() => {
    setCount((count + 1) % props.elements?.length)
  }, 4000);

  useEffect(() => {
    setCurrent(props.elements[count])

    return () => clearTimeout(timeoutFunc)
  }, [count]);



  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      // use scoped selectors
      gsap.from(".heading_anim", { y: 35, opacity: 0.4 })
     gsap.from(".para_anim", { y: 35, opacity: 0.4 })


      gsap.to(".heading_anim", { y: 0, duration: 0.8, delay: 0.7, opacity: 1 })
      gsap.to(".para_anim", { y: 0, duration: 0.8, delay: 3, opacity: 1 })

      // or refs
      // gsap.to(circle.current, { rotation: 360 });

    }, carouselRef);

    return () => ctx.revert();
  }, [count]);



  return (
    <div className={`${styles.carousel_container} d-flex flex-column align-items-center position-relative`} ref={carouselRef}>
      {/* <div
        className={`${styles.arrow_div} ${styles.arrow_left}`}
        onClick={() => {
          setCount((count + 1) % props.elements?.length)
        }}
      >
        <ArrowBackIosIcon sx={{ color: 'white' }} />
      </div>
      <div className={`${styles.arrow_div} ${styles.arrow_right}`} onClick={() => { setCount(count !== 0 ? ((count - 1) % props.elements?.length) : (props.elements.length - 1)) }}>
        <ArrowBackIosIcon sx={{ color: 'white' }} />
      </div> */}
      <div className={`${styles.icon_div}`} key={current.heading}>
        {
          current.Icon && <current.Icon {...current.iconProps} />
        }
      </div>
      <h2 className={`${styles.heading} text-center heading_anim`}>{current.heading}</h2>
      <p className={`${styles.para} text-center para_anim`}>{current.para}</p>
    </div>
  )
}

export default Carousel