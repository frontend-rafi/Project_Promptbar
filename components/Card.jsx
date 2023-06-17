'use client';

import React from 'react'
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";


function Card({key,post,handleTagClick , handleEdit,handleDelete}) {

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
 //! state for copy text
 const [copiedText,setCopiedText]=useState("");
  //! func for copy text
 const handleCopy=()=>{
setCopiedText(post.prompt);
navigator.clipboard.writeText(post.prompt)
setTimeout(()=>
  setCopiedText(""), 3000
);
 }

 const handleProfileClick = () => {
  console.log(post);

  if (post.creator._id === session?.user.id) return router.push("/profile");

  router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
};



  return (
    <div className="prompt_card">
  <div className="flex justify-between items-start gap-5">
    <div 
    onClick={handleProfileClick}
    key={key} className="flex flex-1 justify-start item-center gap-3 cursor-pointer">
   
    <Image
            src={post?.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

<div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator?.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post?.creator?.email}
            </p>
          </div>
    
    </div>
    <div className="copy_btn" onClick={handleCopy }>
<Image
src= {copiedText === post.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
width={12}
height={12}

/>
    </div>
  </div>
  <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
  <p  
  onClick={()=> handleTagClick && handleTagClick(post?.tag)}
  className='font-inter text-sm blue_gradient cursor-pointer'>#{post?.tag}</p>

  {
session?.user.id === post.creator?._id && pathName === "/profile" &&(
  <div className='flex flex-end gap-7 mt-5 border-t border-grey-100'>
    <p 
    className="font-inter text-sm green_gradient cursor-pointer"
    onClick={handleEdit}
    >Edit</p>
    <p  className="font-inter text-sm orange_gradient cursor-pointer"
    onClick={handleDelete}>Delete</p>
  </div>
)
  }



      </div>
  )
}

export default Card