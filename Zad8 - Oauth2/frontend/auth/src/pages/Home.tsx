import React from 'react'
import { useFetchAuth } from '../FetchData'
import { Link } from 'react-router-dom'

export default function Home() {
    const { authorized } = useFetchAuth()

  return (
    <>
        {authorized ? (<div>Welcome to auth.com</div>) : (
            <Link to={'/login'}>Sing in</Link>
        )}
    </>
  )
}
