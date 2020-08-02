import React from 'react';
import Centainer from '../components/layout/Centainer';

function NotFound() {
  return (
    <>
      <Centainer>
        <div className="h-96 pt-12 text-gray-500 text-center">
          <p className="text-3xl pt-12 pb-4">彡(-_-;)彡</p>
          <p className="text-base">页面找不到了，或者正在建设中..</p>
          <p className="text-xl text-gray-300 pt-8 pb-4">404 Not Found</p>
        </div>
      </Centainer>
    </>
  )
}

export default NotFound;