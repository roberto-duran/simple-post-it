'use client'

import {useQuery} from "react-query";
import Post from "@/app/post/Post";
import {PostType} from "@/model/Post";

const allPosts = async () => {
    const res = await fetch('/api/posts/getPosts');
    return res.json();
}

export default function PostList() {
    const {data, isLoading, error} = useQuery<PostType[]>('posts', allPosts);
    if(error) return <div>Something went wrong</div>;
    if(isLoading) return <div>Loading...</div>;

    return (
        <>
            {data?.map((post: any) => (
                <Post key={post.id}
                      id={post.id}
                      name={post.user.name}
                      avatar={post.user.image}
                      title={post.title}
                      comments={post.Comment}
                />
            ))}
        </>
    );
};
