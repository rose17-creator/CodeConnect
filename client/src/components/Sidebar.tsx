import React, { useState, useEffect } from "react"
import {
    HomeOutlined, PersonOutlined, GroupOutlined, CollectionsBookmarkOutlined, NotificationsNoneOutlined, AddBoxOutlined, AccountCircleOutlined, DensityMediumOutlined,
    Home, Person, Group, CollectionsBookmark, NotificationsNone, AddBox, AccountCircle, DensityMedium, Code, CodeOutlined,
    FormatAlignCenterSharp,
    SyncProblem,
    SyncProblemOutlined,
    CodeOff,
    CodeOffOutlined
} from "@mui/icons-material"
import { lowercase } from '../utils/functions/function'
import { Tooltip } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { useStateContext } from "../contexts/ContextProvider"


const Sidebar = () => {

    //////////////////////////////// VARIABLES //////////////////////////////////////
    const location = useLocation()
    const { showSidebar, setShowSidebar } = useStateContext()
    const { pathname } = useLocation()
    const sidebarLinks = [
        {
            name: 'Home',
            iconFilled: Home,
            iconOutlined: HomeOutlined,
            active: pathname.includes('/home') || pathname == '/'
        },
        {
            name: 'Codes',
            iconFilled: Code,
            iconOutlined: CodeOutlined,
            active: pathname.includes('/codes')
        },
        {
            name: 'Streaks',
            iconFilled: CodeOff,
            iconOutlined: CodeOffOutlined,
            active: pathname.includes('/streaks')
        },
        {
            name: 'Challenges',
            iconFilled: SyncProblem,
            iconOutlined: SyncProblemOutlined,
            active: pathname.includes('/challenges')
        },
        {
            name: 'Friends',
            iconFilled: Person,
            iconOutlined: PersonOutlined,
            active: pathname.includes('/friends')
        },
        {
            name: 'Groups',
            iconFilled: Group,
            iconOutlined: GroupOutlined,
            active: pathname.includes('/groups')
        },
        {
            name: 'Collections',
            iconFilled: CollectionsBookmark,
            iconOutlined: CollectionsBookmarkOutlined,
            active: pathname.includes('/collections')
        },
        {
            name: 'Notifications',
            iconFilled: NotificationsNone,
            iconOutlined: NotificationsNoneOutlined,
            active: pathname.includes('/notifications')
        },
        {
            name: 'Create',
            iconFilled: AddBox,
            iconOutlined: AddBoxOutlined,
            active: pathname.includes('/create')
        },
        {
            name: 'Profile',
            iconFilled: AccountCircle,
            iconOutlined: AccountCircleOutlined,
            active: pathname.includes('/profile')
        },
        {
            name: 'More',
            iconFilled: DensityMedium,
            iconOutlined: DensityMediumOutlined,
            active: pathname.includes('/more')
        },
    ]
    //////////////////////////////// STATES /////////////////////////////////////////

    //////////////////////////////// USE EFFECTS ////////////////////////////////////


    //////////////////////////////// FUNCTIONS //////////////////////////////////////

    return (
        <div style={{ height: 'calc(100vh-4rem)' }} className={`h-full w-full flex gap-[1.5rem] py-[1.5rem] overflow-y-scroll ${showSidebar ? 'px-[1rem]' : 'px-0 '} `}>
            {
                showSidebar
                    ?
                    <div className={`flex flex-col justify-start gap-4 w-full h-full`}>
                        {
                            sidebarLinks.map((item, index) => (
                                <Link
                                    key={index}
                                    to={`/${lowercase(item.name)}`}
                                    className={`${item.active && 'font-extrabold bg-dark-slate-blue-lighten text-teal-blue '} hover:bg-dark-slate-blue-lighten group hover:text-white flex gap-[12px] py-[10px] px-[6px] w-full capitalize rounded-[4px] cursor-pointer `}
                                >
                                    {
                                        item.active
                                            ?
                                            <item.iconFilled className='' />
                                            :
                                            <item.iconOutlined className='' />
                                    }
                                    <span className={`${item.active && 'font-bold bg-dark-slate-blue-lighten text-teal-blue '} hover:bg-dark-slate-blue-lighten group-hover:text-white  text-[18px] font-medium `} >
                                        {item.name}
                                    </span>
                                </Link>))
                        }
                    </div>
                    :
                    <div className={`flex flex-col justify-start gap-[8px] w-full h-full`}>
                        {
                            sidebarLinks.map((item, index) => (
                                <Tooltip
                                    key={index}
                                    placement='right' title={item.name}
                                >
                                    <Link
                                        to={`/${lowercase(item.name)!.split('/')}`}
                                        className={`py-[4px] px-[6px] w-full rounded-[4px]   cursor-pointer flex justify-center items-center `}
                                    >
                                        {
                                            item.active
                                                ?
                                                <button className={`${item.active && 'font-extrabold bg-dark-slate-blue-lighten text-teal-blue '} hover:bg-dark-slate-blue-lighten hover:text-white w-[40px] h-[40px] rounded-full `} >
                                                    <item.iconFilled className={``} />
                                                </button>
                                                :
                                                <button className={`${item.active && 'font-extrabold bg-dark-slate-blue-lighten text-teal-blue '} hover:bg-dark-slate-blue-lighten hover:text-white w-[40px] h-[40px] rounded-full `} >
                                                    <item.iconOutlined className={``} />
                                                </button>
                                        }
                                    </Link>
                                </Tooltip>
                            ))
                        }
                    </div>
            }
        </div>
    )
}
export default Sidebar



