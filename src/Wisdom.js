import { useState, useEffect } from 'react'

export default function Wisdom() {
    // state to hold the api response
    const [wisdom, setWisdom] = useState('loading wisdom...')

    // making API calls that display API data to the user -- you want to only run one time (so you use an empty dependancy array)
    useEffect(() => {
        // fetch('https://api.kanye.rest')
        //     .then(response => response.json())
        //     .then(kanyeData => setWisdom(kanyeData.quote))
        //     .catch(err => console.warn(err))
        // immediately invoked function expression
        // IIFE
        (async function fetchWisdom() {
            try {
                const response = await fetch('https://api.kanye.rest')
                const kanyeData = await response.json()
                setWisdom(kanyeData.quote)
            } catch(err) {
                console.warn(err)
            }
        })()
        // fetchWisdom() // don't forget to invoke!
    }, []) // empty dependacy array (this will make the useEffect run only on the first render)

    useEffect(() => {
        console.log('the wisdom component is re-rendering')
    }) // no dependancy array means this useEffect will always run each render

    const handleBestowWisdom = async () => {
        try {
            const response = await fetch('https://api.kanye.rest')
            const kanyeData = await response.json()
            setWisdom(kanyeData.quote)
        } catch(err) {
            console.warn(err)
        }
    }

    return (
        <div>
            <h1>{wisdom}</h1>

            <button
                onClick={handleBestowWisdom}
            >
                Bestow Wisdom Upon Me
            </button>
        </div>
    )
}