'use client';

import Post from "@/app/post/Post";
import {PostType} from "@/model/Post";
import {useQuery} from "react-query";
import AddComment from "@/app/post/AddComment";
import CommentList from "@/app/post/[slug]/CommentList";

type URL = {
    params: {
        slug: string;
    }
}

const getPost = async (slug: string) => {
    const res = await fetch(`/api/posts/${slug}`);
    return res.json();
}

export default function PostDetail(url: URL) {
    const {data, error, isLoading} = useQuery<PostType>(
        'post-detail',
        () => getPost(url.params.slug)
    );
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error...</div>;
    return (
        <div>
            {data && (
                <>
                    <Post id={data.id}
                          name={data.user.name}
                          avatar={data.user.image}
                          title={data.title}
                          comments={data.Comment} />
                    <AddComment postId={data.id} />
                    {data.Comment?.map((comment) => (
                        <CommentList key={comment.id}
                                     comment={comment}
                        />
                    )) }
                </>
                )
            }

        </div>
    );
};
