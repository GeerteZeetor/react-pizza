import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './scss/app.scss';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';

const Cart = React.lazy(() =>
  import('./pages/Cart').then(({ Cart }) => ({ default: Cart }))
);
const FullPizza = React.lazy(() =>
  import('./pages/FullPizza').then(({ FullPizza }) => ({ default: FullPizza }))
);
const NotFound = React.lazy(() =>
  import('./pages/NotFound').then(({ NotFound }) => ({ default: NotFound }))
);

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />

          <Route
            path="cart"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Cart />
              </Suspense>
            }
          />

          <Route
            path="pizza/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <FullPizza />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
