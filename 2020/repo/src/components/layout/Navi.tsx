import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Button } from '@blueprintjs/core'
import { Omnibar } from '@blueprintjs/select'
import Centainer from './Centainer'
import Logo from '../../images/logo_dark.svg'

export default function Navi() {

  const navis = [
    { text: '文章', to: '/2020/article' },
    { text: '阅读', to: '/2020/read' },
    { text: '骑行', to: '/2020/ride' },
    { text: '库藏', to: '/2020/store' },
    { text: '应用', to: '/2020/app' },
  ]

  const [omnibarShow, setOmnibarShow] = useState(false)

  return (
    <div>
      <Navbar>
        <Centainer className="h-full">

          <Navbar.Group>

            <Navbar.Heading>
              <NavLink to="/2020">
                <img className="w-16" src={Logo} alt="logo" />
              </NavLink>
            </Navbar.Heading>

            {
              navis.map( navi => (
                <NavLink strict to={navi.to} key={navi.to} activeClassName="active">
                  <Button
                    minimal
                    className="mx-1 font-navi"
                    text={navi.text}
                  />
                </NavLink>
              ))
            }

          </Navbar.Group>
        </Centainer>
      </Navbar>

      <Omnibar
        isOpen={omnibarShow}
        inputProps={{
          rightElement: <Button minimal icon="cross" onClick={() => { setOmnibarShow(false) }} />,
          className: 'm-4',
          style: {
            width: 360,
          }
        }}
        overlayProps={{
          className: 'w-full h-100vh',
          canEscapeKeyClose: true,
        }}
        items={[
          { label: '嵇所伟', value: 'jisuowei' },
          { label: '开发中', value: 'developing' },
        ]}
        itemRenderer={(item: any) => {
          return (
            <div>
              {item.label}
            </div>
          )
        }}
        onItemSelect={() => {}}
      />

    </div>
  )
}
