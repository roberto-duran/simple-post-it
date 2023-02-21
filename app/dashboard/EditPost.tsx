import Image from "next/image";
import Toggle from "@/app/dashboard/Toggle";
import {useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import toast from "react-hot-toast";

type EditPostProps = {
    id: string;
    title: string;
    avatar: string;
    name: string;
    email: string;
    comments: {
        id: string;
        content: string;
        postId: string;
        userId: string;
    }[];

}

export default function EditPost({avatar, title, name, email, comments, id}: EditPostProps) {
    const [toggle, setToggle] = useState<boolean>(false);
    let deleteToastId: string;
    const queryClient = useQueryClient();
    const {mutate} = useMutation(
        async (id: string) => await fetch(`/api/posts/${id}`, {
            method: 'DELETE'
        }),
        {
            onError: (error) => {
                toast.error("Error Deleting that post", { id: deleteToastId });
            },
            onSuccess: (response) => {
                if(!response.ok)
                    toast.error("Error Deleting that post", { id: deleteToastId });
                toast.success("Post has been delete", { id: deleteToastId });
                queryClient.invalidateQueries(['posts']);
            }
        }
    );

    const deletePost = () => {
        deleteToastId = toast.success("Deleting your post", { id: deleteToastId });
        mutate(id);
    }

    return (
        <>
            <div className="bg-white my-8 p-8 rounded-lg">
                <div className="flex items-center gap-2">
                    <Image src={avatar}
                           className="rounded-full"
                           alt={'user avatar'}
                           width={32}
                           height={32}/>
                    <h3 className="font-bold text-gray-700">
                        {name}
                    </h3>
                </div>
                <div className="my-8">
                    <p className="break-all">{title}</p>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-sm font-bold text-gray-700">
                        Comments: {comments.length}
                    </p>
                    <button onClick={() => setToggle(true)}
                        className="text-sm font-bold text-red-500">
                        Delete
                    </button>
                </div>
            </div>
            {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
        </>

    );
};
