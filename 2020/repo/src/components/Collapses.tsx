import React, { useState } from 'react';
import { Collapse, Icon } from '@blueprintjs/core';

interface CollapsesProps {
  defaultOpen?: number
  items: {
    title: string
    content: React.ReactNode | string
  }[]
}

function Collapses(props: CollapsesProps) {
  
  const { items, defaultOpen } = props;
  const [openIndex, setOpenIndex] = useState(defaultOpen ? defaultOpen - 1 : -1);

  return (
    <div>
      {
        items.map( (item, index) => {
          const isOpen = index === openIndex;
          return (
            <div key={index} className="border-t">
              <h4 
                className="w-full text-sm py-2 cursor-pointer"
                onClick={() => {
                  setOpenIndex(index);
                }}
              >
                {item.title}
                <Icon className="float-right text-gray-400" icon={ isOpen ? 'small-minus' : 'small-plus'} />
              </h4>
              <Collapse isOpen={isOpen}>
                <div className="pb-2">
                  {item.content}
                </div>
              </Collapse>
            </div>
          )
        })
      }

    </div>
  )
}

export default Collapses;