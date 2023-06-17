'use client';

import React, { useEffect, useState } from 'react'
import Card from './Card';


const  PromptCardList = ({data,handleTagClick})=>{
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <Card
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );

}




const Feed = () => {
  const [searchInput,setSearchInput]=useState("");
 const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);


const [posts,setPosts] =useState([])
useEffect(() => {
const fetchPost = async()=>{
  const res= await fetch("/api/prompt");
  const data = await res.json();
  setPosts(data)
}


fetchPost();

}, []);

// searching functionality

const filteredPrompt = (searchInput)=>{
const regex = new RegExp(searchInput,'i');// i flag for case-insensitive search

return posts.filter((item)=>(
regex.test(item.creator.username) ||
regex.test(item.tag) ||
regex.test(item.prompt) 
))
}

// changing the search input Text
// When the user types something into the search input field, the searchChange function is called


const searchChange=(e)=>{
  e.preventDefault()
clearTimeout();
setSearchInput(e.target.value);


//debouncing method
setSearchTimeout(
  setTimeout(() => {
    const searchResult = filteredPrompt(e.target.value);
    setSearchedResults(searchInput);
  }, 500)
)


}


const handleTagClick = (tagname) => {
setSearchInput(tagname);

const searchResult = filteredPrompt(tagname)
setSearchedResults(searchResult)
};





  return (
    <section className="feed">
      <form className ="relative w-full flex-center ">
        <input 
        type="text"
className=" search_input peer"
        placeholder='Search For a tag or a username'
        value={searchInput}
        required
        onChange={(e)=> setSearchInput(e.target.value) }
        />
      </form>
      
      {/* //all prompt */}
       {searchInput ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed
