import { getItem } from "../utils/cache";
import StringService from "../service/string-service";

export const getToken = (field) => {
    let token = null;
    const savedUser = getItem(field);
    if (savedUser && JSON.parse(savedUser || {})) {
        token = JSON.parse(savedUser || {}).access_token
    }
    return token
}

export const getStoreData = (field) => {
    let data = null
    const savedUser = getItem(field);
    if (savedUser && JSON.parse(savedUser || {})) {
        data = JSON.parse(savedUser || {})
    }
    return data;
}

export const handleHartIcon = (data, id, action) => {
    let updatedPosts = { ...data };
    if (updatedPosts?.result) {
        updatedPosts.result = [...updatedPosts?.result].map(post => {
            if (+post.id === +id) {
                post.is_following = action === "follow";
            }
            return post
        })
    }
    return updatedPosts
}

export const handleBoostIcon = (data, id, action) => {
    const updatedComments = { ...data };
    if (updatedComments?.result) {
        updatedComments.result = [...updatedComments?.result].map(comment => {
            if (+comment.id === +id) {
                if (action === "boost") {
                    comment.is_boosting = true
                    comment.boost_count += 1;
                }
                if (action === "unboost") {
                    comment.is_boosting = false
                    comment.boost_count -= 1;
                }

            }
            return comment
        })
    }
    return updatedComments
}

export const getFormatedName = (text) => {
    if (!text || !text.length) {
        return "";
    }
    const names = text.split(" ");
    let fullName = null
    const firstName = names && names[0];
    const lastName = names && names[1] && names[1][0];
    if (firstName) {
        fullName = `${StringService.getCapitalizedFirstCharacterString(firstName)}`;
    }
    if (lastName) {
        fullName = `${fullName} ${StringService.getCapitalised(lastName)}`;
    }
    return `${fullName}.`
}

