import React, { useEffect, useState } from 'react'
import Centainer from '../components/layout/Centainer'
import Loading from '../components/Loading'
import RideItem, { RideItemProps } from '../components/RideItem'
import API from '../api'

function RidePage() {
  
  const [res, setRes] = useState<any>({})

  const rideList = res.rows || []

  useEffect(() => {
    API.fetch('ride', null, setRes)
  }, [])

  return (
  <>
    <Centainer>
    <div className="flex flex-wrap justify-between min-h-320">
      {
        rideList.length === 0
          ? <Loading isLoading={true} />
          : (
          <>
            {
              rideList.map((ride: RideItemProps, index: number ) => (
                <RideItem key={index} {...ride} />
              ))
            }
          </>
          )
      }
    </div>
  </Centainer>
  </>
  )
}

export default RidePage;