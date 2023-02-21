import Image from "next/image";

type CommentListProps = {
    comment: {
        id: string;
        content: string;
        postId: string;
        userId: string;
        user: {
            id: string;
            name: string;
            image: string;
        }
        createdAt: string;
    }
}
export default function CommentList({comment}: CommentListProps) {
    return (
        <div className="my-6 bg-white p-8 rounded-md">
            <div className="flex items-center gap-2">
                <Image src={comment.user.image}
                       alt={'user avatar'}
                       width={24}
                       height={24}
                       className="rounded-full"/>
                <h3 className="font-bold">
                    {comment.user.name}
                </h3>
                <h2 className="text-sm">
                    {comment.createdAt}
                </h2>
            </div>
            <div className="py-4">
                {comment.content}
            </div>
        </div>
    );
};
