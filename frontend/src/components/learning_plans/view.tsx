import {Button, Modal, NumberInput, Table} from "@mantine/core";
import useTypedSelector from "../../store/hooks/useTypedSelector.ts";
import {useEffect, useState} from "react";
import useActions from "../../store/hooks/useActions.ts";
import {useDisclosure} from "@mantine/hooks";
import LearningPlanContentsModal from "./learning_plan_contents_modal.tsx";

export default function View() {
    const {
        get_learning_plans,
        update_learning_plan,
        get_learning_plan,
        get_disciplines,
        delete_learning_plan
    } = useActions()

    const {learning_plans, learning_plan_for_modal} = useTypedSelector(state => state.learningPlans)

    const [row_to_redact, set_row_to_redact] = useState(0);

    const [row_to_delete, set_row_to_delete] = useState(0);

    const [start_year_to_change, set_start_year_to_change] = useState(0);

    const [opened, { open, close }] = useDisclosure(false);

    const [lp_for_modal, set_lp_for_modal] = useState(0);

    useEffect(()=>{
        if(lp_for_modal !== 0){
            get_learning_plan(lp_for_modal);
            get_disciplines();
        }
    }, [lp_for_modal])

    const table_rows = learning_plans.map(learning_plan => {
        return (
            <Table.Tr key={learning_plan.id} onDoubleClick={() => {
                set_lp_for_modal(learning_plan.id);
                open()
            }}>
                {row_to_redact === learning_plan.id ?
                    <>
                        <Table.Td>{learning_plan.speciality.name}</Table.Td>
                        <Table.Td>
                            <NumberInput
                                defaultValue={learning_plan.start_study_year}
                                onChange={(value) => set_start_year_to_change(Number(value))}
                            />
                        </Table.Td>
                        <Table.Td>
                            <Button
                                onClick={() => {
                                    new Promise((resolve) => {
                                        resolve(update_learning_plan({
                                            id: learning_plan.id,
                                            speciality_id: learning_plan.speciality_id,
                                            start_study_year: start_year_to_change
                                        }))
                                    }).then(() => {
                                        set_row_to_redact(0);
                                        get_learning_plans();
                                    })
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
                        <Table.Td>{learning_plan.speciality.name}</Table.Td>
                        <Table.Td>{learning_plan.start_study_year}</Table.Td>
                        <Table.Td>
                            <Button
                                onClick={() => {
                                    set_row_to_redact(learning_plan.id);
                                }}
                            >
                                Редактировать
                            </Button>
                        </Table.Td>
                        <Table.Td>
                            {row_to_delete === learning_plan.id ?
                                <>
                                    <Button
                                        onClick={() => {
                                            new Promise((resolve) => {
                                                resolve(delete_learning_plan(learning_plan.id))
                                            }).then(() => {
                                                set_row_to_delete(0);
                                                get_learning_plans();
                                            })
                                        }}
                                    >
                                        Удалить
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            set_row_to_delete(0);
                                    }}>
                                        Отмена
                                    </Button>
                                </>
                                :
                                <Button
                                    onClick={() => {
                                        set_row_to_delete(learning_plan.id);
                                    }}
                                >
                                    Удалить
                                </Button>
                            }
                        </Table.Td>
                    </>
                }
            </Table.Tr>
        )
    });

    return (
        <>
            {
                table_rows.length === 0 ?
                    (
                        <p>Нет учебных планов</p>
                    ) :
                    (
                        <Table>
                            <Modal size='auto' opened={opened} onClose={close} title={`Учебный план ${learning_plan_for_modal.speciality.name} ${learning_plan_for_modal.start_study_year}`} centered>
                                <LearningPlanContentsModal learning_plan={learning_plan_for_modal}/>
                            </Modal>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Название специальности</Table.Th>
                                    <Table.Th>Год начала учебного плана</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {table_rows}
                            </Table.Tbody>
                        </Table>
                    )
            }
        </>
    );
}