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

          <Route exact path="/" component={HomePage} />
          <Route exact path="/article" component={ArticlePage} />
          <Route exact path="/article/:id" component={ArticleContent} />
          <Route exact path="/read" component={ReadPage} />
          <Route exact path="/ride" component={RidePage} />
          <Route exact path="/store" component={StorePage} />
          <Route exact path="/app" component={AppPage} />
          <Route exact path="/app/:name" component={AppPage} />

          <Route component={NotFound}/>

        </Switch>
      </Layout>
    </Router>
  );
}

export default App
