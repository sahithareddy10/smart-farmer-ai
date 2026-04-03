import { useState } from "react"

function CommunityFeed(){

const[post,setPost] = useState("")
const[posts,setPosts] = useState([])

const add = ()=>{

setPosts([...posts,post])
setPost("")

}

return(

<div className="card">

<h2>Farmer Community</h2>

<input
value={post}
onChange={(e)=>setPost(e.target.value)}
placeholder="Share farming advice"
/>

<button onClick={add}>Post</button>

<ul>

{posts.map((p,i)=>(
<li key={i}>{p}</li>
))}

</ul>

</div>

)

}

export default CommunityFeed