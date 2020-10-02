
export function getAppointmentsForDay(state, day) {
  const object = state.days.filter(item => item.name === day);
  const result = object[0] ? object[0].appointments.map(id => state.appointments[id]) : [];
  return result;
}

export function getInterview(state, interview) {
if (!interview) {
  return null;
} else {
for (let item in state.interviewers) {
  if (item == interview.interviewer) {
    const result= {};
    result.student = interview.student;
    result.interviewer = state.interviewers[item];
    return result;
    }
   }
}
}

export default {getAppointmentsForDay, getInterview};
