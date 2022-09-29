import { useState, useEffect } from "react"

export default function GithubSearch() {
    // state to take the value from what the user is typing in the input
    const [search, setSearch] = useState('weston-bailey')
    // state for the API's response back to us
    const [repos, setRepos] = useState([])

    // useEffect will run an initial search on page load, and each time the user types into the input
    useEffect(() => {
        console.log(`the search value is: ${search}`)
        async function fetchRepos() {
            try {
                const url = `http://api.github.com/users/${search}/repos`
                const response = await fetch(url)
                const responseData = await response.json()
                console.log(responseData)
                if (!responseData.message) {
                    setRepos(responseData)
                } else {
                    // TODO: display user not found 
                }
            } catch(err) {
                console.warn(err)
            }
        }
        fetchRepos() // don't forget to invoke!
    }, [search])

    // map the repos the api has responded with
    const repoComponents = repos.map(repo => {
        return (
            <div key={repo.id}>
                <h3>{repo.name}</h3>

                <a target='_blank' href={repo.html_url}>See on Github!</a>
            </div>
        )
    })
    return (
        <div>
            <h2>Search the github api!</h2>

            <label htmlFor="search">Username:</label>
            <input 
                type='text'
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            {repoComponents}

        </div>
    )
}