'use client'

import useSWR from 'swr';
import {AuthPostsType} from "@/model/AuthPosts";
import EditPost from "@/app/dashboard/EditPost";
import {PostType} from "@/model/Post";
const fetchAuth = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('An error occurred while fetching the data.');
    }
    return res.json();
}
export default function MyPosts() {
    const {data, error, isLoading} = useSWR<AuthPostsType>('/api/posts/authPosts', fetchAuth);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error...</div>;
    return (
        <div>
            {data?.Post?.map((post) => (
                <EditPost key={post.id}
                          id={post.id}
                          title={post.title}
                          avatar={data?.image}
                          name={data?.name}
                          email={data?.email}
                          comments={post.Comment}
                />
                )
            )}
        </div>
    );
};
