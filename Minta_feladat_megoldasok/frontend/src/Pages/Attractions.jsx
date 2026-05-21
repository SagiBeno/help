import { useState, useEffect } from "react";
import { Flex, Text, Box, Badge, Avatar } from '@radix-ui/themes';
import { useParams } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import VisitCard from "../Components/VisitCard";

export default function Attractions() {

    const { id } = useParams();

    const [visits, setVisits] = useState([]);

    useEffect(() => {
        getVisits();
    }, [id]);

    const getVisits = async () => {
        try {
            const resJSON = await fetch(`http://localhost:3333/api/cities/${id}`);
            const resBody = await resJSON.json();
            if (resBody?.data) setVisits(resBody.data);
        } catch (error) {
            console.warn(error);
        }
    }

    return (
        <Flex className="mainContainer">
            <Box className='navbarSpacer' />
            {
                visits.length > 0 ?
                    <>
                        <Flex
                            style={{
                                flexDirection: 'column',
                                alignItems: 'start',
                                width: '100%',
                                padding: '10px'
                            }}
                        >
                            <Flex
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'start',
                                    alignItems: 'center',
                                    gap: 5
                                }}
                            >
                                <img
                                    src={visits[0].museum_anchor}
                                    alt={`${visits[0].city} címere`}
                                    title={`${visits[0].city} címere`}
                                    style={{
                                        maxWidth: '60px',
                                        objectFit: 'cover',
                                    }}
                                    loading="lazy"
                                />
                                <Text size="7" style={{ fontWeight: 'bold' }}>{visits[0].city}</Text>
                            </Flex>
                            <Text style={{ opacity: '0.5' }}>{visits.length} látogatás</Text>
                        </Flex>

                        <Flex
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                gap: 10,
                                width: '100%'
                            }}
                        >
                            {
                                visits.map((visit) => <VisitCard key={visit.visit_id} visit={visit} />)
                            }
                        </Flex>
                    </>
                    :
                    <Text size="6" style={{ color: 'white' }}>Nincs adat</Text>
            }
        </Flex>
    )
}