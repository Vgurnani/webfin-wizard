import React,{ useState , useEffect } from 'react'
import SocialMedia from './socialMedia'
import { createSocialMedia, getSocialMedia } from 'middleware/blog'
import { useDispatch , useSelector } from 'react-redux';

const Dashboard =() => {
    const dispatch = useDispatch()
    const connecting = useSelector((state) => state.blog.connecting)
    const socialMediaLinks = useSelector((state) => state.blog.socialMediaLinks)
    const [ openModal ,setOpenModal ] = useState(false)
    useEffect(() => {
        dispatch(getSocialMedia())
    },[])

    const connectData = (values) => {
        const data = {
            type:'social-media-links',
            content: values,
            imageUrl: 'https://static.helpjuice.com/helpjuice_production/uploads/upload/image/2747/125355/social_media_icons.jpg',
            title: 'Social Media Links',
            slug: 'social-media-links'
        }
        dispatch(createSocialMedia(data, setOpenModal))
    }
    return(
        <div>
            Next Steps
            <span>1. Connect Social  <button onClick={ () => { setOpenModal(!openModal)} }>connect</button></span>
            <SocialMedia socialMediaLinks={ socialMediaLinks } connecting={ connecting } connectData={ connectData } openModal={ openModal } setOpenModal={ setOpenModal } />
        </div>)
}

export default Dashboard