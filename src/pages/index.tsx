import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Spinner from '@atoms/spinner';

const Home = lazy(() => import(/* webpackChunkName: "page-home" */ './home'));
const NotFound = lazy(
  () => import(/* webpackChunkName: "page-404" */ './error/not-found')
);

const Pages: React.FC = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};

export default Pages;
