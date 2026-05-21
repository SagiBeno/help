# Frontend

## Parancsok
```
pnpm install @radix-ui/themes
pnpm i @radix-ui/react-icons
pnpm install react-icons
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

## TextField slot-tal:
```
<TextField.Root
    className="textField"
    radius="none"
    placeholder="Password"
    size="3"
    name={inputName}
    id={inputName}
    type={showPassword ? "text" : "password"}
    value={value}
    onChange={onChange}
    required
>
    <TextField.Slot side="right">
        <IconButton
            style={{
                cursor: "pointer",
                color: 'black'
            }}
            variant="ghost"
            size="2"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={handleShowPassword}
        
            {
                showPassword ?
                    <EyeClosedIcon height="25" width="25" />
                    :
                    <EyeOpenIcon height="25" width="25" />
            }
        </IconButton>
    </TextField.Slot>
</TextField.Root>
```