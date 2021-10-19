import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import Navbar from "../common/Navbar";
import FAB from "../common/FAB";
import messages from "../../helpers/calendar-labels";
import CalendarAppoitments from "./CalendarAppoitments";
import CalendarModal from "./CalendarModal";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import { uiOpenModal } from "../../actions/ui";
import { eventClearEventActive, eventSetActive, eventStartLoading } from "../../actions/events";
import FABDROP from "../common/FABDROP";

moment.locale("es");

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const {uid} = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(eventStartLoading())
  },[dispatch])

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = (e) => {
    dispatch(eventClearEventActive())
  }

  const eventStyleGetter = (event, start, end, isSelected) => {



    const style = {
      backgroundColor: (uid === event.user._id) ? "#367CF7" : "#E6E6E6",
      borderRadius: "0px",
      opacoty: 0.8,
      display: "block",
      color: (uid === event.user._id) ? "white" : "black",
    };
    return {
      style,
    };
  };

  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
        onSelectSlot={onSelectSlot}
        selectable={true}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarAppoitments,
        }}
      />

      <FAB />
      {
        activeEvent && 
        <FABDROP />
      }
      <CalendarModal />
    </div>
  );
};

export default CalendarView;
