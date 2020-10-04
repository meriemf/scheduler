import React from "react";

import "components/Application.scss";
import "components/Appointment";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {getInterview} from "helpers/selectors";
import {getInterviewersForDay} from "helpers/selectors";
import {getAppointmentsForDay} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
  const interviewersArray = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
    return (<Appointment 
    key={appointment.id} 
    {...appointment}
    time={appointment.time}
    interview={getInterview(state, appointment.interview)}
    interviewers={interviewersArray}  
    bookInterview={bookInterview}
    cancelInterview={cancelInterview}
     />);
    });

  return (
  <main className="layout">
  
  <section className="sidebar">        
      <img
      className="sidebar--centered"
      src="images/logo.png"
      alt="Interview Scheduler"
    />
  <hr className="sidebar__separator sidebar--centered" />
  <nav className="sidebar__menu">
     <DayList
       days={state.days}
       day={state.day}
       setDay={setDay}
     />
  </nav>
  <img
    className="sidebar__lhl sidebar--centered"
    src="images/lhl.png"
    alt="Lighthouse Labs"
  />
  </section>
    <section className="schedule">
          {dailyAppointments}
         <Appointment key="last" time="5pm" />
    </section>
  
  </main>
  
);
}

         