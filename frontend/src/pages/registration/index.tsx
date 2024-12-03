import { Button,  TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import useActions from "../../store/hooks/useActions.ts";
import {useEffect} from "react";
import useTypedSelector from "../../store/hooks/useTypedSelector.ts";
import {useNavigate} from "react-router-dom";

enum Roles {
    TEACHER = 'Преподователь',
    DIRECTORATE_EMPLOYEE = 'Сотрудник дирекции',
    EDUCATION_EMPLOYEE = 'Сотрудник учебного отдела',
    ADMIN = 'Администратор'
}

interface RegistrationFormType {
    login: string;
    password: string;
    confirmPassword: string;
    role: Roles;
}

export default function Registration() {
    const {register} = useActions();

    const form = useForm<RegistrationFormType>({
        initialValues: {
            login: '',
            password: '',
            confirmPassword: '',
            role: Roles.DIRECTORATE_EMPLOYEE
        },
        validate: {
            login: (value) => (value.length < 3 ? 'Минимальная длина 3 символа' : null),
            password: (value) => (value.length < 6 ? 'Минимальная длина 6 символов' : null),
            confirmPassword: (value, values) => (value !== values.password ? 'Пароли не совпадают' : null),
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
            <h1>Регистрация</h1>
            <form
                style={{display: "flex", flexDirection: "column", gap: "10px"}}
                onSubmit={form.onSubmit((data: RegistrationFormType) => register(data))}
            >
                <TextInput
                    {...form.getInputProps('login')}
                    error={form.getInputProps('login').error}
                    label="Логин" placeholder="Введите логин" />
                <TextInput
                    {...form.getInputProps('password')}
                    error={form.getInputProps('password').error}
                    label="Пароль" placeholder="Введите пароль" />
                <TextInput
                    {...form.getInputProps('confirmPassword')}
                    label="Повторите пароль" placeholder="Повторите пароль" />
                <TextInput
                    {...form.getInputProps('role')}
                    label="Роль" placeholder="Выберите роль" component="select">
                    {Object.values(Roles).map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </TextInput>
                <Button mt='md' type="submit">Зарегистрироваться</Button>
                <a href="/">
                    <p>Уже есть аккаунт? Войти</p>
                </a>
            </form>
        </>
    );
}