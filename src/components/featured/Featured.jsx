import React from 'react';
import styles from './featured.module.css';
import Image from 'next/image';

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className="styles.title">
        <b>Hey Everyone!</b></h1>
        <div className={styles.post}>
          <div className={styles.imgContainer}>
            <Image src="/p1.jpeg" alt="" fill className={styles.image}/>
          </div>
          <div className={styles.textContainer}>
            <h1 className={styles.postTitle}>Find something new!</h1>
            <p className={styles.postDescription}>
            MyBlog App is a user-friendly and feature-rich blogging platform designed to empower individuals and businesses to share their thoughts, experiences, and expertise with the world. With an intuitive interface and customizable design options, users can easily create and manage their own blogs, expressing themselves through text, images, and multimedia content.
            </p>
            {/* <button className={styles.button}>Read More</button> */}
          </div>
        </div>
    </div>
  )
}

export default Featured