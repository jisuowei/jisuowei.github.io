import React, { useState, useEffect } from 'react'
import Centainer from '../components/layout/Centainer'
import API from '../api'
import Loading from '../components/Loading'
import BookItem from '../components/BookItem'
import { IBook } from '../types'
import { Layout } from 'element-react'
import Pagination from '../components/Pagination'
import * as Scroll from 'react-scroll'
import Collapses from '../components/Collapses'
import { Tag } from '@blueprintjs/core'
import { bookTags, bookAuthors, bookSeries, bookPubs } from '../ts/enum'

const scroll = Scroll.animateScroll

function ReadPage() {

  const [res, setRes] = useState<any>({})
  const [key, setKey] = useState('')
  const [val, setVal] = useState('')
  const [pageNo, setPageNo] = useState(1)
  const [requesting, setRequesting] = useState(false)
  const [activeTag, setActiveTag] = useState('all')

  const books = res.rows || []
  const count = res.count || 0
  const pageSize = 20

  useEffect( () => {
    API.fetch(
      'books',
      {
        key: key || 'all',
        val: val || 'all',
        size: pageSize,
        current: pageNo || 1
      },
      setRes
    )
    setRequesting(true)
  }, [pageNo, key, val])

  useEffect( () => {
    setRequesting(false)
  }, [books])

  interface SideTagProps {
    text: string
    keyName: string
    val: string
  }

  const SideTag = (props: SideTagProps) => {

    const { text, keyName, val } = props

    return (
      <Tag
        minimal={activeTag !== val}
        interactive
        intent={(activeTag === val) ? 'primary' : 'none'}
        className="mr-1 mb-1"
        onClick={() => {
          setPageNo(1)
          setKey(keyName)
          setVal(val)
          setActiveTag(val)
        }}
      >
        {text}
      </Tag>
    )
  }
  
  return (
    <>
      <Centainer isLoading={requesting}>
        <Layout.Row gutter="20">
          <Layout.Col span="5">
            <div className="mb-3 text-3xl font-dinc">
              <span className="text-gray-700">{count}</span>
              <span className="text-gray-400"> BOOKS IN</span>
            </div>
            <Collapses
              defaultOpen={1}
              items={[
                {
                  title: '概览',
                  content: 
                    <div>
                      <SideTag text="全部已购" keyName="all" val="all" />
                      <SideTag text="读完" keyName="finish" val="finish" />
                      <SideTag text="鸡哥力荐" keyName="recommend" val="reco" />
                    </div>
                },
                {
                  title: '分类',
                  content:
                    <div>
                      {
                        bookTags.slice(0, -1).map( (tag, index) => (
                          <SideTag key={index} text={tag} keyName="tag" val={`${index}`} />
                        ))
                      }
                    </div>
                },
                {
                  title: '作者',
                  content:
                    <div>
                      {
                        bookAuthors.map( (author, index) => (
                          <SideTag key={index} text={author} keyName="search" val={`${author}`} />
                        ))
                      }
                    </div>
                },
                {
                  title: '系列',
                  content:
                    <div>
                      {
                        bookSeries.map( (series, index) => (
                          <SideTag key={index} text={series} keyName="search" val={`${series}`} />
                        ))
                      }
                    </div>
                },
                {
                  title: '出版社',
                  content: 
                    <div>
                      {
                        bookPubs.slice(0,32).map( (pub, index) => (
                          <SideTag key={index} text={pub} keyName="publisher" val={`${index}`} />
                        ))
                      }
                    </div>
                },
              ]}
            />
          </Layout.Col>
          <Layout.Col span="19">
            {
              books.length === 0
                ? <Loading isLoading={true} />
                : (
                  <>
                    <div className="relative flex flex-wrap justify-between min-h-320">
                      {
                        books.map( (book: IBook ) => (
                          <BookItem key={book.id} book={book} />
                        ))
                      }
                    </div>
                    <Pagination
                      className="mt-4"
                      pageSize={pageSize}
                      count={count}
                      current={pageNo}
                      onChange={ index => {
                        scroll.scrollToTop({smooth: true, duration: 200})
                        setPageNo(index)
                      }}
                    />
                  </>
                )
            }

          </Layout.Col>
        </Layout.Row>
      </Centainer>
    </>
  )
}

export default ReadPage