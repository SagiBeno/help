import { Flex, Box, IconButton, TextField, Button, Text } from "@radix-ui/themes";
import { useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function MyMenu() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');

    return (
        <Flex
            id='navbar'
            style={{
                zIndex: 1,
                width: "100%",
                height: '70px',
                position: 'fixed',
                top: '0px',
                background: '#212529',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
                padding: '5px',
            }}
        >
            <Flex
                style={{
                    alignItems: 'center',
                    color: 'white'
                }}
            >
                <IconButton
                    variant="ghost"
                    radius="full"
                    style={{
                        cursor: 'pointer',
                        color: 'white',
                        margin: "0px 5px"
                    }}
                    onClick={() => navigate("/")}
                >
                    <FaHome size={30} />
                </IconButton>
                <Text size="5">
                    Múzeumlátogatások
                </Text>
            </Flex>

            <Flex
                style={{
                    border: '1px solid white',
                    borderRadius: '12px',
                    padding: 0,
                }}
            >
                <TextField.Root
                    color='gray'
                    placeholder="Keresés (min. 2 karakter)..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{
                        borderRadius: '12px 0px 0px 12px',
                        width: '200px',
                        fontSize: '15px',
                        margin: '0px',
                        height: '40px',
                        minHeight: '40px',
                        maxHeight: '40px',
                        boxShadow: 'none',
                        border: 'none'
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && searchText.trim().length >= 2) {
                            navigate(`/search/${searchText.trim()}`);
                            setSearchText('');
                            return;
                        }
                        else return;
                    }}
                />
                
                <IconButton
                    radius="none"
                    color='gray'
                    style={{
                        minHeight: '40px',
                        border: 'none',
                        borderRadius: '0px 12px 12px 0px',
                        backgroundColor: '#212529',
                        cursor: searchText.trim().length < 2 ? 'not-allowed' : 'pointer'
                    }}
                    disabled={searchText.trim().length < 2}
                    onClick={() => {
                        if (searchText.trim().length >= 2) {
                            navigate(`/search/${searchText.trim()}`);
                            setSearchText('');
                            return;
                        }
                        else return;
                    }}
                >
                    <FaSearch />
                </IconButton>
            </Flex>

        </Flex>
    )
}