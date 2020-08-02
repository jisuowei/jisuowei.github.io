import React from 'react';
import { IArticleItem } from '../types';
import ArticleDrawer from './ArticleDrawer';
import EmptyAvatar from '../images/empty_avatar.jpg';

function ArticleItem(props: IArticleItem) {

  const { id, title, date, avatar } = props;
  
  return (
    <div 
      title={title}
      className="mb-6 bg-white shadow-md hover:shadow-xl article-item" 
    >
      <ArticleDrawer id={id} >
        <div 
          style={{backgroundImage: `url(${avatar || EmptyAvatar})`}} 
          className="bg-cover bg-no-repeat bg-center w-full h-32"
        />
        <div className="px-4 py-2">
          <h5 className="text-lg truncate">{title}</h5>
          <p className="mt-2 text-sm text-gray-500">{date}</p>
        </div>
      </ArticleDrawer>
    </div>
  )
}

export default ArticleItem;