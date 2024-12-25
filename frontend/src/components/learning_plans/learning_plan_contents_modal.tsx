import {Button, NumberInput, Select, Table} from "@mantine/core";
import {LearningPlan} from "../../store/learning_plans/learning_plan_slice.ts";
import useTypedSelector from "../../store/hooks/useTypedSelector.ts";
import {useForm} from "@mantine/form";
import useActions from "../../store/hooks/useActions.ts";
import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";

enum AttestationType {
    EXAM = 'Экзамен',
    PASS = 'Зачёт',
    COURSE_WORK = 'Курсовая работа',
    DIFF_PASS = 'Дифференцированный зачет'
}

export default function LearningPlanContentsModal({learning_plan}:{learning_plan: LearningPlan}) {
    const {disciplines} = useTypedSelector(state => state.disciplines)

    const {add_learning_plan_content, get_learning_plan, delete_learning_plan_content} = useActions()

    const form = useForm<{
        discipline_id: number,
        number_of_hours: number,
        semester: number,
        attestation_type: AttestationType
    }>({
        validate:{
            discipline_id: (value, data) => {
                if(!value) {
                    return 'Поле не может быть пустым'
                }

                if(
                    learning_plan.learning_plan_contents
                        .find(content => content.discipline_id === Number(value)
                            &&
                            content.semester === data.semester
                            &&
                            content.attestation_type === data.attestation_type
                        )
                ) {
                    return 'Дисциплина уже добавлена'
                }
            },
            attestation_type: (value, data) => {
                if(!value) {
                    return 'Поле не может быть пустым'
                }

                if(
                    learning_plan.learning_plan_contents.find(content => content.discipline_id === Number(data.discipline_id)
                        &&
                        content.semester === data.semester
                        &&
                        content.attestation_type === value
                    )
                ) {
                    return 'Дисциплина уже добавлена'
                }
            },
            semester: (value, data) => {
                if(!value) {
                    return 'Поле не может быть пустым'
                }

                if(
                    learning_plan.learning_plan_contents.find(content => content.discipline_id === Number(data.discipline_id)
                        &&
                        content.semester === value
                        &&
                        content.attestation_type === data.attestation_type
                    )
                ) {
                    return 'Дисциплина уже добавлена'
                }
            }
        },
    });

    const add_handler = (data:{
        discipline_id: number,
        number_of_hours: number,
        semester: number,
        attestation_type: AttestationType
    }) => {
        new Promise(
            resolve => {
                resolve(add_learning_plan_content({
                    learning_plan_id: learning_plan.id,
                    discipline_id: Number(data.discipline_id),
                    number_of_hours: data.number_of_hours,
                    attestation_type: data.attestation_type,
                    semester: data.semester
                }))
            }
        ).then(
            () => {
                get_learning_plan(learning_plan.id)
            }
        )
    }

    const delete_handler = (id: number) => {
        new Promise(
            resolve => {
                resolve(delete_learning_plan_content(id))
            }
        ).then(
            () => {
                get_learning_plan(learning_plan.id)
            }
        )
    }

    return(
        <>
            <form
                onSubmit={form.onSubmit(add_handler)}
            >
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Название дисциплины</Table.Th>
                            <Table.Th>Количество часов</Table.Th>
                            <Table.Th>Семестр</Table.Th>
                            <Table.Th>Тип аттестации</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {learning_plan.learning_plan_contents.map(content => {
                            return (
                                <Table.Tr key={content.id}>
                                    <Table.Td>{content.discipline.name}</Table.Td>
                                    <Table.Td>{content.number_of_hours}</Table.Td>
                                    <Table.Td>{content.semester}</Table.Td>
                                    <Table.Td>{content.attestation_type}</Table.Td>
                                    <Table.Td>
                                        <Button onClick={() => delete_handler(content.id)}>
                                            Удалить
                                        </Button>
                                    </Table.Td>
                                </Table.Tr>
                            )
                        })}
                        <Table.Tr>
                            <Table.Td>
                                <Select
                                    {...form.getInputProps('discipline_id')}
                                    data={
                                        disciplines.map(discipline => {
                                            return {
                                                value: discipline.id.toString(),
                                                label: discipline.name
                                            }
                                        })
                                    }
                                    placeholder="Выберите дисциплину"
                                />
                            </Table.Td>
                            <Table.Td>
                                <NumberInput
                                    defaultValue={0}
                                    {...form.getInputProps('number_of_hours')}
                                    min={1}
                                    max={300}
                                />
                            </Table.Td>
                            <Table.Td>
                                <NumberInput
                                    defaultValue={0}
                                    {...form.getInputProps('semester')}
                                    min={1}
                                    max={10}
                                />
                            </Table.Td>
                            <Table.Td>
                                <Select
                                    {...form.getInputProps('attestation_type')}
                                    data={Object.values(AttestationType)}
                                    placeholder="Выберите тип аттестации"
                                />
                            </Table.Td>
                            <Table.Td>
                                <Button type='submit'>Добавить</Button>
                            </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Button
                                onClick={() => {
                                    pdfMake.createPdf({
                                        pageOrientation: 'landscape',
                                        content: [
                                            {
                                                text: `Учебный план ${learning_plan.speciality.name} ${learning_plan.start_study_year}`,
                                                style: 'header',
                                            },
                                            {
                                                table:{
                                                    body:[
                                                        ['Дисциплина','Количество часов','Семестр','Тип аттестации'],
                                                        ...learning_plan.learning_plan_contents.map(content => {
                                                            return [
                                                                content.discipline.name,
                                                                content.number_of_hours,
                                                                content.semester,
                                                                content.attestation_type
                                                            ]
                                                        })
                                                    ]
                                                }
                                            }
                                        ]
                                    }).open()
                                }}
                            >Отчёт</Button>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </form>
        </>
    )
}