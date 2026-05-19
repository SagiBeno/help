import { Flex, Box, Text, Card } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchCard from "../Components/SearchCard";
import { FaSearch } from "react-icons/fa";

export default function SearchResult() {

    const { searchedWord } = useParams();
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        getSearchResult();
    }, [searchedWord]);

    function getSearchResult() {
        fetch(`http://localhost:3333/api/visits/search/${searchedWord}`)
            .then(async (resJSON) => {
                const res = await resJSON.json();
                if (res?.data) setSearchResult(res.data);
                else setSearchResult([]);
            })
            .catch(console.warn);
    }

    return (
        <Flex className="mainContainer">
            <Box className='navbarSpacer' />
            <Flex
                style={{
                    flexDirection: 'column',
                    gap: 6,
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px',
                }}
            >
                <Flex
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'start',
                        alignItems: 'center',
                        gap: 6,
                    }}
                >
                    <FaSearch size={25} style={{ opacity: '0.5' }} />
                    <Text style={{ fontWeight: 'bold' }} size="7">Keresés: ,,{searchedWord}"</Text>
                </Flex>
                <Text style={{ opacity: '0.5' }}>{searchResult.length} találat</Text>


                {
                    searchResult.length > 0
                        ?
                        <Flex
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 10
                            }}
                        >
                            {
                                searchResult.map((visit) => <SearchCard key={visit.visit_id} visit={visit} />)
                            }
                        </Flex>
                        :
                        <Card style={{ background: 'yellow' }}><Text>Nincs találat a kifejezésre.</Text></Card>
                }
            </Flex>


        </Flex>
    )
}