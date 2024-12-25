import {Button, Table, TextInput} from "@mantine/core";
import useTypedSelector from "../../store/hooks/useTypedSelector.ts";
import {useState} from "react";
import useActions from "../../store/hooks/useActions.ts";

export default function View() {
    const {update_speciality, get_specialities, delete_speciality} = useActions();

    const {specialities} = useTypedSelector(state => state.specialities)

    const [row_to_redact, set_row_to_redact] = useState(0);

    const [row_to_delete, set_row_to_delete] = useState(0);

    const [name_to_change, set_name_to_change] = useState('');

    const table_rows = specialities.map(speciality => {
        return (
            <Table.Tr key={speciality.id}>
                {row_to_redact === speciality.id ?
                <>
                    <Table.Td>
                        <TextInput
                            defaultValue={speciality.name}
                            onChange={(e) => {
                                set_name_to_change(e.target.value)
                            }}
                        />
                    </Table.Td>
                    <Table.Td>
                        <Button
                            onClick={() => {
                                new Promise((resolve) => {
                                    resolve(update_speciality({
                                        id: speciality.id,
                                        name: name_to_change
                                    }))
                                }).then(() => {
                                    set_row_to_redact(0);
                                    get_specialities();
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
                    <Table.Td>{speciality.name}</Table.Td>
                    <Table.Td>
                        <Button
                            onClick={() => {
                                set_row_to_redact(speciality.id)
                            }}
                        >Редактировать</Button>
                    </Table.Td>
                    <Table.Td>
                        {row_to_delete === speciality.id ?
                        <>
                            <Button
                                onClick={() => {
                                    new Promise((resolve) => {
                                        resolve(delete_speciality(speciality.id))
                                    }).then(() => {
                                        set_row_to_delete(0);
                                        get_specialities();
                                    });
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
                                set_row_to_delete(speciality.id)
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
                <p>Нет специальностей</p>
                    :
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Название</Table.Th>
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