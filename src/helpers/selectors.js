
export function getAppointmentsForDay(state, day) {
  const object = state.days.filter(item => item.name === day);
  const result = object[0] ? object[0].appointments.map(id => state.appointments[id]) : [];
  return result;
}
export  function getInterview(state, interview) {
  
  let result= {};  
   if (!interview) {
     return null;
   } else {
   for (const appointmentKey in state.appointments) {
     const item = state.appointments[appointmentKey].interview;
     if (item && interview && item.interviewer === interview.interviewer) {
      result = {};
      result.student = interview.student;
      result.interviewer = {
        id: item.interviewer,
        name: state.interviewers[item.interviewer].name,
        avatar: state.interviewers[item.interviewer].avatar
      };
    }
  }
  return result;
  }
}
export  function getInterviewersForDay(state, day) {
  const object = state.days.filter(item => item.name === day);
  const result = object[0] ? object[0].interviewers.map(id => state.interviewers[id]) : [];
  return result;
}


export default {getInterview, getInterviewersForDay, getAppointmentsForDay };
