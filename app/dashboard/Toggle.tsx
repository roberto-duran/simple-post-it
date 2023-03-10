
type ToggleProps = {
    deletePost: () => void;
    setToggle: (toggle: boolean) => void;
}
export default function Toggle({deletePost, setToggle}: ToggleProps) {
    return (
        <div onClick={() => setToggle(false)}
             className="fixed bg-black/50 w-full h-full z-20 left-0 top-0">
            <div className="absolute flex flex-col gap-6 bg-white top-1/2 left-1/2
            transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg">
                <h2 className="text-xl">
                    Are you sure you want to delete this post?
                </h2>
                <h3 className="text-sm text-red-600">
                    pressing the delete button will permanently delete your post.
                </h3>
                <button onClick={deletePost}
                        className="text-sm bg-red-600 text-white py-2 px-4 rounded-md"
                >
                    Delete Post
                </button>
            </div>
        </div>
    );
};
