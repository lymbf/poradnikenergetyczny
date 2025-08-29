"use server";

import {createClient} from "@/utils/supabase/server";
import {Category} from "@/interfaces/articles";

export const createPostAction = async (category: Category | null,
                                       subCategory: Category | null,
                                       richText: string,
                                       prevState: any,
                                       formData: FormData) => {
    let title = formData.get('title')?.toString().toLowerCase()
    const image = formData.get('image')

    const supabase = await createClient();

    /*  upload image to supabase storage  */
    if (!image) {
        console.log('image is missing')
        // handle error
    }

    // @ts-ignore
    const {data, error} = await supabase.storage.from('images').upload(image?.name, image, {
        cacheControl: '3600', upsert: false
    })
    // @ts-ignore
    if (error && error.statusCode != '409') {
        console.log('error posting file')
        //handle error
    }
    // @ts-ignore
    const imageUrl = data ? supabase.storage.from('images').getPublicUrl(data.path)?.data?.publicUrl : supabase.storage.from('images').getPublicUrl(image?.name)?.data?.publicUrl

    /*  get user -> userId needed  */
    const {
        data: {user},
    } = await supabase.auth.getUser();
    if (category && richText && title && imageUrl && user) {
        const post = {
            category: category?.id,
            subcategory: subCategory?.id,
            text: richText,
            img_file: imageUrl,
            title: title,
            author: user?.id
        }
        console.log('posting the following: ', post)
        try{
            const res = await supabase.from('articles').insert(post)
            res && console.log('post response: ', res)
            if(res.error)throw new Error(res.error.message)
            if (!res.error) return {message: 'post added successfully', success: true}
        }catch(err){
            console.log('err: ', err)
            return {message: 'sth went wrong, couldnt add the article', success:false}
        }

    } else {
        console.log('sth is missing', 'post: ', {
            category: category?.id,
            subcategory: subCategory?.id,
            text: richText,
            img_file: imageUrl,
            title: title,
            author: user?.id
        })
        return {message: 'form filled incorrectly', success: false}
    }


    // console.log('form data: ', title, image, 'category: ', parseInt(category), 'richText: ', richText, 'UUID: ', user?.id)
}

export const deletPostsAction = async (rows: any, prevState: any) => {
    const supabase = await createClient();
    const ids = Object.keys(rows)
    const res = await supabase
        .from('articles')
        .delete()
        .in('id', ids)
    if (res.status === 204) {
        console.log('posts deleted')
        return {message: 'posts deleted succesfully', success: true, ids: ids}
    } else {
        console.log('unable to delete')
        return {message: 'unable to delete posts, try again later', success: false, ids: []}
    }
}