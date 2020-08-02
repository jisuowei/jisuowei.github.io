import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Centainer from '../components/layout/Centainer';
import { Carousel } from 'element-react';
import { IArticleItem } from '../types';
import ArticleItem from '../components/ArticleItem';
import Loading from '../components/Loading';
import API from '../api';
import bannerDuohui from '../images/banner/duohui.png';
import bannerPomotodo from '../images/banner/pomotodo.png';
import bannerPanoda from '../images/banner/panoda.png';
import bannerGaoyou from '../images/banner/gaoyou.png';


function HomePage() {

  const banners = [
    { img: bannerDuohui, url: 'https://www.duohui.cn/' },
    { img: bannerPomotodo, url: 'https://www.pomotodo.com/' },
    { img: bannerPanoda, url: 'https://panoda.jisuowei.com/' },
    { img: bannerGaoyou, url: 'https://zhi.gaoyou.online/' },
  ]

  const [res, setRes] = useState<any>({});
  const articles = res.rows || [];

  useEffect( () => {
    API.fetch('articles', null, setRes);
  }, []);

  return (
    <>
      <Centainer>
        <Carousel height="120px" className="shadow-md" indicatorPosition="none" interval={4000}>
          {
            banners.map((item, index) => {
              return (
                <Carousel.Item key={index}>
                  <a 
                    target="_blank" 
                    href={item.url} 
                    rel="noopener noreferrer"
                    className="block w-full h-full bg-cover bg-no-repeat bg-center cursor-pointer"
                    style={{backgroundImage: `url(${item.img})`}}
                  >
                    <></>
                  </a>
                </Carousel.Item>
              )
            })
          }
        </Carousel>

        <h4 className="text-xl text-gray-500 mt-6 mb-4">
          最近更新
        </h4>
        <div className="relative flex flex-wrap justify-between min-h-320">
          {
            articles.length === 0
              ? <Loading isLoading={true} />
              : (
                <>
                  {
                    articles.slice(0, 7).map( ( article: IArticleItem ) => (
                      <ArticleItem key={article.id} {...article} />
                    ))
                  }
                  <Link 
                    to="/article" 
                    className="block mb-6 bg-white shadow-md text-center hover:shadow-xl article-item" 
                  >
                    <i className="el-icon-more text-6xl text-gray-500 mt-16"></i>
                  </Link>
                </>
              )
          }
        </div>
      </Centainer>
    </>
  )
}

export default HomePage;