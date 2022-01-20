import { useState } from "react"
import { Octokit } from "@octokit/core"
import { nanoid } from "nanoid"
import swal from 'sweetalert';
import Head from "next/head";

export default function Home() {
  // https://github.com/settings/tokens/new?scopes=repo
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
  })
  }
  const getData = async (e) => {
    e.preventDefault()
    const form = document.getElementById("form")
    await fetch(`https://dev.to/api/articles/${post}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data)
      pushCode(data.body_markdown, data.title)
      swal("Success", `Your post has been backed up. If you can't find the backup check your details and PAT`, "success")
      document.querySelector("form").reset();
    }).then((value) => {
      if(value){
        form.reset();
      }else{
        console.log(value)
      }
    })
  }
  return(
    <div className="container">
      <Head>
        <title>DEV Post Backup</title>
        <meta name="description" content="Backup your DEV.to posts directly to your GitHub repository" />
        <meta name="keywords" content="DEV, DEV.to, DEV.to backup, DEV.to backup to GitHub, DEV.to backup to GitHub repository, DEV.to backup to GitHub repository" />
        <meta name="author" content="@codewithsnowbit" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
      </Head>
      <h1 className="text-center mt-2">DEV Post Backup</h1>
      <form onSubmit={getData} id="form">
        <div className="mb-3">
          <label  className="form-label">GitHub Repository</label>
          <input type="text" className="form-control" placeholder="e.g hello-world" onChange={e=>setRepo(e.target.value)} value={repo} required/>
          <div className="form-text">Enter repository where you want to save backup of your post</div>
        </div>
        <div className="mb-3">
          <label  className="form-label">GitHub username</label>
          <input type="text" className="form-control" placeholder="e.g octocat" onChange={e=>setUsername(e.target.value)} value={username} required/>
          <div className="form-text">Make sure you enter correct username</div>
        </div>
        <div className="mb-3">
          <label  className="form-label">DEV Post</label>
          <input type="text" className="form-control" placeholder="e.g codewithsnowbit/unique-apis-to-use-in-2022-2p6o" onChange={e=>setPost(e.target.value)} value={post} required/>
          <div className="form-text">Input must be in this format - <b>username/slug</b></div>
        </div>
        <div className="mb-3">
          <label  className="form-label">GitHub Personal Access Token (PAT)</label>
          <input type="text" className="form-control" placeholder="XXXXXXXXXXXX" onChange={e=>setToken(e.target.value)} value={token} required/>
          <div className="form-text">Don&apos;t worry, we don&apos;t save your token. <a href="https://github.com/settings/tokens/new?scopes=repo" target="_blank" rel="noopener noreferrer">Don&apos;t have it, create one?</a></div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <div className="footer">
        Made with <span role="img" aria-label="heart">❤️</span> by <a href="https://snowbit.vercel.app" target="_blank" rel="noopener noreferrer">Snowbit</a>
      </div>
    </div>
  )
}
