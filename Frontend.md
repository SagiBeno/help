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

### Navbar
```
import { useState } from 'react';
import { FaHome, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [searchWord, setSearchWord] = useState('');
    const navigate = useNavigate();

    return (
        <header
            style={{
                top: 0,
                backgroundColor: 'rgba(190, 98, 0, 0.7)',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: '10px',
                height: '60px',
                position: 'fixed',
                width: '100%',
                alignItems: 'center'
            }}
        >
            <button
                type="button"
                style={{
                    border: 'none',
                    background: 'transparent',
                    color: 'white',
                    cursor: 'pointer'
                }}
                onClick={() => navigate('/')}
            >
                <FaHome size={32} />
            </button>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                    backgroundColor: 'white',
                    borderRadius: '12px'
                }}
            >
                <input 
                    type="text"
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                    style={{
                        border: 'none',
                        padding: '10px',
                        background: 'transparent'
                    }}
                    placeholder='Keresés...'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && searchWord.trim().length >= 3) {
                            navigate(`/search/${searchWord}`);
                            setSearchWord('');
                        }
                    }}
                />
                <button
                    type='button'
                    style={{
                        border: 'none',
                        background: 'transparent',
                        color: 'gray',
                        cursor: 'pointer',
                        paddingRight: '5px'
                    }}
                    onClick={() => {
                        if (searchWord.trim().length >= 3) {
                            navigate(`/search/${searchWord}`);
                            setSearchWord('');
                        }
                    }}
                >
                    <FaSearch size={25} />
                 </button>
            </div>
        </header>
    )
}

```