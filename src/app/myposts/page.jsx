
import styles from "../homepage.module.css";
import Link from 'next/link'

import CardList from "@/components/myposts/CardList";



export default function Home({searchParams}) {
  const page = parseInt(searchParams.page) || 1;
  return (
  <div className={styles.container}>
   
        <div className={styles.content}>
          <CardList page={page}/>
          
        </div>

    
  </div>
)}
