'use client';

import React, {useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import toast from "react-hot-toast";

export default function AddComment({postId}: {postId: string}) {
    const [title, setTitle] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const queryClient = useQueryClient();
    let commentToastId: string;

    const { mutate } = useMutation(
        async (data:{ title: string, postId: string}) =>
            await fetch(`/api/posts/addComment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data})
        }),
        {
            onError: (error) => {
                console.log(error, 'error');
                setIsDisabled(false);
            },
            onSuccess: (response) => {
                setTitle('');
                if(!response.ok)
                    toast.error(response.statusText, { id: commentToastId});
                toast.success("Comment created successfully!", { id: commentToastId});
                setIsDisabled(false);
                queryClient.invalidateQueries(['post-detail']);
            }
        }
    );

    const submitComment = (e: React.FormEvent) => {
        e.preventDefault();
        commentToastId = toast.loading("Creating comment...", { id: commentToastId});
        setIsDisabled(true);
        mutate({title, postId});
    }

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        (e.target.value.length > 300 || e.target.value.length === 0) ?
            setIsDisabled(true) : setIsDisabled(false);
        setTitle(e.target.value);
    }

    return (
        <form className="my-8" onSubmit={submitComment}>
            <h3>Add a Comment</h3>
            <div className="flex flex-col my-2">
                <input type="text"
                       placeholder="Comment"
                       onChange={handleTitle}
                       value={title}
                       name="title"
                       className="p-4 text-lg rounded-md my-2"
                />
            </div>
            <div className="flex items-center gap-2">
                <button disabled={isDisabled}
                        className="text-sm bg-teal-600 text-white py-2 px-6 rounded-md disabled:opacity-50"
                        type={"submit"}
                >
                    Add Comment
                </button>
                <p className={`font-bold ${title.length > 300 ? 
                    "text-red-700" : "text-gray-700"}`}>
                    {title.length}/300
                </p>
            </div>
        </form>
    );
};
