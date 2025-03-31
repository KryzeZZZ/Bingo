import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import LoginPage from './pages/login'; // 假设LoginPage在pages文件夹下，根据实际路径调整
import Bingo from './pages/bingo';
import Video from './pages/video'

function App() {
  return (
    <Router>
      <Routes>
        {/* 配置/team路径对应LoginPage */}
        <Route path="/team" element={<LoginPage />} /> 
        {/* 可以添加其他路径配置 */}
        <Route path="/bingo" element={<Bingo />} />
        <Route path="/video" element={<Video />} />
      </Routes>
    </Router>
  );
}

export default App;