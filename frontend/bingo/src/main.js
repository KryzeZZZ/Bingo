import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
createRoot(document.getElementById('root')).render(_jsxs(StrictMode, { children: [_jsx(App, {}), _jsx("img", { className: "moon", src: "/bg-moon.png" })] }));
