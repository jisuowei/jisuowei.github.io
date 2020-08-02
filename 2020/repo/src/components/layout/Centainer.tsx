import React from 'react';
import Loading from '../Loading';

interface ICentainerProps {
  children?: React.ReactNode
  className?: string
  isLoading?: boolean
}

function Centainer( props: ICentainerProps ) {
  const { isLoading } = props;

  return (
    <div className={`center-container relative mx-auto sm:max-w-480 md:max-w-640 lg:max-w-1000 xl:max-w-1200 ${props.className || ''}`}>
      { props.children }
      {
        isLoading && ( <Loading className="bg-gray-100 opacity-75" isLoading={isLoading} /> )
      }
    </div>
  )
}

export default Centainer;