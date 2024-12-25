import {Button, Table, TextInput} from "@mantine/core";
import useTypedSelector from "../../store/hooks/useTypedSelector.ts";
import {useState} from "react";
import useActions from "../../store/hooks/useActions.ts";

export default function View() {
    const {get_disciplines, update_discipline, delete_discipline} = useActions();

    const {disciplines} = useTypedSelector(state => state.disciplines)

    const [row_to_redact, set_row_to_redact] = useState(0);

    const [row_to_delete, set_row_to_delete] = useState(0);

    const [name_to_change, set_name_to_change] = useState('');

    const table_rows = disciplines.map(discipline => {
        return (
            <Table.Tr key={discipline.id}>
                {row_to_redact === discipline.id ?
                    <>
                        <Table.Td>
                            <TextInput
                                defaultValue={discipline.name}
                                onChange={(e) => {
                                    set_name_to_change(e.target.value)
                                }}
                            />
                        </Table.Td>
                        <Table.Td>
                            <Button
                                onClick={() => {
                                    new Promise((resolve) => {
                                        resolve(update_discipline({
                                            id: discipline.id,
                                            name: name_to_change
                                        }))
                                    }).then(() => {
                                        set_row_to_redact(0);
                                        get_disciplines();
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
                        <Table.Td>{discipline.name}</Table.Td>
                        <Table.Td>
                            <Button
                                onClick={() => {
                                    set_row_to_redact(discipline.id)
                                }}
                            >Редактировать</Button>
                        </Table.Td>
                        <Table.Td>
                            {row_to_delete === discipline.id ?
                                <>
                                    <Button
                                        onClick={() => {
                                            new Promise((resolve) => {
                                                resolve(delete_discipline(discipline.id))
                                            }).then(() => {
                                                set_row_to_redact(0);
                                                get_disciplines();
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
                                        set_row_to_delete(discipline.id)
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
                    <p>Нет дисциплин</p>
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