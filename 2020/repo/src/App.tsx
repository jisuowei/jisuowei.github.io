import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import 'element-theme-default'

import Layout from './components/layout/Layout'

import HomePage from './pages/HomePage'
import ArticlePage from './pages/ArticlePage'
import ArticleContent from './pages/ArticleContent'
import ReadPage from './pages/ReadPage'
import RidePage from './pages/RidePage'
import StorePage from './pages/StorePage'
import AppPage from './pages/AppPage'

import NotFound from './pages/NotFound'

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Switch>

          <Route exact path="/2020" component={HomePage} />
          <Route exact path="/2020/article" component={ArticlePage} />
          <Route exact path="/2020/article/:id" component={ArticleContent} />
          <Route exact path="/2020/read" component={ReadPage} />
          <Route exact path="/2020/ride" component={RidePage} />
          <Route exact path="/2020/store" component={StorePage} />
          <Route exact path="/2020/app" component={AppPage} />
          <Route component={NotFound}/>

        </Switch>
      </Layout>
    </Router>
  );
}

export default App
