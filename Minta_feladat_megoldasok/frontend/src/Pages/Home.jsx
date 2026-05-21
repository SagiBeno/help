import { useState, useEffect } from "react";
import { Flex, Text, Box, Separator } from '@radix-ui/themes';
import MuseumCard from "../Components/MuseumCard";

export default function Home() {

    const [cities, setCities] = useState([]);

    useEffect(() => {
        getCities();
    }, []);

    const getCities = async () => {
        try {
            const resJSON = await fetch('http://localhost:3333/api/cities');
            const resBody = await resJSON.json();
            if (resBody?.data) setCities(resBody.data);
        } catch (error) {
            console.warn(error);
        }
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
                            <Separator size="3" style={{ width: '100%', background: 'white' }} />

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