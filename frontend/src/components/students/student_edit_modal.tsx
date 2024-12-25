import {Button, Select, Stack, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import useActions from "../../store/hooks/useActions.ts";
import {toast, ToastContainer} from "react-toastify";
import {useEffect} from "react";
import useTypedSelector from "../../store/hooks/useTypedSelector.ts";
import "@mantine/dates/styles.css";
import {Student, StudentAddFormType} from "../../store/students/students_slice.ts";
import {DatePickerInput} from "@mantine/dates";

export default function StudentEditModal({student, close}: {student: Student, close: () => void}) {
    const {update_student, get_groups, drop_student_error_key, get_all_students} = useActions();

    const success_toast = () => {
        toast('Студент успешно изменён', {type: 'success', autoClose: 1000, onClose: () => {
            close();
        }});
    }

    const form = useForm<StudentAddFormType>({
       mode: 'uncontrolled',
       initialValues: {
           document_number: student.document_number,
           surname: student.surname,
           name: student.name,
           middle_name: student.middle_name,
           date_of_birth: new Date(student.date_of_birth),
           group_id: student.group_id,
           gender: student.gender,
       },
       validate: {
       }
    });

    const {error} = useTypedSelector(state => state.students);

    const {groups} = useTypedSelector(state => state.groups);

    useEffect(() => {
        get_groups();
        Object.entries(error).forEach(([key, value]) => {
            if (value) {
                form.setFieldError(key, value);
                drop_student_error_key(key);
            }
        })
    }, [error])

    return (
        <>
            <Stack justify='space-around' gap='xs'>
                <form
                    onSubmit={form.onSubmit((values: StudentAddFormType) => {
                        const payload = {
                            id: student.id,
                            document_number: values.document_number,
                            surname: values.surname,
                            name: values.name,
                            middle_name: values.middle_name,
                            date_of_birth: new Date(new Date(values.date_of_birth.toUTCString()).getTime() + 1000 * 60 * 60 * 9),
                            group_id: Number(values.group_id),
                            gender: values.gender
                        }

                        new Promise(
                            resolve => {
                                update_student(payload);
                                resolve(true);
                            }
                        ).then(
                            () => {
                                if(Object.keys(error).length === 0) {
                                    get_all_students();
                                    success_toast();
                                }
                            }
                        )
                    })}
                    style={{gap: '10px', display: 'flex', flexDirection: 'column'}}
                >
                    <TextInput
                        placeholder='Фамилия'
                        {...form.getInputProps('surname')}
                    />
                    <TextInput
                        placeholder='Имя'
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        placeholder='Отчество'
                        {...form.getInputProps('middle_name')}
                    />
                    <DatePickerInput
                        placeholder='Дата рождения'
                        {...form.getInputProps('date_of_birth')}
                        valueFormat="DD.MM.YYYY"
                    />
                    <Select
                        placeholder='Выберите группу'
                        value={student.group_id.toString()}
                        {...form.getInputProps('group_id')}
                        data={groups.map((group) => ({value: group.id.toString(), label: `${group.group_cipher}-${group.start_study_year}-${group.group_number}`}))}
                    />
                    <TextInput
                        placeholder='Номер зачётки'
                        {...form.getInputProps('document_number')}
                    />
                    <Select
                        placeholder="Выберите пол"
                        {...form.getInputProps('gender')}
                        data={[
                            {value: 'MALE', label: 'Мужской'},
                            {value: 'FEMALE', label: 'Женский'},
                        ]}
                    />
                    <Button type='submit'>
                        Сохранить
                    </Button>
                </form>
            </Stack>
            <ToastContainer
                position='bottom-right'
            />
        </>
    );
}