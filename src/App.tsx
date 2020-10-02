import { Footer, Header, Router } from '@components/core';
import { store } from '@store';
import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect, Provider } from 'react-redux';
import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={null}>
        <WrappedMain />
      </Suspense>
    </Provider>
  );
}

function Main() {
  return (
    <>
      <div className="main-wrapper">
        <Header />
        <main className="router-context">
          <Router />
        </main>
      </div>
      <Footer />
    </>
  );
}

export const WrappedMain = connect()(Main);
export default hot(App);
