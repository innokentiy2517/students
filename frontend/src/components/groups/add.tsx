import {Button, NumberInput, Select, Stack, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import useActions from "../../store/hooks/useActions.ts";
import {toast, ToastContainer} from "react-toastify";
import {useEffect} from "react";
import useTypedSelector from "../../store/hooks/useTypedSelector.ts";
import {GroupAddFormType} from "../../store/groups/groups_slice.ts";

export default function Add() {
    const {add_group, get_specialities, drop_group_error_key} = useActions();

    const {error} = useTypedSelector(state => state.groups);

    const {specialities} = useTypedSelector(state => state.specialities);

    const success_toast = () => {
        toast(
            'Специальность успешно добавлена',
            {
                type: 'success',
                delay: 0,
                autoClose: 1000
            }
        );
    }

    const form = useForm<GroupAddFormType>({
       mode: 'uncontrolled',
       initialValues: {
           group_cipher: '',
           group_number: 0,
           speciality_id: 0,
           start_study_year: 0,
       },
       validate: {
           group_cipher: value => {
               if (!value) {
                   return 'Поле не может быть пустым';
               }

               if (value.length < 2) {
                   return 'Слишком короткий шифр';
               }
           },
           group_number: value => {
               if (!value) {
                   return 'Поле не может быть пустым';
               }
           },
           speciality_id: value => {
               if (!value) {
                   return 'Поле не может быть пустым';
               }
           },
           start_study_year: value => {
               if (!value) {
                   return 'Поле не может быть пустым';
               }
           },
       }
    });

    useEffect(() => {
        get_specialities();

        Object.entries(error).forEach(([key, value]) => {
            if (value) {
                form.setFieldError(key, value);
                drop_group_error_key(key);
            }
        })
    }, [error])

    const onSubmit = (values: GroupAddFormType) => {
        const payload = {
            group_cipher: values.group_cipher,
            group_number: values.group_number,
            speciality_id: Number(values.speciality_id),
            start_study_year: values.start_study_year
        }

        add_group(payload);

        if(!error.group_cipher && !error.group_number && !error.speciality_id && !error.start_study_year) {
            success_toast();
        }
    }

    return (
        <>
            <Stack justify='space-around' gap='xs'>
                <div>Добавление группы</div>
                <form
                    onSubmit={form.onSubmit(onSubmit)}
                    style={{gap: '10px', display: 'flex', flexDirection: 'column'}}
                >
                    <TextInput
                        label='Шифр группы'
                        {...form.getInputProps('group_cipher')}
                    />
                    <NumberInput
                        label='Год начала обучения'
                        min={0}
                        max={100}
                        {...form.getInputProps('start_study_year')}
                    />
                    <NumberInput
                        min={0}
                        max={100}
                        label='Номер группы'
                        {...form.getInputProps('group_number')}
                    />
                    <Select
                        label='Специальность'
                        data={specialities.map(speciality => ({value: speciality.id.toString(), label: speciality.name}))}
                        {...form.getInputProps('speciality_id')}
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