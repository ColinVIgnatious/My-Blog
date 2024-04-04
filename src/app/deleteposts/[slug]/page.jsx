"use client";
import { useState, useEffect } from 'react';
import Menu from '@/components/Menu/Menu';
import Image from 'next/image';
import React from 'react';
import styles from './singlePage.module.css';
import Comments from '@/components/comments/Comments';

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed');
  }

  return res.json();
};

const SinglePage = ({ params }) => {
  const { slug } = params;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(slug);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [slug]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/deleteposts/${slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Redirect to a different page after successful deletion
        window.location.href = '/myposts'; // Replace with the actual page you want to redirect to
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (!data) {
    // Return loading state or handle accordingly
    return <p>Post has been deleted</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image src={data.user.image} alt="" fill className={styles.image} />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user.name}</span>
              <span className={styles.date}>{data.createdAt.substring(0, 10)}</span>
            </div>
          </div>
        </div>
        {data?.img && (
          <div className={styles.imageContainer}>
            <Image src={data.img} alt="" fill className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: data?.desc }} />

          <div className={styles.deleteButtons}>
            
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
