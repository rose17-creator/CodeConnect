import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../interfaces';
import { RootState } from '../../redux/store';
import { SampleProfileCoverImage } from '../../assets';
import { Button } from '@/components/ui/button';
import { removeFriendRequest, sendFriendRequest, getSentRequests, getFriends, getReceivedRequests, acceptFriendRequest } from '@/redux/actions/friend';
import { useRole } from '@/hooks/useRole';
import { deleteUser } from '@/redux/actions/user';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {

    ///////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentUser, isFetching: userFetching }: { currentUser: User | null, isFetching: boolean } = useSelector((state: RootState) => state.user)
    const { sentRequests, receivedRequests, isFetching: friendsFetching, friends } = useSelector((state: RootState) => state.friend)
    const { role } = useRole()

    ///////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////
    const [userType, setUserType] = useState<'friend' | 'request_sent' | 'request_received' | 'none'>('none')

    ///////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getReceivedRequests(receivedRequests.length == 0, ``))
        dispatch<any>(getSentRequests(sentRequests.length == 0, ``))
        dispatch<any>(getFriends(friends.length == 0, ``))
    }, [])
    useEffect(() => {
        if (friends.some(user => user._id == currentUser?._id)) { // if friend
            setUserType('friend')
        }
        else if (sentRequests.some(user => user._id == currentUser?._id)) {  // if request sent
            setUserType('request_sent')
        }
        else if (receivedRequests.some(user => user._id == currentUser?._id)) { // if request received
            setUserType('request_received')
        }
        else {
            setUserType('none')
        }
    }, [sentRequests, currentUser, friends, receivedRequests])

    ///////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////////
    const onClick = () => {
        if (userType == 'request_sent')
            dispatch<any>(removeFriendRequest(currentUser?._id as string))
        else if (userType == 'request_received')
            dispatch<any>(acceptFriendRequest(currentUser?._id as string))
        else
            dispatch<any>(sendFriendRequest(currentUser?._id as string))
    }

    const onDeleteUser = () => {
        if (role == 'Admin') {
            dispatch<any>(deleteUser(currentUser?._id as string, navigate))
        }
    }

    return (
        <div className="flex flex-col w-full">
            <div className="w-full h-[20rem] rounded-[6px] overflow-hidden " >
                <img
                    src={currentUser?.coverImage ? currentUser?.coverImage : SampleProfileCoverImage}
                    alt=""
                    className="w-full h-full"
                />
            </div>

            <div className="flex justify-between items-center gap-4 my-[1rem] px-[2rem]">
                {/* Profile image and username */}
                <div className="flex items-end gap-4 relative">
                    <div className="relative w-[10rem]">
                        <div className="w-[10rem] h-[10rem] absolute bottom-[-1rem] rounded-full border-[1px] border-gray-500">
                            <img
                                src={currentUser?.profilePicture ? currentUser?.profilePicture : "https://via.placeholder.com/50"}
                                className="w-full h-full object-cover rounded-full"
                                alt="Profile"
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-dark-slate-blue "><span className='capitalize' >{currentUser?.firstName} {currentUser?.lastName} </span>({currentUser?.username}) </h1>
                        <p className="text-gray-600">{currentUser?.email}</p>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    {
                        userType != 'friend' &&
                        <Button onClick={onClick} disabled={friendsFetching || userFetching} >
                            {userType == 'request_received' ? 'Accept Request' : userType == 'request_sent' ? 'Remove Request' : 'Add Friend'}
                        </Button>
                    }
                    {
                        role == 'Admin' &&
                        <Button onClick={onDeleteUser} variant='destructive' disabled={friendsFetching || userFetching} >
                            Delete User
                        </Button>
                    }
                </div>
            </div>

        </div>

    );
};

export default ProfilePage;
