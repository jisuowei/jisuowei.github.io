import React from 'react'
import EmptyAvatar from '../images/empty_avatar.jpg'
import { Icon, Tooltip, Tag, Divider } from '@blueprintjs/core'
import RideDrawer from '../components/RideDrawer'

export interface RideItemProps {
  id: string
  avatar: string
  title: string
  date: string
  weather: string
  mileage: number
  time?: number
  speed?: number
  info?: string
  map: '0' | '1'
}

function RideItem(props: RideItemProps) {

  const { avatar, title, date, weather, mileage, time, speed, info, map } = props;

  return (
    <div className="jitem relative mb-5 shadow overflow-hidden" id={date}>
      <div
        className="absolute top-0 right-0 bottom-0 left-0 bg-no-repeat bg-center blur-10 opacity-25"
        style={{backgroundImage: `url(${EmptyAvatar})`, backgroundSize: '110%'}}
      />
      <div 
        className="absolute bottom-0 w-full h-16 bg-white"
      >
      </div>
      <div className="absolute pl-24 pt-3 pr-3 text-xs border-box w-full">
        <p>{title}</p>
        <p title={info} className="truncate text-gray-500 mt-1">{info}</p>
      </div>
      {
        map === '1'
          ? (
            <RideDrawer date={date.replace(/-/g, '')}>
              <div
                className="item-avatar absolute bg-cover bg-no-repeat bg-center rounded-lg overflow-hidden shadow-md cursor-pointer"
                style={{ backgroundImage: `url(${avatar || EmptyAvatar})` }}
              />
            </RideDrawer>
          )
          : (
            <div
              className="item-avatar absolute bg-cover bg-no-repeat bg-center rounded-lg overflow-hidden shadow-md"
              style={{ backgroundImage: `url(${EmptyAvatar})` }}
            />
          )
      }
      <div className="absolute right-0 bottom-0 left-0 pb-2 pl-3 pr-3 flex justify-between">
        <div>
        </div>
        <div>
          <Tooltip 
            content={
              <div className="w-64 text-xs">
                <p>{date} 骑行<span className="float-right">{weather}</span></p>
                <Divider />
                { mileage && (<p>行程：{mileage} KM</p>)}
                { time && time !== 0 && (<p>耗时：{(time/60).toFixed(2)} Hour</p>)}
                { speed && (<p>均速：{speed} KM/H</p>)}
              </div>
            }
            position="bottom"
          >
            <Tag minimal interactive round>
              <Icon icon="more" iconSize={14} className="text-gray-600" />
            </Tag>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default RideItem;