import React from 'react'
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
// import styles from './Profilepic.module.css'
import profile from "../../Assets/identicon.png";
function Profilepic() {
    const avatar = createAvatar(initials, {
        dataUri: true,
        size: 128
      });
      
  return (

      <img  src={avatar} alt={profile} height="100px" width="100px"/>
    
  )
}

export default Profilepic
