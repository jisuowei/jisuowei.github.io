import React from 'react';
import { Icon, Tag, Tooltip } from '@blueprintjs/core';
import { IStore } from '../types';
import EmptyAvatar from '../images/empty_avatar.jpg';

interface StoreItemProps {
  store: IStore
}

function StoreItem(props: StoreItemProps) {

  const { store } = props;

  return (
    <div className="store-item relative mb-5 shadow overflow-hidden">
      <div
        className="absolute top-0 right-0 bottom-0 left-0 bg-no-repeat bg-center blur-10 opacity-25"
        style={{backgroundImage: `url(${store.avatar || EmptyAvatar})`, backgroundSize: '110%'}}
      />
      <div 
        className="absolute bottom-0 w-full h-16 bg-white"
      >
        {
          store.lv !== '0.0' && (
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
                style={{width: (Number(store.lv) || 0) / 5 * 60}}
              >
                <Icon icon="star" iconSize={12} />
                <Icon icon="star" iconSize={12} />
                <Icon icon="star" iconSize={12} />
                <Icon icon="star" iconSize={12} />
                <Icon icon="star" iconSize={12} />
              </div>
              <span className="inline-block ml-16 mt-1 text-xs text-yellow-500">{store.lv}</span>
            </div>
          )
        }
      </div>
      <div className="absolute pl-3 pt-20 pr-3 text-xs border-box w-full">
        <p className="truncate" title={store.title}>{store.title}</p>
      </div>
      <a href={`${store.url}`} target="_blank" rel="noopener noreferrer">
        <div
            className="item-avatar absolute bg-cover bg-no-repeat bg-center rounded-sm overflow-hidden shadow-md"
            style={{backgroundImage: `url(${store.avatar || EmptyAvatar})`}}
          >
        </div>
      </a>
      <div className="absolute right-0 bottom-0 left-0 pb-2 pl-3 pr-3 flex justify-between">
        <div>
          {
            store.tag.split(';').map( (tag, index) => (
              <Tag minimal className="mr-1 text-gray-500" key={index}>
                <span className="text-gray-500 text-xs">{tag}</span>
              </Tag>
            ))
          }
        </div>
        <div>
          <Tooltip 
            content={
              <div className="w-64">
                <p className="text-xs">
                  {`${store.date} 收藏`}
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

export default StoreItem;