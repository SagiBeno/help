import { Card, Text, Flex, Badge } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { MdLabel } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";

export default function SearchCard({ visit }) {

    return (
        <Card
            style={{
                minWidth: '220px',
                width: '450px',
                boxShadow: '0 0 6px 2px rgba(0, 0, 0, 0.3)',
                margin: '10px',
                backgroundColor: 'white',
                borderRadius: '12px',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                padding: '0',
            }}
        >
            <img
                src={visit.museum_image}
                alt=""
                style={{
                    maxHeight: '150px',
                    objectFit: 'cover'
                }}
            />

            <Flex
                style={{
                    flexDirection: 'column',
                    flexGrow: 1,
                    justifyContent: 'center',
                    padding: '10px',
                    gap: 10
                }}
            >
                <Flex
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'start',
                        alignItems: 'center',
                        gap: 10,
                        flexWrap: 'wrap'
                    }}
                >
                    <img
                        src={visit.museum_anchor}
                        alt={`${visit.city} címere`}
                        title={`${visit.city} címere`}
                        style={{
                            maxWidth: '50px',
                            objectFit: 'cover',
                        }}
                        loading="lazy"
                    />
                    <Text style={{ fontWeight: 'bold' }} size="4">{visit.visit_name}</Text>
                </Flex>

                <Flex
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'start',
                        alignItems: 'center',
                        gap: 10,
                        flexWrap: 'wrap'
                    }}
                >
                    <Badge color="gray" variant="solid"><MdLabel />{visit.type_name}</Badge>
                    <Badge color="gray" highContrast variant="surface"><FaLocationDot />{visit.museum_name}</Badge>
                    <Badge color="gray" highContrast variant="surface">{visit.city}</Badge>
                    <Badge color="gray" highContrast variant="surface"><FaClock />{visit.visit_time} h</Badge>
                </Flex>
                <Text style={{ opacity: '0.5' }} size="4">{visit.description}</Text>
            </Flex>
        </Card>
    )
}