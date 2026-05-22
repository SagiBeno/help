import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Theme } from '@radix-ui/themes';
import { BrowserRouter } from 'react-router-dom';
import "@radix-ui/themes/styles.css";

createRoot(document.getElementById('root')).render(
    <Theme>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Theme>
)
