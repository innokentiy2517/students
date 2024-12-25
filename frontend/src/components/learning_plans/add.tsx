import {Button, NumberInput, Select, Stack} from "@mantine/core";
import {useForm} from "@mantine/form";
import useActions from "../../store/hooks/useActions.ts";
import {toast, ToastContainer} from "react-toastify";
import {useEffect} from "react";
import useTypedSelector from "../../store/hooks/useTypedSelector.ts";

type LearningPlanAddFormType = {
    start_study_year: number,
    speciality_id: number
}

export default function Add() {
    const {add_learning_plan, get_specialities, drop_error} = useActions();

    const {error} = useTypedSelector(state => state.learningPlans);

    const {specialities} = useTypedSelector(state => state.specialities);

    const success_toast = () => {
        toast('Дисциплина успешно добавлена', {type: 'success'});
    }

    const form = useForm<LearningPlanAddFormType>({
       mode: 'uncontrolled',
       validate: {
       },
       initialValues: {
           start_study_year: 24,
           speciality_id: 0
       },
    });

    useEffect(() => {
        get_specialities();

        Object.entries(error).forEach(([key, value]) => {
            if (value) {
                form.setFieldError(key, value);
            }
        })
    }, [error])

    return (
        <>
            <Stack justify='space-around' gap='xs'>
                <div>Добавление учебного плана</div>
                <form
                    onSubmit={form.onSubmit(({start_study_year, speciality_id}: LearningPlanAddFormType) => {
                        drop_error();

                        new Promise(resolve => {
                            resolve(add_learning_plan({start_study_year, speciality_id: Number(speciality_id)}));
                        }).then(()=>{
                            if(!error) {
                                form.reset();
                                success_toast();
                            }
                        })
                    })}
                    style={{gap: '10px', display: 'flex', flexDirection: 'column'}}
                >
                    <Select
                        placeholder='Выберите специальность'
                        data={specialities.map(speciality => ({value: speciality.id.toString(), label: speciality.name}))}
                        {...form.getInputProps('speciality_id')}
                    />
                    <NumberInput
                        placeholder='Введите год начала обучения'
                        {...form.getInputProps('start_study_year')}
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