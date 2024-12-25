import {Tabs} from "@mantine/core";
import useActions from "../../store/hooks/useActions.ts";
import View from "./view.tsx";
import Add from "./add.tsx";

export default function Specialities() {
    const {get_specialities} = useActions();

    return (
        <Tabs orientation='vertical'>
            <Tabs.List>
                <Tabs.Tab value='view' onClick={() => {
                    get_specialities();
                }}>
                    Просмотр специальностей
                </Tabs.Tab>
                <Tabs.Tab value='add'>
                    Добавить специальность
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