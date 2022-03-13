import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../styles/components/adminDashboardCalendarStyle.scss";

import moment from "moment";

const localizer = momentLocalizer(moment);

const DailyCalendarComponent = function () {
  const [events, setEvents] = useState(null);
  const today = new Date();

  const resourceMap = [
    { resourceId: 1, resourceTitle: "Asia" },
    { resourceId: 2, resourceTitle: "Tomasz" },
    { resourceId: 3, resourceTitle: "Sławek" },
    { resourceId: 4, resourceTitle: "Kasia" },
  ];

  useEffect(() => {
    setEvents([
      {
        id: 0,
        title: "Strzyżenie męskie",
        start: new Date(2021, 1, 5, 9, 0, 0),
        end: new Date(2021, 1, 5, 9, 45, 0),
        resourceId: 1,
        isEvent: true,
      },
      {
        id: 13,
        title: "",
        start: new Date(2021, 1, 5, 9, 0, 0),
        end: new Date(2021, 1, 5, 17, 0, 0),
        resourceId: 1,
        areWorkHours: true,
      },
      {
        id: 1,
        allDay: true,
        start: new Date(2021, 1, 5, 9, 0, 0),
        end: new Date(2021, 1, 5, 9, 45, 0),
        title: "Urlop",
        resourceId: 2,
      },
      {
        id: 2,
        title: "Strzyżenie damskie",
        start: new Date(2021, 1, 5, 9, 0, 0),
        end: new Date(2021, 1, 5, 10, 30, 0),
        resourceId: 3,
        isEvent: true,
      },
      {
        id: 2,
        title: "Farbowanie damskie",
        start: new Date(2021, 1, 5, 10, 30, 0),
        end: new Date(2021, 1, 5, 11, 30, 0),
        resourceId: 3,
        isEvent: true,
      },
      {
        id: 14,
        title: "",
        start: new Date(2021, 1, 5, 8, 0, 0),
        end: new Date(2021, 1, 5, 17, 0, 0),
        resourceId: 3,
        areWorkHours: true,
      },
      {
        id: 11,
        title: "Strzyżenie",
        start: new Date(2021, 1, 5, 8, 45, 0),
        end: new Date(2021, 1, 5, 9, 25, 0),
        resourceId: 4,
        isEvent: true,
      },
      {
        id: 12,
        title: "",
        start: new Date(2021, 1, 5, 8, 0, 0),
        end: new Date(2021, 1, 5, 17, 0, 0),
        resourceId: 4,
        areWorkHours: true,
      },
    ]);
  }, []);
  return (
    <div className="admin-dashboard-calendar-wrapper">
      {events ? (
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          events={events}
          defaultView="day"
          style={{ height: "100vh" }}
          resources={resourceMap}
          resourceIdAccessor="resourceId"
          resourceTitleAccessor="resourceTitle"
          step={15}
          min={
            new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8)
          }
          max={
            new Date(today.getFullYear(), today.getMonth(), today.getDate(), 19)
          }
          eventPropGetter={(event) => {
            let customClassName = "defaultEvent";
            const newStyle = {
              backgroundColor: "rgba(133,133,133,.4)",
              color: "black",
              borderRadius: "0px",
              border: "none",
            };

            if (event.isMine) {
              newStyle.backgroundColor = "lightgreen";
            }

            if (event.isEvent) {
              customClassName = "eventClass";
              newStyle.backgroundColor = "#fff";
            }

            if (event.areWorkHours) {
              customClassName = "workHours";
            }

            return {
              className: customClassName,
              style: newStyle,
            };
          }}
        />
      ) : (
        "loading"
      )}
    </div>
  );
};

export default DailyCalendarComponent;
