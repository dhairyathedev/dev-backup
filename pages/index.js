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
  const updateRepo = async () => {
    const data = "hello boy"
    const octokit = new Octokit({ auth: token })
    console.log('"' + data + '" converted to Base64 is "' + btoa(unescape(encodeURIComponent(data)) + '"'));
  
  }
  const pushCode = async (data, msg) => {
    const octokit = new Octokit({ auth: token })
    console.log('"' + data + '" converted to Base64 is "' + btoa(unescape(encodeURIComponent(data)) + '"'));
    await octokit.request(`PUT /repos/${repo}/contents/${path}.md`, {
      owner: username,
      repo: 'hello-world',
      path: 'path',
      message: `message ${msg}`,
      content: btoa(unescape(encodeURIComponent(data))),
  })
  }
  const getData = async () => {
    await fetch(`https://dev.to/api/articles/${post}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      pushCode(data.body_html, data.title)
    })
  }
  return(
    <div>
      <h1>Dev.to Backup</h1>
      <input type="text" placeholder="e.g octocat/hello-world" onChange={e=>setRepo(e.target.value)} value={repo}/>
      <input type="text" placeholder="e.g octocat" onChange={e=>setUsername(e.target.value)} value={username}/>
      <input type="text" placeholder="e.g post from dev to" onChange={e=>setPost(e.target.value)} value={post}/>
      <input type="text" placeholder="e.g xxxxxxxx" onChange={e=>setToken(e.target.value)} value={token}/>
      <button onClick={getData}>Backup</button>
    </div>
  )
}
