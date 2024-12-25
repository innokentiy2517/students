import {Tabs} from "@mantine/core";
import useActions from "../../store/hooks/useActions.ts";
import View from "./view.tsx";
import Add from "./add.tsx";
import {useState} from "react";

export default function Statements() {
    const {get_statements} = useActions();

    const [current_tab, set_current_tab] = useState<string | null>('view');

    return (
        <Tabs value={current_tab} onChange={set_current_tab} orientation='vertical'>
            <Tabs.List>
                <Tabs.Tab value='view' onClick={() => {
                    get_statements();
                }}>
                    Просмотр ведомостей
                </Tabs.Tab>
                <Tabs.Tab value='add'>
                    Добавить ведомость
                </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value='view'>
                <View/>
            </Tabs.Panel>
            <Tabs.Panel value='add'>
                <Add/>
            </Tabs.Panel>
        </Tabs>
    )
}