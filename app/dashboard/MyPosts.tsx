'use client'

import {AuthPostsType} from "@/model/AuthPosts";
import EditPost from "@/app/dashboard/EditPost";
import {useQuery} from "react-query";

const fetchAuth = async () => {
    const res = await fetch('/api/posts/authPosts');
    return res.json();
}
export default function MyPosts() {
    const {data, isLoading } = useQuery<AuthPostsType>(
        'auth-posts',
        fetchAuth
    );

    if (isLoading) return <div>Loading...</div>;
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
