import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'; // Use React Router's Link for navigation
import ProfileHeader from './ProfileHeader';
import PeopleYouMayKnow from './PeopleYouMayKnow';
import MenuBar from './MenuBar';
import About from './Sections/About'
import Saved from './Sections/Saved'
import Collections from './Sections/Collections'
import Codes from './Sections/Codes'
import Groups from './Sections/Groups'
import { getUser } from '../../redux/actions/user'

const ProfilePage = () => {

    const dispatch = useDispatch()
    const { userId } = useParams()
    const [activeMenuItem, setActiveMenuItem] = useState('about');

    useEffect(() => {
        dispatch<any>(getUser(userId as string))
    }, [userId])


    return (
        <div className="container mx-auto p-4 w-full flex flex-col gap-8 ">

            <ProfileHeader />
            <PeopleYouMayKnow />

            <div className="flex flex-col gap-4 ">
                <MenuBar activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} />
                {activeMenuItem == 'about' && <About />}
                {activeMenuItem == 'saved' && <Saved />}
                {activeMenuItem == 'collections' && <Collections />}
                {activeMenuItem == 'codes' && <Codes />}
                {activeMenuItem == 'groups' && <Groups />}
            </div>

        </div>
    );
};

export default ProfilePage;