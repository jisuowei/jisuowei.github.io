import React from 'react';
import { Button, ButtonGroup, Icon } from '@blueprintjs/core';

export interface PaginationProps {
  pageSize: number
  count: number
  current: number
  onChange: (index: number) => void
  align?: 'left' | 'center' | 'right'
  className?: string
}

function Pagination(props: PaginationProps) {
  
  const { pageSize, count, current, onChange, align, className } = props;
  const pages = Math.ceil( count / pageSize );
  const prev = current - 1;
  const next = current + 1;
  
  const FIRST = 1;
  const GROUP = [0, 1, 2, 3, 4];
  const GROUP_OFFSET = 2;
  const DEFAULT_GROUP_LEN = GROUP.length;
  const DEFAULT_GROUP_START = 2;
  let isLong = true;
  let groupStart = 0;
  let groupLen   = 0;
  let groupEnd   = 0;

  if ( pages <= 7 ) {
    isLong = false;
    groupStart = DEFAULT_GROUP_START;
    groupLen = pages - groupStart
  } else {
    const lastGroupStart = pages - DEFAULT_GROUP_LEN;
    groupStart = Math.max(current - GROUP_OFFSET, DEFAULT_GROUP_START);
    groupStart = Math.min(groupStart, lastGroupStart);
    groupLen = Math.min(pages - groupStart, DEFAULT_GROUP_LEN);
    groupEnd = groupStart + groupLen;
  }

  return (
    <div className={`pagination text-${align || 'center'} ${className}`}>

      <ButtonGroup>

        <Button onClick={() => { onChange(prev) }} disabled={current === FIRST}>
          <Icon icon="chevron-left" />
        </Button>

        <Button onClick={() => { onChange(FIRST) }} active={current === FIRST}>{FIRST}</Button>

        { 
          isLong && groupStart >= ( FIRST + GROUP_OFFSET ) && ( 
            <Button className="more" minimal disabled><Icon icon="more" /></Button> 
          )
        }

        {
          GROUP.map( index => {
            const page = groupStart + index;
            if ( index < groupLen ) {
              return (
                <Button key={index} onClick={() => { onChange(page) }} active={page === current}>{page}</Button>
              )
            } else {
              return '';
            }
          })
        }

        { 
          isLong && groupEnd < pages && (
            <Button className="more" minimal disabled><Icon icon="more" /></Button>
          )
        }

        {
          pages !== FIRST && (
            <Button active={current === pages} onClick={() => { onChange(pages) }}>{pages}</Button>
          )
        }

        <Button onClick={() => { onChange(next) }} disabled={current === pages}>
          <Icon icon="chevron-right" />
        </Button>

      </ButtonGroup>

    </div>
  )
}

export default Pagination;