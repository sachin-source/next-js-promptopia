"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Profile from '@components/Profile'

const myProfile = () => {
  const [posts, setposts] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {

    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setposts(data);
    };
    if(session?.user.id) fetchPosts()
  }, [])
  const handleEdit = () => {}
  const handleDelete = async () => {}

  return (
    <Profile
    name="My"
    desc="Welcome to your personalized profile page"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default myProfile