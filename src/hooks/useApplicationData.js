import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData () {
  
  const [state, setState] = useState({
   day: "Monday",
   days: [],
   appointments: {}
  });

 
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),     
      ]).then((all) => {
      setState(prev => ({
        ...prev, 
        days: all[0].data,
        appointments: all[1].data, 
        interviewers: all[2].data
      }));
    });

  }, []);
  const setDay = day => setState({ ...state, day });  
 
  function bookInterview(id, interview) {
    let edit = false;
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    if (state.appointments[id].interview) {
      edit = true;
    }
    const days = [...state.days];
    for (const day of days) {
      
      if (day['name'] === state.day) {
        
        if(!edit) {
          day['spots']--;
        } 
      
      }
     };

     const promise = axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then (res => {
      console.log(res);
      setState({
        ...state, appointments
       })
     })
       return promise;
  };
  
  
  function cancelInterview(id) {
   
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = [...state.days];
   for (const day of days) {
     if (day['name'] === state.day){
      day['spots']++;
     }
    };
    const promise = axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment ).then(res => {
      setState({
        ...state,
        appointments
      });
     })
    
    return promise;
  };

  return {state, setDay, bookInterview, cancelInterview}; 
};
