export type TuserForm = {
    username: string,
    password: string,
    email?: string
    name?: string,
}

export type TuserResponse = {
    id: number,
    username: string,
    name: string,
    email: string,
    token?: string
}

export type TCategories = {
    id: string,
    name: string
}

export type Tpet = {
    owner_id?: number,
    name: string,
    breed: string,
    type: string,
    age: number,
    photo_path?: string,
    desc?: string,
}