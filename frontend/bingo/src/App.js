import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login'; // 假设LoginPage在pages文件夹下，根据实际路径调整
import Bingo from './pages/bingo';
import Video from './pages/video';
function App() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/bingo", element: _jsx(Bingo, {}) }), _jsx(Route, { path: "/video", element: _jsx(Video, {}) })] }) }));
}
export default App;
