import {Button, Select, Table} from "@mantine/core";
import {useEffect} from "react";
import useActions from "../../store/hooks/useActions.ts";
import useTypedSelector from "../../store/hooks/useTypedSelector.ts";
import {transform_mark} from "./view.tsx";
import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";

export default function StudentPersonalCardModal() {
    const {get_all_students, get_students_personal_card} = useActions();

    const {students} = useTypedSelector(state => state.students);

    const {student_personal_card} = useTypedSelector(state => state.statements);

    useEffect(() => {
        get_all_students();
    }, [student_personal_card]);

    return (
        <>
            <Select
                placeholder='Выберите студента'
                onChange={(value) => {
                    get_students_personal_card(value!);
                }}
                data={students.map((student) => ({value: student.document_number, label: `${student.surname} ${student.name} ${student.middle_name}, ${student.group.group_cipher}-${student.group.start_study_year}-${student.group.group_number}`}))}
            />
            {student_personal_card &&
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>ФИО</Table.Th>
                            <Table.Th>Номер зачётки</Table.Th>
                            <Table.Th>Название специальности</Table.Th>
                            <Table.Th>Группа</Table.Th>
                            <Table.Th>Семестр</Table.Th>
                            <Table.Th>Дисциплина</Table.Th>
                            <Table.Th>Количество часов</Table.Th>
                            <Table.Th>Тип аттестации</Table.Th>
                            <Table.Th>Оценка</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {student_personal_card.length > 0 && student_personal_card.map((statement) => {
                            return (
                                <Table.Tr key={statement.id}>
                                    <Table.Td>{statement.student.surname} {statement.student.name} {statement.student.middle_name}</Table.Td>
                                    <Table.Td>{statement.student.document_number}</Table.Td>
                                    <Table.Td>{statement.student.group.speciality.name}</Table.Td>
                                    <Table.Td>{statement.student.group.group_cipher}-{statement.student.group.start_study_year}-{statement.student.group.group_number}</Table.Td>
                                    <Table.Td>{statement.learning_plan_content.semester}</Table.Td>
                                    <Table.Td>{statement.learning_plan_content.discipline.name}</Table.Td>
                                    <Table.Td>{statement.learning_plan_content.number_of_hours}</Table.Td>
                                    <Table.Td>{statement.learning_plan_content.attestation_type}</Table.Td>
                                    <Table.Td>{transform_mark({mark:statement.mark, attestation_type: statement.learning_plan_content.attestation_type})}</Table.Td>
                                </Table.Tr>
                            )
                        })}
                        <Table.Tr>
                            <Button
                                onClick={() => {
                                    pdfMake.createPdf({
                                        pageOrientation: 'landscape',
                                        content: [
                                            {
                                                text: 'Личная карточка студента',
                                                style: 'header'
                                            },
                                            {
                                                table: {
                                                    dontBreakRows: true,
                                                    body:[
                                                        [
                                                            'ФИО',
                                                            'Номер зачётки',
                                                            'Спец-сть',
                                                            'Группа',
                                                            'Семестр',
                                                            'Дисциплина',
                                                            'Количество часов',
                                                            'Тип аттестации',
                                                            'Оценка'
                                                        ],
                                                        ...student_personal_card.map((statement) => {
                                                        return [
                                                            `${statement.student.surname} ${statement.student.name} ${statement.student.middle_name}`,
                                                            statement.student.document_number,
                                                            statement.student.group.speciality.name,
                                                            `${statement.student.group.group_cipher}-${statement.student.group.start_study_year}-${statement.student.group.group_number}`,
                                                            statement.learning_plan_content.semester,
                                                            statement.learning_plan_content.discipline.name,
                                                            statement.learning_plan_content.number_of_hours,
                                                            statement.learning_plan_content.attestation_type,
                                                            transform_mark({mark:statement.mark, attestation_type: statement.learning_plan_content.attestation_type})
                                                        ]
                                                    })]
                                                },
                                            }
                                        ]
                                    }).open();
                                }}>Отчёт</Button>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            }
        </>
    )
}