import { BrowserRouter as Router, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Suspense, useEffect, useRef, type ReactNode } from 'react';
import { Preloader, Slots, Error, Slot, SlotPlay, SlotDemo } from './pages';
import { Header } from './widgets';
import { ROUTES } from './shared/config/routes';
import { useTelegramBackButton } from './shared/hooks/useTelegramBackButton';

const AppLayout = () => {
  useTelegramBackButton();

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

const TelegramBackButtonWrapper = ({ children }: { children: ReactNode }) => {
  useTelegramBackButton();
  return <>{children}</>;
};

const RedirectToPreloader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    // Проверяем, была ли это перезагрузка страницы
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const isPageReload = navigationEntry?.type === 'reload';

    // Если это перезагрузка и мы не на прелоадере или странице ошибки, перенаправляем на прелоадер
    if (isPageReload && location.pathname !== ROUTES.ROOT && location.pathname !== ROUTES.ERROR) {
      navigate(ROUTES.ROOT, { replace: true });
    }
  }, [navigate, location.pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <RedirectToPreloader />
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

export default App;
