export type PostType = {
    id: string;
    title: string;
    createAt: string;
    user: {
        id: string;
        name: string;
        image: string;
    },
    Comment?: {
        id: string;
        content: string;
        postId: string;
        userId: string;
        createdAt: string;
        user: {
            id: string;
            name: string;
            image: string;
        },
    }[]
}
