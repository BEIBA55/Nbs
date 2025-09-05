import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ToastContainer from './components/ui/ToastContainer';
import Routes from './Routes';

// Создаем экземпляр QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
