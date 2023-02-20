'use client'
import React, {useState} from "react";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";

export default function AddPost() {
    const [title, setTitle] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const queryClient = useQueryClient();
    let toastPostId: string;
    // create post
    const {mutate} = useMutation(
        async (title: string) => await fetch('/api/posts/addPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title})
        }),
        {
            onError: (error ) => {
                console.log(error, 'error');
                setIsDisabled(false);
            },
            onSuccess: (response) => {
                setTitle('');
                if(!response.ok)
                    toast.error(response.statusText, { id: toastPostId});
                toast.success("Post created successfully!", { id: toastPostId});
                setIsDisabled(false);
                queryClient.invalidateQueries(['posts']);
            }
        }
    );

    const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toastPostId = toast.loading("Creating post...", { id: toastPostId});
        setIsDisabled(true);
        mutate(title);
    }

    const updateTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        (e.target.value.length > 300 || e.target.value.length === 0) ?
            setIsDisabled(true) : setIsDisabled(false);
        setTitle(e.target.value);
    }

    return (
        <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
            <div className="flex flex-col my-4">
                <textarea name="title"
                          className="p-4 text-lg rounded-md bg-gray-200"
                          placeholder={"What's on your mind?"}
                          onChange={updateTitle}
                          value={title}></textarea>
            </div>
            <div className="flex items-center justify-between gap-2">
                <p className={`font-bold text-sm ${title.length > 300? 'text-red-700' : 'text-gray-700'}`}>
                    {title.length}/300
                </p>
                <button className="text-sm bg-teal-600 text-white py-2 px-6 rounded-md disabled:opacity-50"
                        disabled={isDisabled}
                        type={"submit"}
                        >
                    Create a post
                </button>
            </div>
        </form>
    );
};
