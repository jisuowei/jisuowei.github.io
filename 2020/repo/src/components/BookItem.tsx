import React from 'react';
import { IBook } from '../types';
import { Icon, Tag, Tooltip, Divider } from '@blueprintjs/core';
import { bookTags, bookPubs } from '../ts/enum';
import BookDrawer from '../components/BookDrawer';

interface BookItemProps {
  book: IBook
}

function BookItem(props: BookItemProps) {

  const { book } = props;

  return (
    <div className="book-item relative mb-5 shadow overflow-hidden">
      <div
        className="absolute top-0 right-0 bottom-0 left-0 bg-no-repeat bg-center blur-10 opacity-25"
        style={{backgroundImage: `url(${book.avatar})`, backgroundSize: '110%'}}
      />
      <div 
        className="absolute bottom-0 w-full h-16 bg-white"
      >
        {
          book.lv !== '0.0' && (
            <div className="relative ml-24 mt-1 text-yellow-500">
              <div className="absolute">
                <Icon icon="star-empty" iconSize={12} />
                <Icon icon="star-empty" iconSize={12} />
                <Icon icon="star-empty" iconSize={12} />
                <Icon icon="star-empty" iconSize={12} />
                <Icon icon="star-empty" iconSize={12} />
              </div>
              <div 
                className="absolute overflow-hidden whitespace-no-wrap" 
                style={{width: (Number(book.lv) || 0) / 5 * 60}}
              >
                <Icon icon="star" iconSize={12} />
                <Icon icon="star" iconSize={12} />
                <Icon icon="star" iconSize={12} />
                <Icon icon="star" iconSize={12} />
                <Icon icon="star" iconSize={12} />
              </div>
              <span className="inline-block ml-16 mt-1 text-xs text-yellow-500">{book.lv}</span>
            </div>
          )
        }
      </div>
      <div className="absolute pl-24 pt-3 pr-3 text-xs border-box w-full">
        <p>{book.title}</p>
        <p
          title={book.author} 
          className="text-gray-600 mt-1 truncate">
          {book.author}
        </p>
      </div>
      <a href={`http://www.duokan.com/reader/www/app.html?id=${book.dkid}`} target="_blank" rel="noopener noreferrer">
        <div
            className="item-avatar absolute bg-cover bg-no-repeat bg-center rounded-sm overflow-hidden shadow-md"
            style={{backgroundImage: `url(${book.avatar})`}}
          >
        </div>
      </a>
      <div className="absolute right-0 bottom-0 left-0 pb-2 pl-3 pr-3 flex justify-between">
        <div>
          {
            book.tag.split(';').map( (tag, index) => (
              <Tag minimal className="mr-1 text-gray-500" key={index}>
                <span className="text-gray-500 text-xs">{bookTags[+tag]}</span>
              </Tag>
            ))
          }
        </div>
        <div>
          {
            (book.xdate && book.xdate !== '0000-00-00') && (
              <Tooltip content={<span className="text-xs">{book.xdate} 读完 点击查看笔记</span>} position="bottom">
                <BookDrawer book={book}>
                  <Tag minimal interactive round className="mr-1">
                    <Icon icon="edit" iconSize={14} className="text-gray-600" />
                  </Tag>
                </BookDrawer>
              </Tooltip>
            )
          }
          <Tooltip 
            content={
              <div className="w-64">
                <p className="text-xs">
                  {`${book.date} 购买`}
                  <span className="float-right">{`@${book.user}`}</span>
                </p>
                <Divider />
                <p className="text-xs">
                  {`${bookPubs[+book.publisher]}出版 ${book.editor ? ` | ${book.editor} 编/译` : ''}`}
                </p>
                {
                  book.detail && (
                    <>
                      <Divider />
                      <p className="text-xs mb-1">章节概要：</p>
                      <p className="text-xs text-justify">{book.detail}</p>
                    </>
                  )
                }
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

export default BookItem;