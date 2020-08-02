import React, { useState, useEffect } from 'react';
import Centainer from '../components/layout/Centainer';
import Loading from '../components/Loading';
import ArticleItem from '../components/ArticleItem';
import { IArticleItem } from '../types';
import API from '../api';

function ArticlePage() {
  
  const [res, setRes] = useState<any>([]);
  const articles = res.rows || [];
  
  useEffect( () => {
    API.fetch('articles', null, setRes);
  }, []);

  return (
    <>
      <Centainer>
        <div className="flex flex-wrap justify-between min-h-320">
          {
            articles.length === 0
              ? <Loading isLoading={true} />
              : (
                <>
                  {
                    articles.map( ( article: IArticleItem ) => (
                      <ArticleItem key={article.id} {...article} />
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

export default ArticlePage;