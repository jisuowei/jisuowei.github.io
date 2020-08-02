import React from 'react';
import { Spinner } from '@blueprintjs/core';

interface ILoadingProps {
  isLoading: boolean
  className?: string
}

export default function Loading(props: ILoadingProps) {
  return props.isLoading
    ? (
      <div className={`absolute top-0 right-0 bottom-0 left-0 z-20 flex justify-center ${props.className}`}>
        <Spinner />
      </div>
    )
    : <></>
}