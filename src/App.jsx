import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home/Home';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
);

export default App;
