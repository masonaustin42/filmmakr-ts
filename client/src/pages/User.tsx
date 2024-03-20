import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

// FOR DEV
function User() {
  type User = {
    _id: string
    firstName: string
    lastName: string
    email: string
    // Add any other properties you need for the User type
  }
  const { userId } = useParams()
  const [user, setUser] = useState({} as User)

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/users/${userId}`)
      const userRes = await res.json()
      setUser(userRes)
    }
    fetchUser()
  }, [userId])

  return (
    <div>
      <h1>
        User {user.firstName} {user.lastName}
      </h1>
      <h2>{user.email}</h2>
    </div>
  )
}

export default User
