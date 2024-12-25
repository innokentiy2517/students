import {Button, Modal, Table} from "@mantine/core";
import useTypedSelector from "../../store/hooks/useTypedSelector.ts";
import {useEffect, useState} from "react";
import useActions from "../../store/hooks/useActions.ts";
import {IconCancel, IconEdit, IconTrash} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import StudentEditModal from "./student_edit_modal.tsx";

export default function View() {
    const {get_all_students, delete_student, get_groups, get_student} = useActions();

    const {students, student_for_modal} = useTypedSelector(state => state.students)

    const [opened, { open, close }] = useDisclosure(false);

    const [row_to_delete, set_row_to_delete] = useState(0);

    useEffect(() => {
        get_all_students()
    }, []);

    const table_rows = students.map(student => {
        return (
            <Table.Tr key={student.id}>
                <Table.Td>{student.surname}</Table.Td>
                <Table.Td>{student.name}</Table.Td>
                <Table.Td>{student.middle_name}</Table.Td>
                <Table.Td>{student.group.speciality.name}</Table.Td>
                <Table.Td>{student.group.group_cipher}</Table.Td>
                <Table.Td>{student.group.start_study_year}</Table.Td>
                <Table.Td>{student.group.group_number}</Table.Td>
                <Table.Td>{student.gender === 'MALE' ? 'Мужской' : 'Женский'}</Table.Td>
                <Table.Td>{new Date(student.date_of_birth).toLocaleDateString('ru')}</Table.Td>
                <Table.Td>{student.document_number}</Table.Td>
                <Table.Td>
                    <Button
                        onClick={() => {
                            get_student(student.id);
                            get_groups();
                            open();
                        }}
                    >
                        <IconEdit/>
                    </Button>
                </Table.Td>
                <Table.Td>
                    {row_to_delete === student.id ?
                    <>
                        <Button
                            onClick={() => {
                                new Promise((resolve) => {
                                    resolve(delete_student(student.id))
                                }).then(() => {
                                    set_row_to_delete(0);
                                    get_all_students();
                                });
                            }}
                        >
                            <IconTrash/>
                        </Button>
                        <Button
                            onClick={() => {
                                set_row_to_delete(0);
                            }}
                        >
                            <IconCancel/>
                        </Button>
                    </>
                    :
                    <Button
                        onClick={() => {
                            set_row_to_delete(student.id)
                        }}
                    >
                        <IconTrash/>
                    </Button>}
                </Table.Td>
            </Table.Tr>
        )
    });

    return (
        <>
            {
                table_rows.length === 0
                    ?
                <p>Нет студентов̆</p>
                    :
                <Table>
                    <Modal size='auto' opened={opened} onClose={close} title={'Редактирование информации о студенте'} centered>
                        <StudentEditModal student={student_for_modal} close={close}/>
                    </Modal>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Фамилия</Table.Th>
                            <Table.Th>Имя</Table.Th>
                            <Table.Th>Отчество</Table.Th>
                            <Table.Th>Специальность</Table.Th>
                            <Table.Th>Шифр группы</Table.Th>
                            <Table.Th>Года начала обучения</Table.Th>
                            <Table.Th>Номер группы</Table.Th>
                            <Table.Th>Пол</Table.Th>
                            <Table.Th>Дата рождения</Table.Th>
                            <Table.Th>Номер зачётки</Table.Th>
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