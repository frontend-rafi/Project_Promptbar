'use client';
import React from 'react'
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Profile from '@/components/Profile'
const UserProfile = ({params}) => {
    const searchParams = useSearchParams();
    const username= searchParams.get("name");
    const [usersPosts,setUsersPosts]=useState([]);

useEffect(() => {
const fetchPrompt = async()=>{
    const res = await fetch(`/api/users/${params?.id}/posts`);
    const data = await res.json();

    setUsersPosts(data)
}

if (params?.id) {
    fetchPrompt()
}
}, [params.id])



  return (
    <Profile
    name={username}
    desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
    data={usersPosts}
  />
  )
}

export default UserProfile
