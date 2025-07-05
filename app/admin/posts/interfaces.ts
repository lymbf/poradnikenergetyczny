interface Author{
    name?:string,
    id?:string
}

interface Article{
    id:string,
    title?:string,
    text?:string,
    created_at?:string,
    author?:Author
}

export type {Article, Author}