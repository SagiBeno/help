import { useState, useEffect } from "react";
import { Flex, Text, Box, Separator } from '@radix-ui/themes';
import MuseumCard from "../Components/MuseumCard";

export default function Home() {

    const [cities, setCities] = useState([]);

    useEffect(() => {
        getCities();
    }, []);

    function getCities() {
        fetch('http://localhost:3333/api/cities')
            .then(async (resJSON) => {
                const res = await resJSON.json();
                const data = [];

                if (res?.data) {
                    res?.data.forEach(element => {
                        data.push({
                            ...element,
                            separator: <Separator size="3" style={{ width: '100%', background: 'white' }} />
                        });
                    });
                    setCities(data);
                }
            })
            .catch(console.warn);
    }


    return (
        <Flex className="mainContainerForHomePage">
            <Box className='navbarSpacer' />
            <Flex className="contentContainer" style={{ gap: 3 }}>
                <Text
                    size="6"
                    style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: 'white',
                        marginBottom: '10px'
                    }}
                >
                    Múzeumlátogatások
                </Text>

                {
                    cities.length > 0 ? cities.map((element, idx) => (
                        <Flex
                            key={idx}
                            style={{
                                flexDirection: 'column',
                                justifyContent: 'start'
                            }}
                        >
                            <Text style={{ textAlign: 'left', color: 'white', fontWeight: 'bold' }} size='4'>{element.city}</Text>
                            {element.separator}

                            <Flex
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 10,
                                    flexWrap: 'wrap'
                                }}
                            >
                                {element.museums.map((museum, museumIdx) => (
                                    <MuseumCard key={museumIdx} museum={museum} city={element.city} />
                                ))}
                            </Flex>

                        </Flex>
                    ))
                    :
                    <Text size="6" style={{ color: 'white' }}>Nincs adat</Text>
                }
            </Flex>
        </Flex>
    )
}