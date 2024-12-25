import {Button, NumberInput, Select, Table, TextInput} from "@mantine/core";
import useTypedSelector from "../../store/hooks/useTypedSelector.ts";
import {useEffect, useState} from "react";
import useActions from "../../store/hooks/useActions.ts";

export default function View() {
    const {get_groups, get_specialities, update_group, delete_group} = useActions();

    const {groups} = useTypedSelector(state => state.groups)

    const {specialities} = useTypedSelector(state => state.specialities)

    const [row_to_redact, set_row_to_redact] = useState(0);

    const [row_to_delete, set_row_to_delete] = useState(0);

    const [cipher_to_change, set_cipher_to_change] = useState('');

    const [start_year_to_change, set_start_year_to_change] = useState(0);

    const [group_number_to_change, set_group_number_to_change] = useState(0);

    const [speciality_id_to_change, set_speciality_id_to_change] = useState(0);

    useEffect(() => {
        get_groups();
    }, [])

    const table_rows = groups.map(group => {
        return (
            <Table.Tr key={group.id}>
                {row_to_redact === group.id ?
                <>
                    <Table.Td>
                        <TextInput
                            defaultValue={group.group_cipher}
                            onChange={(e) => {
                                set_cipher_to_change(e.target.value)
                            }}
                        />
                    </Table.Td>
                    <Table.Td>
                        <NumberInput
                            accept={'number'}
                            defaultValue={group.start_study_year}
                            onChange={(e) => {
                                set_start_year_to_change(Number(e))
                            }}
                            min={1}
                        />
                    </Table.Td>
                    <Table.Td>
                        <NumberInput
                            defaultValue={group.group_number}
                            onChange={(e) => {
                                set_group_number_to_change(Number(e))
                            }}
                            min={1}
                        />
                    </Table.Td>
                    <Table.Td>
                        <Select
                            defaultValue={group.speciality_id.toString()}
                            onChange={(e) => {
                                set_speciality_id_to_change(Number(e))
                            }}
                            data={specialities.map(speciality => {
                                return {
                                    value: speciality.id.toString(),
                                    label: speciality.name
                                }
                            })}
                        />
                    </Table.Td>
                    <Table.Td>
                        <Button
                            onClick={() => {
                                new Promise((resolve) => {
                                    resolve(update_group({
                                        id: group.id,
                                        group_cipher: cipher_to_change,
                                        start_study_year: start_year_to_change,
                                        group_number: group_number_to_change,
                                        speciality_id: speciality_id_to_change
                                    }))
                                }).then(() => {
                                    set_row_to_redact(0);
                                    get_groups();
                                });
                            }}
                        >
                            Сохранить
                        </Button>
                    </Table.Td>
                    <Table.Td>
                        <Button
                            onClick={() => {
                                set_row_to_redact(0);
                            }}
                        >
                            Отмена
                        </Button>
                    </Table.Td>
                </>
                :
                <>
                    <Table.Td>{group.group_cipher}</Table.Td>
                    <Table.Td>{group.start_study_year}</Table.Td>
                    <Table.Td>{group.group_number}</Table.Td>
                    <Table.Td>{group.speciality.name}</Table.Td>
                    <Table.Td>
                        <Button
                            onClick={() => {
                                get_specialities();
                                set_row_to_redact(group.id);
                                set_cipher_to_change(group.group_cipher);
                                set_start_year_to_change(group.start_study_year);
                                set_group_number_to_change(group.group_number);
                                set_speciality_id_to_change(group.speciality_id);
                            }}
                        >Редактировать</Button>
                    </Table.Td>
                    <Table.Td>
                        {row_to_delete === group.id ?
                        <>
                            <Button
                                onClick={() => {
                                    new Promise((resolve) => {
                                        resolve(delete_group(group.id))
                                    }).then(() => {
                                        set_row_to_delete(0);
                                        get_groups();
                                    })
                                }}
                            >
                                Удалить
                            </Button>
                            <Button
                                onClick={() => {
                                    set_row_to_delete(0);
                                }}
                            >
                                Отмена
                            </Button>
                        </>
                        :
                        <Button
                            onClick={() => {
                                set_row_to_delete(group.id)
                            }}
                        >
                            Удалить
                        </Button>}
                    </Table.Td>
                </>
                }
            </Table.Tr>
        )
    });

    return (
        <>
            {
                table_rows.length === 0
                    ?
                <p>Нет групп</p>
                    :
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Шифр группы</Table.Th>
                            <Table.Th>Год начала обучения</Table.Th>
                            <Table.Th>Номер группы</Table.Th>
                            <Table.Th>Специальность</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {table_rows}
                    </Table.Tbody>
                </Table>
            }
        </>
    );
}