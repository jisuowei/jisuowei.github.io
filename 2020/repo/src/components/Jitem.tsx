import React from 'react'
import EmptyAvatar from '../images/empty_avatar.jpg'
import { Icon, Tooltip, Tag } from '@blueprintjs/core'

export interface JitemProps {
  id: string
  title: string
  date: string
  avatar: string
  url: string
  type: string
  info: string
  name: string
}

function Jitem(props: JitemProps) {

  const { id, title, date, avatar, type, info, name } = props;
  const tag = type;

  const types = [
    {list: [], icon: 'wrench',    name: '小工具'},
    {list: [], icon: 'gamepad',   name: '代码'},
    {list: [], icon: 'rocket',    name: '示例'},
    {list: [], icon: 'book',      name: '在线文档'},
    {list: [], icon: 'share-alt', name: '转载'},
  ]
  
  return (
    <div className="jitem relative mb-5 shadow overflow-hidden" id={id}>
      <div
        className="absolute top-0 right-0 bottom-0 left-0 bg-no-repeat bg-center blur-10 opacity-25"
        style={{backgroundImage: `url(${avatar || EmptyAvatar})`, backgroundSize: '110%'}}
      />
      <div 
        className="absolute bottom-0 w-full h-16 bg-white"
      >
        {/* {
          lv && (
            <div className="relative ml-3 mt-3 text-yellow-500">
              <div className="absolute">
                <Icon icon="star-empty" iconSize={12} />
                <Icon icon="star-empty" iconSize={12} />
                <Icon icon="star-empty" iconSize={12} />
                <Icon icon="star-empty" iconSize={12} />
                <Icon icon="star-empty" iconSize={12} />
              </div>
              <div 
                className="absolute overflow-hidden whitespace-no-wrap" 
                style={{width: (Number(lv) || 0) / 5 * 60}}
              >
                <Icon icon="star" iconSize={12} />
                <Icon icon="star" iconSize={12} />
                <Icon icon="star" iconSize={12} />
                <Icon icon="star" iconSize={12} />
                <Icon icon="star" iconSize={12} />
              </div>
              <span className="inline-block ml-16 mt-1 text-xs text-yellow-500">{lv}</span>
            </div>
          )
        } */}
      </div>
      <div className="absolute pl-24 pt-3 pr-3 text-xs border-box w-full">
        <p>{title}</p>
        <p title={title} className="truncate text-gray-500 mt-1">{info}</p>
      </div>
      <span
        className="cursor-pointer"
        onClick={() => window.open(`https://jisuowei.com/app/${name}`)}
      >
        <div
            className="item-avatar absolute bg-cover bg-no-repeat bg-center rounded-xl overflow-hidden shadow-md"
            style={{backgroundImage: `url(${avatar || EmptyAvatar})`}}
          >
        </div>
      </span>
      <div className="absolute right-0 bottom-0 left-0 pb-2 pl-3 pr-3 flex justify-between">
        <div>
          {
            <Tag minimal className="mr-1 text-gray-500">
              <span className="text-gray-500 text-xs">{types[+tag-1].name}</span>
            </Tag>
          }
        </div>
        <div>
          <Tooltip 
            content={
              <div className="w-64">
                <p className="text-xs">
                  {`${date}`}
                </p>
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

export default Jitem;