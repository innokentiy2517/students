import {Tabs} from "@mantine/core";
import Add from "./add.tsx";
import View from "./view.tsx";
import useActions from "../../store/hooks/useActions.ts";

export default function Disciplines() {
    const {get_disciplines} = useActions();

    return (
        <Tabs orientation='vertical'>
            <Tabs.List>
                <Tabs.Tab value='view' onClick={() => get_disciplines()}>
                    Просмотр дисциплин
                </Tabs.Tab>
                <Tabs.Tab value='add'>Добавить дисциплину</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value='view'>
                <View />
            </Tabs.Panel>
            <Tabs.Panel value='add'>
                <Add />
            </Tabs.Panel>
        </Tabs>
    )
}