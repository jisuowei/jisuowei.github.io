import React, { useState, useEffect } from 'react';
import Centainer from '../components/layout/Centainer';
import EmptyAvatar from '../images/empty_avatar.jpg';
import API from '../api';
import Loading from '../components/Loading';
import  { Breadcrumbs, IBreadcrumbProps } from '@blueprintjs/core';

function ArticleContent(props: any) {

  const id = props.match.params.id

  const [res, setRes] = useState<any>({})
  const article = res.data ? res.data[0] : null

  useEffect(() => {
    API.fetch('article', {id: id}, setRes)
  }, [id])

  const breadcrumbs: IBreadcrumbProps[] = [
    { href: '/article', text: '文章'},
    { text: article ? article.title : ''},
  ]
  
  return (
    <>
      <Centainer>

        <Breadcrumbs
          items={breadcrumbs}
          className="mb-4"
        />

        <div className="bg-white shadow-md">
          {
            article
              ? (
                <>
                  <div
                    className="h-96 bg-cover bg-center bg-no-repeat"
                    style={{backgroundImage: `url(${article.avatar || EmptyAvatar})`}}
                  />
                  <div className="px-20 py-12">
                    <h3 className="text-lg my-4">{article.title}</h3>
                    <p className="text-gray-500 text-xs mb-8">{article.date}</p>
                    <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>')}} className="public-DraftEditor-content" />
                  </div>
                </>
              )
              : <Loading isLoading={true} />
          }

        </div>
      </Centainer>
    </>
  )
}

export default ArticleContent