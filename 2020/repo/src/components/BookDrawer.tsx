import React, { useState, useEffect } from 'react';
import { Drawer, Icon } from '@blueprintjs/core';
import Loading from './Loading';
import API from '../api';
import { IBook } from '../types';

interface IBookDrawer {
  book: IBook
  children: React.ReactNode
}

function BookDrawer(props: IBookDrawer) {

  const { book, children } = props;
  const [open, setOpen] = useState(false);
  const [res, setRes] = useState<any>({});
  const notes = res.rows ? res.rows : [];

  useEffect(() => {
    open && API.fetch('bookNote', {id: book.id}, setRes);
  }, [open, book]);

  return (
    <>
      <Drawer
        position="left"
        style={{minWidth: 640}}
        isOpen={open} 
        onClose={() => { 
          setOpen(false);
        }}
      >
        <div className="overflow-auto px-12 py-8">
          {
            notes.length === 0
              ? <Loading isLoading={true} />
              : (
                <>
                  <div className="mb-4">
                    <h3 className="text-2xl">
                      {book.title}
                      <span className="float-right text-gray-400">
                        <Icon icon="bookmark" className="mr-1" iconSize={24} />
                        &times; {notes.length}
                      </span>
                    </h3>
                    <p className="text-base text-gray-600 py-4">{book.author}</p>
                  </div>
                  {
                    notes.map( (note: any) => (
                      <div className="border-b border-gray-300 border-dashed py-3" key={note.id}>
                        <p className="text-gray-500 text-xs">
                          {note.date}
                        </p>
                        <p className="text-justify mt-2 leading-normal">{note.content}</p>
                      </div>
                    ))
                  }
                  <div className="text-gray-400 mt-6 text-xs text-center">{book.id}</div>
                </>
              )

          }
        </div>
      </Drawer>
      <span 
        onClick={() => {
          setOpen(true);
        }}
      >
        {children}
      </span>
    </>
  )
}

export default BookDrawer;