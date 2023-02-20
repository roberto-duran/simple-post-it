import Image from "next/image";
import Link from "next/link";

type Props = {
    id: string,
    name: string,
    avatar: string,
    title: string
    comments: []
}

export default function Post({id, name, avatar, title, comments}: Props) {
    return (
        <div className="bg-white my-8 p-8 rounded-lg">
            <div className="flex items-center gap-2">
                <Image src={avatar}
                       alt={"avatar"}
                       width={32}
                       height={32}
                       className="rounded-full"/>
                <h3 className="font-bold">{name}</h3>
            </div>
            <div className="m-8">
                <p className="break-all">{title}</p>
            </div>
            <div className="flex gap-4 items-center cursor-pointer">
                <Link href={`/post/${id}`}>
                    <p className="text-sm font-bold text-gray-700">
                        Comments: {comments.length}
                    </p>
                </Link>
            </div>
        </div>
    );
};
