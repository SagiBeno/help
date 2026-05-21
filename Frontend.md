# Frontend

## Parancsok
```
pnpm create vite .
pnpm install @radix-ui/themes
pnpm i @radix-ui/react-icons
pnpm install react-icons
pnpm i react-router
pnpm i axios
```

## main.jsx
```
import { Theme } from '@radix-ui/themes';
import { BrowserRouter } from 'react-router-dom';
import "@radix-ui/themes/styles.css";
```

## useLocation
"Hívó:"
```
onClick={() => navigate(`/locsoltak/${locsoltSzemely.locsolt_id}`, { state: { locsoltSzemely: locsoltSzemely } })}
```

"Meghívott:"
```
import { useParams, useLocation } from "react-router-dom";
const location = useLocation();
const { locsoltSzemely } = location?.state;
```
