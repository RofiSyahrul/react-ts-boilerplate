import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

const Home = lazy(() => import(/* webpackChunkName: "page-home" */ './home'));

const Pages: React.FC = () => {
  return (
    <Suspense fallback=''>
      <Switch>
        <Route path='/' exact component={Home} />
      </Switch>
    </Suspense>
  );
};

export default Pages;
