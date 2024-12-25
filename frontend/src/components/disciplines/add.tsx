import {Button, Stack, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import useActions from "../../store/hooks/useActions.ts";
import {toast, ToastContainer} from "react-toastify";
import {useEffect} from "react";
import useTypedSelector from "../../store/hooks/useTypedSelector.ts";

type DisciplineAddFormType = {
    name: string
}

export default function Add() {
    const {add_discipline} = useActions();

    const success_toast = () => {
        toast('Дисциплина успешно добавлена', {type: 'success'});
    }

    const form = useForm<DisciplineAddFormType>({
       mode: 'uncontrolled',
       initialValues: {
           name: '',
       },
       validate: {
           name: (value) => (value.length < 2 ? 'Слишком короткое название' : null),
       }
    });

    const {error} = useTypedSelector(state => state.specialities);

    useEffect(() => {
        Object.entries(error).forEach(([key, value]) => {
            if (value) {
                form.setFieldError(key, value);
            }
        })
    }, [error])

    return (
        <>
            <Stack justify='space-around' gap='xs'>
                <div>Добавление дисциплины</div>
                <form
                    onSubmit={form.onSubmit((values: DisciplineAddFormType) => {
                        add_discipline(values.name);
                        if(!error.name) {
                            form.reset();
                            success_toast();
                        }
                    })}
                    style={{gap: '10px', display: 'flex', flexDirection: 'column'}}
                >
                    <TextInput
                        placeholder='Название'
                        {...form.getInputProps('name')}
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