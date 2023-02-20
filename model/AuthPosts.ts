export type AuthPostsType = {
    id: string;
    email: string;
    image: string;
    name: string;
    Post: {
        id: string;
        title: string;
        createdAt: string;
        Comment: {
            id: string;
            content: string;
            postId: string;
            userId: string;
            createdAt: string;
        }[];
    }[];
}
