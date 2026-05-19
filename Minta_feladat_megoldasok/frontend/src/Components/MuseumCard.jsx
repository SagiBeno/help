import { Card, Text, Flex } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

export default function MuseumCard({ museum, city }) {

    const navigate = useNavigate();

    return (
        <Card
            style={{
                minWidth: '220px',
                width: '400px',
                boxShadow: '0 0 6px 2px rgba(0, 0, 0, 0.3)',
                margin: '10px',
                backgroundColor: 'white',
                borderRadius: '12px',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                padding: '10px',
                cursor: 'pointer',
                gap: 6
            }}
            onClick={() => {navigate(`/cities/${museum.id}`)}}
        >
            <Flex style={{ flexDirection: 'row', padding: 0, width: '150px', justifyContent: 'center', margin: '0 auto', alignItems: 'center' }}>
                <img
                    src={museum.anchor}
                    alt={`${city} címere`}
                    title={`${city} címere`}
                    style={{
                        minWidth: '100%',
                        objectFit: 'cover',
                        margin: '0 auto'
                    }}
                    loading="lazy"
                />
            </Flex>

            <Flex
                style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 6,
                    flexGrow: 1,
                    textAlign: 'center'
                }}
            >
                <Text style={{ fontWeight: 'bold' }} size="5">{museum.name}</Text>
                <Text style={{ opacity: '0.5' }} size="4">{city}</Text>
            </Flex>
            

        </Card>
    )
}