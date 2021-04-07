
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

export type Wanted = {
    slug: string,
    want_name: string,
    want_intro: string,
    want_price: number,
    plat: { [key: number]: any}
    user: User, // User type
    posted: string,
    is_gotten: boolean,
    picture: string,
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