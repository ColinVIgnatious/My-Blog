"use client"
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import "react-quill/dist/quill.bubble.css";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Quill = ({styles,value,setValue}) => {
    const[mounted,setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
      
    }, [])
    if (!mounted) return null 
  return (
    <ReactQuill className={styles.textArea}theme="bubble" value={value} onChange={setValue} placeholder="Type your thoughts.."/>
  )
}

export default Quill