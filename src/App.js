import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Router/routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App max-w-[1350px] mx-auto">
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
