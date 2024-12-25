import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import useActions from "../../store/hooks/useActions.ts";
import useTypedSelector from "../../store/hooks/useTypedSelector.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

type LoginFormType = {
    login: string,
    password: string
}

export default function Login() {
    const {login} = useActions();

    const form = useForm<LoginFormType>({
        mode: 'uncontrolled',
        initialValues: {
            login: '',
            password: '',
        },
        validate: {
        },
    });

    const {error, token} = useTypedSelector(state => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        if(token) {
            navigate('/main');
        }
        Object.entries(error).forEach(([key, value]) => {
            if (value) {
                form.setFieldError(key, value);
            }
        })
    }, [error]);

    return (
        <>
            <h1>Добро пожаловать</h1>
            <form
                onSubmit={form.onSubmit((data: LoginFormType) => {
                    login(data);
                })}
                style={{display: "flex", flexDirection: "column", gap: "10px"}}
            >
                <TextInput placeholder='Логин' {...form.getInputProps('login')} />
                <TextInput placeholder='Пароль' {...form.getInputProps('password')} type='password'/>
                <Button type='submit'>Войти</Button>
            </form>
            <Group justify='flex-end' mt='xs'>
                <a href='/registration'>
                    Зарегистрироваться
                </a>
            </Group>
        </>
    );
}