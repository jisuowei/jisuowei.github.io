import React, { useState, useEffect } from 'react'
import Centainer from '../components/layout/Centainer'
import API from '../api'
import Loading from '../components/Loading'
import StoreItem from '../components/StoreItem'
import { IStore } from '../types'
import { Layout } from 'element-react'
import Collapses from '../components/Collapses'
import { Tag } from '@blueprintjs/core'

function StorePage() {

  const [res, setRes] = useState<any>({});
  const [requesting, setRequesting] = useState(false);
  const [index, setIndex] = useState(0);

  const stores = res.rows || [];
  const count = stores.length || 0;

  useEffect( () => {
    API.fetch('stores', { type: index }, setRes );
    setRequesting(true);
  }, [index]);

  useEffect( () => {
    setRequesting(false);
  }, [stores]);

  interface SideTagProps {
    text: string
    index: number
  }

  const SideTag = (props: SideTagProps) => {

    const { text, index: tagIndex } = props;

    return (
      <Tag
        minimal
        interactive
        active={tagIndex === index}
        className="mr-1 mb-1"
        onClick={() => {
          setIndex(tagIndex);
        }}
      >
        <span className="text-gray-700">{text}</span>
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
              <span className="text-gray-400"> ITEMS IN</span>
            </div>
            <Collapses
              defaultOpen={1}
              items={[
                {
                  title: '分类',
                  content: 
                    <div>
                      <SideTag text="链接" index={0} />
                      <SideTag text="视频" index={1} />
                      <SideTag text="文件" index={2} />
                    </div>
                },
              ]}
            />
          </Layout.Col>
          <Layout.Col span="19">
            {
              stores.length === 0
                ? <Loading isLoading={true} />
                : (
                  <>
                    <div className="relative flex flex-wrap justify-between min-h-320">
                      {
                        stores.map( (store: IStore ) => (
                          <StoreItem key={store.id} store={store} />
                        ))
                      }
                    </div>
                  </>
                )
            }

          </Layout.Col>
        </Layout.Row>
      </Centainer>
    </>
  )
}

export default StorePage;