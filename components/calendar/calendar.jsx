'use client'
import React from "react";
import Fullcalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

function Calendar() {
    return <div>
        <Fullcalendar
            plugins={[dayGridPlugin,timeGridPlugin, interactionPlugin]}
            intialView={"dayGridMonth"}
        />
        </div>
}

export default Calendar; 