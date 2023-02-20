import AddPost from "@/app/post/AddPost";
import PostList from "@/app/post/PostList";

export default function Home() {
    return (
        <main className="">
            <AddPost />
            <PostList />
        </main>
    )
}
