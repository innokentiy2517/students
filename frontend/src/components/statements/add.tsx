import {Button, Select, Stack} from "@mantine/core";
import {useForm} from "@mantine/form";
import useActions from "../../store/hooks/useActions.ts";
import {toast, ToastContainer} from "react-toastify";
import {useEffect} from "react";
import useTypedSelector from "../../store/hooks/useTypedSelector.ts";
import {StatementAddFormType} from "../../store/statements/statements_slice.ts";
import {DatePickerInput} from "@mantine/dates";

export default function Add() {
    const {add_statement, get_all_students, get_learning_plans_for_student, get_learning_plans} = useActions();

    const {students} = useTypedSelector(state => state.students);
    const {learning_plan_for_group} = useTypedSelector(state => state.learningPlans);

    const success_toast = () => {
        toast('Специальность успешно добавлена', {type: 'success'});
    }

    const form = useForm<StatementAddFormType>({
       mode: 'uncontrolled',
       validate: {
       }
    });

    const {error} = useTypedSelector(state => state.specialities);

    useEffect(() => {
        get_all_students();
        get_learning_plans();
        Object.entries(error).forEach(([key, value]) => {
            if (value) {
                form.setFieldError(key, value);
            }
        })
    }, [error, learning_plan_for_group])

    return (
        <>
            <Stack justify='space-around' gap='xs'>
                <div>Добавление ведомости</div>
                <form
                    onSubmit={form.onSubmit((values: StatementAddFormType) => {
                        console.log(values)

                        const payload = {
                            date_of_issue: new Date(new Date(values.date_of_issue.toUTCString()).getTime() + 1000 * 60 * 60 * 9),
                            student_id: Number(values.student_id),
                            discipline_id: learning_plan_for_group.learning_plan_contents.find(content => content.id === Number(values.discipline_id))!.id,
                        };

                        add_statement(payload);
                        if(!error.name) {
                            success_toast();
                        }
                    })}
                    style={{gap: '10px', display: 'flex', flexDirection: 'column'}}
                >
                    <Select
                        placeholder='Выберите студента'
                        {...form.getInputProps('student_id')}
                        onChange={(value) => {
                            const student = students.find((student) => student.id.toString() === value);
                            console.log(value)
                            get_learning_plans_for_student({start_study_year: student!.group.start_study_year, speciality_id: student!.group.speciality_id});
                            form.setFieldValue('student_id', Number(value));
                        }}
                        data={students.map((student) => ({value: student.id.toString(), label: `${student.surname} ${student.name} ${student.middle_name}, ${student.group.group_cipher}-${student.group.start_study_year}-${student.group.group_number}`}))}
                    />

                    {learning_plan_for_group.learning_plan_contents && learning_plan_for_group.learning_plan_contents.length ? <Select
                        placeholder='Выберите предмет'
                        {...form.getInputProps('discipline_id')}
                        data={learning_plan_for_group.learning_plan_contents.map((lpc) => ({
                            value: lpc.id.toString(),
                            label: `${lpc.discipline.name}, ${lpc.attestation_type}, Семестр ${lpc.semester}`
                        }))}
                    /> : <></>}
                    <DatePickerInput
                        placeholder='Дата ведомости'
                        {...form.getInputProps('date_of_issue')}
                        valueFormat="DD.MM.YYYY"
                    />
                    <Button type='submit'>
                        Добавить
                    </Button>
                </form>
            </Stack>
            <ToastContainer
                position='bottom-right'
            />
        </>
    );
}