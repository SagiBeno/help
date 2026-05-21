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

## Alulra igazított tartalommal rendelkező Card
```
<Card
    style={{
        minWidth: '220px',
        width: '320px',
        boxShadow: '0 0 6px 2px rgba(0, 0, 0, 0.3)',
        margin: '10px',
        backgroundColor: 'white',
        borderRadius: '12px',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        padding: '0',
        cursor: 'pointer'
    }}
    onClick={() => navigate(`/locsoltak/${locsoltSzemely.locsolt_id}`, { state: { locsoltSzemely: locsoltSzemely } })}
>
    <Flex style={{ flexDirection: 'row', padding: 0, width: '100%' }}>
        <img
            src={locsoltSzemely.locsolt_image}
            alt={`${locsoltSzemely.locsolt_name} képe`}
            title={`${locsoltSzemely.locsolt_name} képe`}
            style={{
                minWidth: '100%',
                objectFit: 'cover',
            }}
            loading="lazy"
        />
    </Flex>
    <Flex style={{flexGrow: 1}} />
    <Flex
        style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '10px',
            gap: 10,
        }}
    >
        <Text size='5' style={{ fontWeight: 'bold' }}>{locsoltSzemely.locsolt_name}</Text>
        <Text size="5" >{locsoltSzemely.locsolt_gender === 'girl' ? `🌸 Lány` : `💧 Fiú`}</Text>
        <Badge variant="solid" radius="full" size="3" style={{ fontSize: '18px', fontWeight: 'bold', background: 'linear-gradient(45deg, #e56299#ba66c2)' }}>💦 {locsoltSzemely.count} locsolás</Badge>
    </Flex>
</Card>
```