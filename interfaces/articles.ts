interface Author{
    name?:string,
    id?:string
}

interface Article{
    id:string,
    title:string,
    text:string,
    created_at:string,
    author:Author,
    img_file:string,
    tags?:string[]
}

interface Category{
    id:string,
    created_at?: string,
    name:string,
    subcategories?:Subcategory[]
}

interface Subcategory{
    id:string,
    created_at?: string,
    name:string,
}

export type {Article, Author, Category, Subcategory}