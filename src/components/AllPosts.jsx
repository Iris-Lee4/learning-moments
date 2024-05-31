import { useEffect } from "react"
import { useState } from "react"
import { getAllPosts } from "../services/PostService.jsx"
import { Container } from "react-bootstrap"

export const AllPosts = () => {
    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        getAllPosts().then((postsArray) => {
            setAllPosts(postsArray)
        })
    }, [])

    return (
        <div>
            {allPosts.map(post => {
                return (
                    <container className="post container" key={post.id}>
                        <header className="post-title">
                            Title: {post.title}
                        </header>
                        <div className="post-detail">
                            <span>Author: </span>
                            {post.user.fullName}
                        </div>
                        <div className="post-detail">
                            <span> Date Posted: </span>
                            {post.date}
                        </div>
                        <div className="post-detail">
                            <span> Topic: </span>
                            {post.topic.topic}
                        </div>
                        <div className="post-body">
                                {post.body}
                        </div>
                        <div>
                            <span> Liked by </span>{post.likedPosts.length}
                        </div>
                    </container>
                )
            })}
        </div>
    )
}