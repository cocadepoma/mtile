import React from "react";

export const CalendarEvent = ({ event = { title: "", section: "", number: "" } }) => {
    const { machine, section, factory } = event;

    return (
        <div>
            <strong>F{factory} - {section} -</strong>
            <span> {machine}</span>
        </div>
    );
};
