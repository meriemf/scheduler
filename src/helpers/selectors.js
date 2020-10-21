
export function getAppointmentsForDay(state, day) {
  const object = state.days.filter(item => item.name === day);
  const result = object[0] ? object[0].appointments.map(id => state.appointments[id]) : [];
  return result;
}

export  function getInterview(state, interview) {

 let result = null;
  for (const appointmentKey in state.appointments) {
    const interviewItem = state.appointments[appointmentKey].interview;
    if (interviewItem && interview && interviewItem.interviewer === interview.interviewer) {
      result = {};
      result.student = interview.student;
      result.interviewer = {
        id: interviewItem.interviewer,
        name: state.interviewers[interviewItem.interviewer] ? state.interviewers[interviewItem.interviewer].name : '',
        avatar: state.interviewers[interviewItem.interviewer] ? state.interviewers[interviewItem.interviewer].avatar : ''
      };
    }
  }
  return result;
}

export  function getInterviewersForDay(state, day) {
  const object = state.days.filter(item => item.name === day);
  const result = object[0] ? object[0].interviewers.map(id => state.interviewers[id]) : [];
  return result;
}

