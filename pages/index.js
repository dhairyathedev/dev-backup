import { useState } from "react"
import { Octokit } from "@octokit/core"
import { nanoid } from "nanoid"
export default function Home() {
  // https://github.com/settings/tokens/new?scopes=repo
  // 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
  const [token, setToken] = useState("")
  const [repo, setRepo] = useState("")
  const [username, setUsername] = useState("")
  const [post, setPost] = useState("")
  const path = nanoid(18)
  const pushCode = async (data, msg) => {
    const octokit = new Octokit({ auth: token })
    // console.log('"' + data + '" converted to Base64 is "' + btoa(unescape(encodeURIComponent(data)) + '"'));
    const bs64 = btoa(unescape(encodeURIComponent(data)))
    await octokit.request(`PUT /repos/${repo}/contents/${path}.md`, {
      owner: username,
      repo: 'hello-world',
      path: 'path',
      message: `backup: ${msg}`,
      content: bs64,
  })
  }
  const getData = async (e) => {
    e.preventDefault()
    await fetch(`https://dev.to/api/articles/${post}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      pushCode(data.body_html, data.title)
    })
  }
  return(
    <div className="container">
      <h1 className="text-center">DEV.to Backup</h1>
      {/* <form onSubmit={getData}>
      <input type="text" placeholder="e.g octocat/hello-world" onChange={e=>setRepo(e.target.value)} value={repo} required/>
      <input type="text" placeholder="e.g octocat" onChange={e=>setUsername(e.target.value)} value={username} required/>
      <input type="text" placeholder="e.g post from dev to" onChange={e=>setPost(e.target.value)} value={post} required/>
      <input type="text" placeholder="e.g xxxxxxxx" onChange={e=>setToken(e.target.value)} value={token} required/>
      <button type="submit">Backup</button>
      </form> */}
      <form onSubmit={getData}>
        <div className="mb-3">
          <label  className="form-label">GitHub Repository</label>
          <input type="text" className="form-control" placeholder="e.g octocat/hello-world" onChange={e=>setRepo(e.target.value)} value={repo} required/>
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
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" >Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
