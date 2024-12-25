import useActions from "../../store/hooks/useActions.ts";
import useTypedSelector from "../../store/hooks/useTypedSelector.ts";
import {useEffect, useState} from "react";
import {Button, Select, Table} from "@mantine/core";
import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";

export default function AttestationPlan() {
    const {get_learning_plans} = useActions();

    const {learning_plans} = useTypedSelector(state => state.learningPlans);

    const [selected_plan, set_selected_plan] = useState<number | null>(null);

    const [selected_semester, set_selected_semester] = useState<number | null>(null); // [semester, course]

    useEffect(() => {
        get_learning_plans();
    }, []);

    const get_unique_semesters = () => {
        const semesters = new Set<number>();

        const plan = learning_plans.find(plan => plan.id === selected_plan);

        if(!plan) {
            return [];
        }

        plan.learning_plan_contents.forEach(content => {
            semesters.add(content.semester);
        })

        return Array.from(semesters).map(semester => {
            return {
                value: semester.toString(),
                label: `Семестр ${semester}`
            }
        });
    }

    const get_contents = () => {
        const plan = learning_plans.find(plan => plan.id === selected_plan);

        if(!plan) {
            return [];
        }

        return plan.learning_plan_contents.filter(content => content.semester === selected_semester);
    }

    return(
        <>
            <Select
                placeholder='Выберите специальность'
                data={learning_plans.map(plan => {
                    return {
                        value: plan.id.toString(),
                        label: `${plan.speciality.name} ${plan.start_study_year}`
                    }
                })}
                onChange={(value) => {
                    set_selected_plan(Number(value));
                }}
            />
            <Select
                placeholder='Выберите семестр'
                data={get_unique_semesters()}
                onChange={(value) => {
                    set_selected_semester(Number(value));
                }}
            />
            {selected_plan && selected_semester && (
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Td>Дисциплина</Table.Td>
                            <Table.Td>Тип аттестации</Table.Td>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {get_contents().map(content => {
                            return (
                                <Table.Tr key={content.id}>
                                    <Table.Td>{content.discipline.name}</Table.Td>
                                    <Table.Td>{content.attestation_type}</Table.Td>
                                </Table.Tr>
                            )
                        })}
                        <Table.Tr>
                            <Button
                                onClick={() => {
                                    pdfMake.createPdf({
                                        pageOrientation: 'portrait',
                                        content: [
                                            {
                                                text: `План аттестации ${learning_plans.find(plan => plan.id === selected_plan)?.speciality.name} ${learning_plans.find(plan => plan.id === selected_plan)?.start_study_year}. Семестр ${selected_semester}`,
                                                style: 'header'
                                            },
                                            {
                                                table: {
                                                    body: [
                                                        ['Дисциплина', 'Тип аттестации'],
                                                        ...get_contents().map(content => {
                                                        return [
                                                            content.discipline.name,
                                                            content.attestation_type
                                                        ]
                                                    })]
                                                }
                                            }
                                        ]
                                    }).open();
                                }}
                            >Отчёт</Button>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            )}
        </>
    )
}