"use client"

import { useRouter } from "next/navigation";
import styles from "./loginPage.module.css";
import { signIn,useSession } from 'next-auth/react';

const LoginPage = () => {
    const {data,status} = useSession()
    console.log(data,status);
    
    const router = useRouter();

    if(status === "isloading"){
        return <div className={styles.loading}>Loading...</div>
    }

    if(status === "authenticated"){
        router.push("/")
    }
      return (
    <div className={styles.container}>
         <div className={styles.wrapper}>
         <div className={styles.socialButton} onClick={()=>signIn("google")} >
          Sign in with Google
        </div>
         </div>
    </div>
  )
}

export default LoginPage