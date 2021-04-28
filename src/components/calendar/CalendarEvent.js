import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getNameFactory, getNameMachine, getNameSection } from "../../helpers/helpersHistorical";

export const CalendarEvent = ({ event }) => {

    const { factories, sections, machines } = useSelector(state => state.factory);

    const [data, setData] = useState({ factoryComponent: '', sectionComponent: '', machineComponent: '' });
    const { factoryComponent, sectionComponent, machineComponent } = data;

    useEffect(() => {
        if (event && factories.length > 0 && sections.length > 0 && machines.length > 0) {

            setData({
                factoryComponent: getNameFactory(event.factory, factories)?.name,
                sectionComponent: getNameSection(event.section, sections)?.name,
                machineComponent: getNameMachine(event.machine, machines)?.name
            });

        }
    }, [event, factories, machines, sections])

    return (
        <div>
            <strong>F{factoryComponent} - {sectionComponent} -</strong>
            <span> {machineComponent}</span>
        </div>
    );
};
