import {Tabs} from "@mantine/core"
import Table from "../table";

interface Groups {
    group_cipher: string;

    group_number: number;

    start_study_year: number;

    id: number;
}

const groups: Groups[] = [
    {
        group_cipher: 'A',
        group_number: 1,
        start_study_year: 2023,
        id: 1
    },
    {
        group_cipher: 'B',
        group_number: 2,
        start_study_year: 2023,
        id: 2
    },
    {
        group_cipher: 'C',
        group_number: 3,
        start_study_year: 2023,
        id: 3
    }
]

export default function Groups() {
    return (
        <Tabs orientation='vertical'>
            <Tabs.List>
                <Tabs.Tab value='view'>Просмотр групп</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value='view'>
                <Table data={groups as Array<Record<string, string | number>>}/>
            </Tabs.Panel>
        </Tabs>
    )
}