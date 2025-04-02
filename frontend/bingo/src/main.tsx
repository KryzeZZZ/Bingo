import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.scss'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
        <div className="moon-container">
            <img className={"moon"} src={"/bg-moon.png"}></img>
        </div>
    </StrictMode>,
)
