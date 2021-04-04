
// user
export type User = {
    pk: number,
    username: string,
    email: string,
    name: string,
    picture: string,
    intro: string,
    is_superuser: boolean,
}

export interface headData {
    title?: string,
    ogtypeWebsite?: string,
    ogimage?: string,
    ogtitle?: string,
    ogdescription?: string,
    seodescription?: string,
}

export default User;