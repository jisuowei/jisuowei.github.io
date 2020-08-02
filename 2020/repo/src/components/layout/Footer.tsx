import React, { useState } from 'react';
import Centainer from './Centainer';
import Logo from '../../images/logo_dark.svg';
import FA from '../FA';
import { Tooltip } from '@blueprintjs/core';
import { animateScroll as scroll } from 'react-scroll';

function Footer() {

  const [show, setShow] = useState(false);

  let timer_scroll: any = null;

  window.addEventListener('scroll', () => {
    if (!timer_scroll) {
      timer_scroll = setTimeout(() => {

        const top = document.documentElement.scrollTop;

        if (top > 60) {
          setShow(true)
        } else {
          setShow(false)
        }

        timer_scroll = null;

      }, 360); 
    }
  })

  return (
    <div className="border-t border-gray-300 py-12">

      <div 
        className={`fixed w-12 h-12 flex items-center justify-center cursor-pointer text-2xl text-gray-400 hover:text-gray-500 ${show ? 'block' : 'hidden'}`}
        style={{
          left: '50%', 
          marginLeft: 620, 
          bottom: 60 
        }}
        onClick={() => {
          scroll.scrollToTop()
        }}
      >
        <FA icon="arrowUp" />
      </div>

      <Centainer>
        <div className="flex">
          <div>
            <img className="w-40" src={Logo} alt="logo" />
            <p className="mt-8 text-sm text-gray-600">奇斯威克 · 点燃你的狂热</p>
            <p className="mt-2 text-sm text-gray-600">
              © 2014-2020 jisuowei.com
              <a className="ml-2" href="http://www.beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">苏ICP证15046910号</a>
            </p>
          </div>
          <div className="flex-grow pl-32">
            <label className="text-base text-gray-500 font-dinc">CONTACT</label>
            <p className="mt-2 mb-6 leading-loose">
              <Tooltip className="mr-4" content={<span className="text-xs">Chisw</span>}>
                <a
                  className="text-2xl text-gray-600 inline-block w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 hover:text-gray-600 flex content-center justify-center"
                  target="_blank" rel="noopener noreferrer" 
                  href="https://github.com/chisw"
                >
                  <FA className="mt-2" icon="github" />
                </a>
              </Tooltip>
              <Tooltip className="mr-4" content={<span className="text-xs">@奇斯威克</span>}>
                <a
                  className="text-2xl text-gray-600 inline-block w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 hover:text-gray-600 flex content-center justify-center"
                  target="_blank" rel="noopener noreferrer" 
                  href="https://weibo.com/chiswick"
                >
                  <FA className="mt-2" icon="weibo" />
                </a>
              </Tooltip>
              <Tooltip className="mr-4" content={<span className="text-xs">嵇所伟</span>}>
                <a
                  className="text-2xl text-gray-600 inline-block w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 hover:text-gray-600 flex content-center justify-center"
                  target="_blank" rel="noopener noreferrer" 
                  href="https://cn.linkedin.com/in/jisuowei"
                >
                  <FA className="mt-2" icon="linkedin" />
                </a>
              </Tooltip>
              <Tooltip className="mr-4" content={<span className="text-xs">i@jisuowei.com</span>}>
                <a
                  className="text-2xl text-gray-600 inline-block w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 hover:text-gray-600 flex content-center justify-center"
                  target="_blank" rel="noopener noreferrer" 
                  href="mailto:i@jisuowei.com"
                >
                  <FA className="mt-2" icon="envelope" />
                </a>
              </Tooltip>
            </p>
            <label className="text-base text-gray-500 font-dinc">LINKS</label>
            <p className="mt-2 mb-6 leading-loose">
              <a className="mr-4 text-sm inline-block" target="_blank" rel="noopener noreferrer" href="https://www.google.cn/intl/zh-CN/chrome/">Chrome</a>
              <a className="mr-4 text-sm inline-block" target="_blank" rel="noopener noreferrer" href="http://duokan.com">多看阅读</a>
              <a className="mr-4 text-sm inline-block" target="_blank" rel="noopener noreferrer" href="https://www.duohui.cn">多会</a>
              <a className="mr-4 text-sm inline-block" target="_blank" rel="noopener noreferrer" href="https://www.pomotodo.com">番茄土豆</a>
            </p>
          </div>
        </div>
      </Centainer>
    </div>
  )
}

export default Footer;