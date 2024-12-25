import {Button, Select, Table} from "@mantine/core";
import useTypedSelector from "../../store/hooks/useTypedSelector.ts";
import {useEffect, useState} from "react";
import useActions from "../../store/hooks/useActions.ts";

export const transform_mark = ({mark, attestation_type}: {mark: number | undefined, attestation_type: string}) => {
    if(!mark) return 'Нет оценки';
    switch (attestation_type) {
        case 'Зачет':
            if(mark === 5) return 'Зачет';
            else return 'Не зачет';
        case 'Экзамен':
        default:
            return mark;
    }
}

export default function View() {
    const {get_statements, delete_statement, set_mark} = useActions();

    const {statements} = useTypedSelector(state => state.statements)

    const [row_to_redact, set_row_to_redact] = useState(0);

    const [row_to_delete, set_row_to_delete] = useState(0);

    const [mark_to_set, set_mark_value] = useState('0');

    useEffect(() => {
        get_statements();
    }, []);

    const table_rows = statements.map(statement => {
        return (
            <Table.Tr key={statement.id}>
                {row_to_redact === statement.id ?
                <>
                    <Table.Td>{statement.student.surname} {statement.student.name} {statement.student.middle_name}</Table.Td>
                    <Table.Td>{statement.student.group.group_cipher}-{statement.student.group.start_study_year}-{statement.student.group.group_number}</Table.Td>
                    <Table.Td>{statement.learning_plan_content.discipline.name}</Table.Td>
                    <Table.Td>{statement.learning_plan_content.attestation_type}</Table.Td>
                    <Table.Td>{statement.learning_plan_content.semester}</Table.Td>
                    <Table.Td>
                        <Select
                            defaultValue={statement.mark?.toString() || mark_to_set}
                            onChange={(e) => {
                                set_mark_value(e || '0');
                            }}
                            data={statement.learning_plan_content.attestation_type === 'Зачёт' ? [{value: '5', label: 'Зачет'}, {value: '2', label: 'Не зачет'}] : ['5', '4', '3', '2']}
                        />
                    </Table.Td>
                    <Table.Td>
                        <Button
                            onClick={() => {
                                new Promise((resolve) => {
                                    resolve(set_mark({
                                        id: statement.id,
                                        mark: Number(mark_to_set)
                                    }))
                                }).then(() => {
                                    set_row_to_redact(0);
                                    get_statements();
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
                    <Table.Td>{statement.student.surname} {statement.student.name} {statement.student.middle_name}</Table.Td>
                    <Table.Td>{statement.student.group.group_cipher}-{statement.student.group.start_study_year}-{statement.student.group.group_number}</Table.Td>
                    <Table.Td>{statement.learning_plan_content.discipline.name}</Table.Td>
                    <Table.Td>{statement.learning_plan_content.attestation_type}</Table.Td>
                    <Table.Td>{statement.learning_plan_content.semester}</Table.Td>
                    <Table.Td>{transform_mark({mark: statement.mark, attestation_type: statement.learning_plan_content.attestation_type})}</Table.Td>
                    <Table.Td>
                        <Button
                            onClick={() => {
                                set_row_to_redact(statement.id)
                            }}
                        >Редактировать</Button>
                    </Table.Td>
                    <Table.Td>
                        {row_to_delete === statement.id ?
                        <>
                            <Button
                                onClick={() => {
                                    new Promise((resolve) => {
                                        resolve(delete_statement(statement.id))
                                    }).then(() => {
                                        set_row_to_delete(0);
                                        get_statements();
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
                                set_row_to_delete(statement.id)
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
                <p>Нет ведомостей</p>
                    :
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>ФИО</Table.Th>
                            <Table.Th>Группа</Table.Th>
                            <Table.Th>Дисциплина</Table.Th>
                            <Table.Th>Тип аттестации</Table.Th>
                            <Table.Th>Семестр</Table.Th>
                            <Table.Th>Оценка</Table.Th>
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