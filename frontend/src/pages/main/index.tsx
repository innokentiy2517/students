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
import StudentPersonalCardModal from "../../components/statements/student_personal_card_modal.tsx";
import AttestationPlan from "../../components/attestation_plan";

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

const MODALS: Record<string, { component: JSX.Element, header: string }> = {
    'default_modal': {
        component: <></>,
        header: '',
    },
    'STUDENT_PERSONAL_CARD': {
        component:<StudentPersonalCardModal/>,
        header: 'Личная карточка студента',
    },
    'ATTESTATION_PLAN': {
        component: <AttestationPlan/>,
        header: 'План аттестации',
    }
}

export default function Main() {
    const {logout, drop_student_personal_card} = useActions();

    const navigate = useNavigate();

    const [opened, {open, close}] = useDisclosure(false);

    const [active_modal, set_active_modal] = useState('default_modal');

    const [key, setKey] = useState('STATEMENTS');

    return (
    <AppShell
        header={{ height: 60 }}
        padding="md"
    >
        <Modal
            size='auto'
            opened={opened}
            onClose={() => {
                drop_student_personal_card();
                close();
            }}
            title={MODALS[active_modal].header}
        >
            {MODALS[active_modal].component}
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
                            <Button onClick={()=> {
                                set_active_modal('STUDENT_PERSONAL_CARD');
                                open();
                            }}>Личная карточка студента</Button>
                            <Button
                                onClick={() => {
                                    set_active_modal('ATTESTATION_PLAN');
                                    open();
                                }}
                            >
                                План аттестации
                            </Button>
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