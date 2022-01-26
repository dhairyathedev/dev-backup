import { Button, Input, Spacer } from '@nextui-org/react';
import {useState} from 'react';
import swal from 'sweetalert';
import { nanoid } from "nanoid"
import { Octokit } from "@octokit/core"


export default function InputComponent() {
    const [token, setToken] = useState("")
  const [repo, setRepo] = useState("")
  const [username, setUsername] = useState("")
  const [post, setPost] = useState("")
  const path = nanoid(18)
  const pushCode = async (data, msg) => {
    const octokit = new Octokit({ auth: token })
    // console.log('"' + data + '" converted to Base64 is "' + btoa(unescape(encodeURIComponent(data)) + '"'));
    const bs64 = btoa(unescape(encodeURIComponent(data)))
    
    await octokit.request(`PUT /repos/${username}/${repo}/contents/${path}.md`, {
      owner: username,
      repo: repo,
      path: 'path',
      message: `backup: ${msg}`,
      content: bs64,
  }).then(res => {
      console.log(res.status)
      if(res.status === 200 || res.status ===  201) {
        swal("Success", "Backup created", "success")
      }else{
        swal("Error", "Check your GitHub Information", "error")
      
      }
  }).catch(err => {
    console.log(err)
    swal("Error", "Invalid GitHub Information", "error")
  })
  }
  const getData = async (e) => {
    e.preventDefault()
    const form = document.getElementById("form")
    const slug = post.split("/")[1]
    await fetch(`https://dev.to/api/articles/${slug}`)
    .then(res => {
      if(res.status === 200){
        return res.json()
      }else{
        swal("Error", "Post has not been backed up. Invalid information", "error")
      }
    })
    .then(data => {
      // console.log(data)
      pushCode(data.body_markdown, data.title)
      document.querySelector("form").reset();
    }).then((value) => {
      if(value){
        form.reset();
      }else{
        console.log(value)
      }
    })
  }
  return <div className='container'>
    <form onSubmit={getData} id="form">
    <Input clearable bordered labelPlaceholder="GitHub Repository" initialValue="hello-world" width='100%' required onChange={e=>setRepo(e.target.value)} value={repo}/>
    <Spacer y={2.5} />
    <Input clearable bordered labelPlaceholder="GitHub Username" initialValue="octocat" width='100%' required onChange={e=>setUsername(e.target.value)} value={username}/>
    <Spacer y={2.5} /> 
    <Input clearable bordered labelPlaceholder="DEV Post" initialValue="codewithsnowbit/animate-checkbox-in-react-30l0" width='100%' required onChange={e=>setPost(e.target.value)} value={post}/>
    <Spacer y={2.5} />
    <Input clearable bordered labelPlaceholder="Personal Access Token" initialValue="XXXXXX-XXXX-XXX" width='100%' required onChange={e=>setToken(e.target.value)} value={token}/>
    <Spacer y={1.5} />
    <Button shadow color="success" auto type='submit'>
        Submit
    </Button>
    </form>
  </div>;
}
