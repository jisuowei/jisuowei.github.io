import React, { useState, useEffect } from 'react';
import { Drawer } from '@blueprintjs/core';
import Loading from './Loading';
import API from '../api';
import EmptyAvatar from '../images/empty_avatar.jpg';

interface IArticleDrawer {
  id: string
  children: React.ReactNode
}

function ArticleDrawer(props: IArticleDrawer) {

  const { id, children } = props;
  const [open, setOpen] = useState(false);
  const [res, setRes] = useState<any>({});
  const article = res.rows ? res.rows[1] : null;

  useEffect(() => {
    open && API.fetch('article', {id: id}, setRes);
  }, [open, id]);

  const ContentBox = (props: {entry: any}) => {
    const { entry } = props;
    return (
      <div className="overflow-auto">
        <div
          className="h-96 bg-cover bg-center bg-no-repeat"
          style={{backgroundImage: `url(${entry.avatar || EmptyAvatar})`}}
        />
        <div className="px-20 py-12">
          <h3 className="text-lg my-4">{entry.title}</h3>
          <p className="text-gray-500 text-xs mb-8">{entry.date}</p>
          <div dangerouslySetInnerHTML={{__html: entry.content.replace(/\n/g, '<br/>')}} className="public-DraftEditor-content" />
        </div>
      </div>
    )
  }

  return (
    <>
      <Drawer
        style={{minWidth: 800}}
        isOpen={open} 
        onClose={() => { 
          setOpen(false);
        }}
      >
        {
          article
            ? <ContentBox entry={article} />
            : <Loading isLoading={true} />
        }
      </Drawer>
      <a 
        href={`/article/${id}`} 
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => {
          event.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </a>
    </>
  )
}

export default ArticleDrawer;