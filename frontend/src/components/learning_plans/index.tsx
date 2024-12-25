import {Tabs} from "@mantine/core";
import Add from "./add.tsx";
import View from "./view.tsx";
import useActions from "../../store/hooks/useActions.ts";

export default function LearningPlans() {
    const {get_learning_plans, get_specialities} = useActions();

    return (
        <Tabs orientation='vertical'>
            <Tabs.List>
                <Tabs.Tab value='view' onClick={() => get_learning_plans()}>
                    Просмотр учебных планов
                </Tabs.Tab>
                <Tabs.Tab value='add'>Добавить учебный план</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value='view'>
                <View />
            </Tabs.Panel>
            <Tabs.Panel value='add' onClick={() => get_specialities()}>
                <Add />
            </Tabs.Panel>
        </Tabs>
    )
}