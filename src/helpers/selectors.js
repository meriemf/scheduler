
 export default function getAppointmentsForDay(state, day) {
  const object = state.days.filter(item => item.name === day);
  const result = object[0] ? object[0].appointments.map(id => state.appointments[id]) : [];
  return result;
}