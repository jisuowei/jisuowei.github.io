import React from 'react';
import Navi from './Navi';
import Footer from './Footer';

interface ILayoutProps {
  children: React.ReactNode
}

function Layout(props: ILayoutProps) {
  return (
    <>
      <Navi />
        <div className="f-width bg-gray-100 py-10">
          {props.children}
        </div>
      <Footer />
    </>
  )
}

export default Layout;