export const getAllPosts = () => {
    return fetch('http://localhost:8088/posts?_embed=likedPosts&_expand=user&_expand=topic')
        .then((res) => res.json())
}