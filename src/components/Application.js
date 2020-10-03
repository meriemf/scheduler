import React from "react";
import { useState } from "react";
import {useEffect} from "react";
import axios from "axios";

import "components/Application.scss";
import "components/Appointment";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {getAppointmentsForDay} from "helpers/selectors";
import {getInterviewersForDay} from "helpers/selectors";
import {getInterview} from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
    //inyterviewers: {}
  });
  
  const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewersArray = getInterviewersForDay(state, state.day);

    useEffect(() => {
      Promise.all([
        axios.get('http://localhost:8001/api/days'),
        axios.get('http://localhost:8001/api/appointments'),
        axios.get('http://localhost:8001/api/interviewers'),     
      ]).then((all) => {
     setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  
  }, [])
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
        {
          dailyAppointments.map((appointment) => {

        const interview = getInterview(state, appointment.interview);
         // return (<Appointment key={appointment.id} {...appointment} />)
         return (<Appointment key={appointment.id} 
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewersArray}
           />)

        })}
         <Appointment key="last" time="5pm" />
    </section>
  
  </main>
  
);
}


