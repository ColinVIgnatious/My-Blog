// import Menu from '@/components/Menu/Menu'
// import Image from 'next/image'
// import React from 'react'
// import styles from './singlePage.module.css'
// import Comments from '@/components/comments/Comments'

// const getData = async (slug) => {
//     const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
//       cache: "no-store",
//     });
  
//     if (!res.ok) {
//       throw new Error("Failed");
//     }
  
//     return res.json();
  
//   };
// const SinglePage = async ({params}) => {
//     const {slug} =params;
//     const data=await getData(slug)
//   return (
//     <div className={styles.container}>
//         <div className={styles.infoContainer}>
//         <div className={styles.textContainer}>
//             <h1 className={styles.title}>{data?.title}</h1>
//             <div className={styles.user}>
//                 {data?.user?.image && (<div className={styles.userImageContainer}>
//                 <Image src={data.user.image} alt="" fill className={styles.image} />
//                 </div>)}
//                 <div className={styles.userTextContainer}>
//                     <span className={styles.username}>{data?.user.name}</span>
//                     <span className={styles.date}>{data.createdAt.substring(0,10)}</span>
//                 </div>
//             </div>
//         </div>
//         {data?.img && <div className={styles.imageContainer}>
//             <Image src={data.img} alt="" fill className={styles.image} />
//         </div>}
//         </div>
//         <div className={styles.content}>
//         <div className={styles.post}>
//         <div className={styles.description} dangerouslySetInnerHTML={{__html:data?.desc}}/>
            
//             <div className={styles.comment}>
//                 <Comments postSlug={slug}/>
//             </div>
//         </div>
//         {/* <Menu/> */}
//         </div>
//     </div>
//   )
// }

// export default SinglePage
"use client"
import { useState, useEffect } from 'react';
import Menu from '@/components/Menu/Menu';
import Image from 'next/image';
import React from 'react';
import styles from './singlePage.module.css';
import Comments from '@/components/comments/Comments';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

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
  const [likeStatus, setLikeStatus] = useState(false);
  const [data, setData] = useState(null);
  const {status}=useSession();
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

  const handleLike = async () => {
    try {
      console.log(slug);
      const response = await fetch(`/api/like/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
      });
  
      if (response.ok) {
        setLikeStatus(true);
      } else {
        console.error('Failed to like post');
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
  
  const handleUnlike = async () => {
    try {
      const response = await fetch(`/api/unlike/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (response.ok) {
        setLikeStatus(false);
      } else {
        console.error('Failed to unlike post');
      }
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  };
  

  

  if (!data) {
    // Return loading state or handle accordingly
    return <p>Loading...</p>;
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
          {status === "authenticated" ? (
       <div className={styles.likeButtons}>
       {!likeStatus ? (
         <button onClick={handleLike}>Like</button>
       ) : (
         <button onClick={handleUnlike}>Unlike</button>
       )}
     </div>
    ):(<Link href="/login">Please LogIn to like the post</Link>)}
          

          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
        {/* <Menu/> */}
      </div>
    </div>
  );
};

export default SinglePage;
