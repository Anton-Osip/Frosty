import { BrowserRouter as Router, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Suspense, useEffect, type ReactNode } from 'react';
import { Preloader, Slots, Error, Slot, SlotPlay, SlotDemo } from './pages';
import { Header } from './widgets';
import { ROUTES } from './shared/config/routes';
import { useTelegramBackButton } from './shared/hooks/useTelegramBackButton';
import { useBalanceStore, useAuthStore } from './shared/stores';

const AppLayout = () => {
  useTelegramBackButton();
  
  const { fetchBalance } = useBalanceStore();
  const { userId } = useAuthStore();

  useEffect(() => {
    if (userId) {
      fetchBalance(userId);
      
      const intervalId = setInterval(() => {
        fetchBalance(userId);
      }, 5000);
      
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [fetchBalance, userId]);

  return (
    <div className='page'>
      <Header />
      <main className='content'>
        <Suspense fallback={<Preloader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.ROOT} element={<Preloader />} />
        <Route element={<AppLayout />}>
          <Route path={ROUTES.SLOTS} element={<Slots />} />
          <Route path={ROUTES.SLOT} element={<Slot />} />
        </Route>
        <Route
          path={ROUTES.SLOT_PLAY}
          element={
            <TelegramBackButtonWrapper>
              <SlotPlay />
            </TelegramBackButtonWrapper>
          }
        />
        <Route
          path={ROUTES.SLOT_DEMO}
          element={
            <TelegramBackButtonWrapper>
              <SlotDemo />
            </TelegramBackButtonWrapper>
          }
        />
        <Route
          path={ROUTES.ERROR}
          element={
            <TelegramBackButtonWrapper>
              <Error />
            </TelegramBackButtonWrapper>
          }
        />
        <Route path='*' element={<Navigate to={ROUTES.ERROR} replace />} />
      </Routes>
    </Router>
  );
}

const TelegramBackButtonWrapper = ({ children }: { children: ReactNode }) => {
  useTelegramBackButton();
  return <>{children}</>;
};

export default App;
