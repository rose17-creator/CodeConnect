import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReceivedRequests } from '../../redux/actions/friend'
import { User } from '../../interfaces'
import { RootState } from '../../redux/store'
import FriendCard from './FriendCard'
import { Pagination } from '@mui/material'
import { empty } from '@/assets'

const ReceivedRequests = ({ totalPages, page, setPage, pageSize }: { totalPages: number, page: number, setPage: any, pageSize: number }) => {

  //////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////
  const dispatch = useDispatch()
  const { receivedRequests, isFetching }: { receivedRequests: User[], isFetching: boolean } = useSelector((state: RootState) => state.friend)

  //////////////////////////////////////////////////// STATES ////////////////////////////////////////////////

  //////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////
  useEffect(() => {
    dispatch<any>(getReceivedRequests(receivedRequests.length == 0, `?page=${page}&pageSize=${pageSize}`))
  }, [])
  useEffect(() => {
    // TODO: if data of particular page is available then dont call api
    fetchMore()
  }, [page])

  /////////////////////////////////////// FUNCTIONS /////////////////////////////////////////
  const fetchMore = async () => {
    dispatch<any>(getReceivedRequests(receivedRequests.length == 0, `?page=${page}&pageSize=${pageSize}`))
  }


  return (
    <div className='flex flex-col gap-y-8 w-full'>
      <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {
          isFetching
            ?
            Array(6).fill("").map((_, index) => (
              <FriendCard.Skeleton key={index} />
            ))
            :
            receivedRequests.length == 0
              ?
              <div className='col-span-4 w-full flex flex-col justify-center items-center grayscale '>
                <img src={empty} alt='Empty' className='w-96 h-96 grayscale ' />
                <span className='text-foreground text-center text-lg font-semibold ' >Nothing Found.</span>
                <span className='text-muted-foreground text-center text-md ' >It's our fault not yours.</span>
              </div>
              :
              receivedRequests.map((friend, index) => (
                <FriendCard key={index} friend={friend} type={'receivedRequest'} />
              ))
        }
      </div>

      {
        totalPages > 1 &&
        <div className="w-full flex justify-center">
          <Pagination
            count={totalPages}
            defaultPage={1}
            page={page}
            siblingCount={0}
            onChange={(e: any, page: number) => setPage(page)}
            size='large'
          />
        </div>
      }

    </div>
  )
}

export default ReceivedRequests