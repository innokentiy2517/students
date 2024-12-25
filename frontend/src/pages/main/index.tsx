import useActions from "../../store/hooks/useActions.ts";
import {AppShell, Button, Group, Modal} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import Groups from "../../components/groups";
import Statements from "../../components/statements";
import Disciplines from "../../components/disciplines";
import Students from "../../components/students";
import {useState} from "react";
import Specialities from "../../components/specialities";
import LearningPlans from "../../components/learning_plans";
import {useDisclosure} from "@mantine/hooks";

const TABS: Record<string, { label: string, component: JSX.Element }> = {
    STUDENTS: {
        label: 'Студенты',
        component: <Students/>
    },
    GROUPS: {
        label: 'Группы',
        component: <Groups/>
    },
    DISCIPLINES: {
        label: 'Дисциплины',
        component: <Disciplines/>
    },
    STATEMENTS: {
        label: 'Ведомости',
        component: <Statements/>
    },
    SPECIALITIES: {
        label: 'Специальности',
        component: <Specialities/>
    },
    LEARNING_PLANS: {
        label: 'Учебные планы',
        component: <LearningPlans/>
    }
}

export default function Main() {
    const {logout} = useActions();

    const navigate = useNavigate();

    const [opened, {open, close}] = useDisclosure(false)

    const [key, setKey] = useState('STATEMENTS');

    return (
    <AppShell
        header={{ height: 60 }}
        padding="md"
    >
        <Modal
            opened={opened}
            onClose={close}
            title="Личная карточка студента"
        >
            СОСАЛ?
        </Modal>
        <AppShell.Header>
            <Group h="100%" justify='space-between'>
                <Group justify="space-between" h="100%" px="md">
                    {
                        <>
                            {Object.entries(TABS).map(([key, value]) => {
                                return (
                                    <Button
                                        key={key}
                                        onClick={() => {
                                            setKey(key)
                                        }}
                                    >
                                        {value.label}
                                    </Button>
                                );
                            })}
                            <Button onClick={open}>Личная карточка студента</Button>
                        </>
                    }
                </Group>
                <Group justify="space-evenly" h="100%" px="md">
                    <Button onClick={() => {
                        logout();
                        navigate('/');
                    }}>
                        Выйти
                    </Button>
                </Group>
            </Group>
        </AppShell.Header>
        <AppShell.Main>
            {TABS[key].component}
        </AppShell.Main>
    </AppShell>
    );
}