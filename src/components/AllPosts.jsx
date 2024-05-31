import { useEffect } from "react"
import { useState } from "react"
import { getAllPosts } from "../services/PostService.jsx"
import { Container, Dropdown } from "react-bootstrap"
import { getAllTopics } from "../services/TopicService.jsx"

export const AllPosts = () => {
    const [allPosts, setAllPosts] = useState([])
    const [allTopics, setAllTopics] = useState([])
    const [filter, setFilter] = useState('')
    const [filteredPosts, setFilteredPosts] = useState([])

    // to get and set posts
    const getAndSetPosts = () => {
        getAllPosts().then((postsArray) => {
            setAllPosts(postsArray)
        })
    }

    //to get value of change in dropdown
    const handleChangeFilter = (event) => {
        setFilter(event.target.value)
    }

    //to render posts and topics initially
    useEffect(() => {
        getAndSetPosts()
        getAllTopics().then((topicsArray) => {
            setAllTopics(topicsArray)
        })
    }, [])

    // to filter post by topic
     useEffect(() => {
         if (filteredPosts) {
            const filteredPostsArray = allPosts.filter(
                (post) => post.topicId === filter.id)
                  setFilteredPosts(filteredPostsArray)
          } else {
               setFilteredPosts(allPosts)
     }
    },[allPosts])

    return (
        <div>
        <Dropdown>
            <Dropdown.Toggle
                onChange={handleChangeFilter}
            >
                topic
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {allTopics.map(topic => {
                    return (
                        <Dropdown.Item key={topic.id} value={topic}>
                            {topic.topic}
                        </Dropdown.Item>
                    )
                })}
            </Dropdown.Menu>
        </Dropdown>
        <div>
            {allPosts.map(post => {
                return (
                    <Container className="post container" key={post.id}>
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
                    </Container>
                )
            })}
        </div>
     </div>
    )
}