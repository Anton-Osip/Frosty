import { BrowserRouter as Router, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { Preloader, Slots, Error, Slot, SlotPlay, SlotDemo } from './pages';
import { Header } from './widgets';
import { ROUTES } from './shared/config/routes';

const AppLayout = () => (
  <div className='page'>
    <Header />
    <main className='content'>
      <Suspense fallback={<Preloader />}>
        <Outlet />
      </Suspense>
    </main>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.ROOT} element={<Preloader />} />
        <Route element={<AppLayout />}>
          <Route path={ROUTES.SLOTS} element={<Slots />} />
          <Route path={ROUTES.SLOT} element={<Slot />} />
        </Route>
        <Route path={ROUTES.SLOT_PLAY} element={<SlotPlay />} />
        <Route path={ROUTES.SLOT_DEMO} element={<SlotDemo />} />
        <Route path={ROUTES.ERROR} element={<Error />} />
        <Route path='*' element={<Navigate to={ROUTES.ERROR} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
