import React, { useState } from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";
import Error from "components/Appointment/Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";



export default function Appointment (props) {
  
  const [name,setName] = useState();
  const [interviewer, setInterviewer] = useState();
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }
  
  function deleting() {
    transition (DELETING);
    props.cancelInterview(props.id)
    .then (() => transition(EMPTY))
    .catch(error => transition (ERROR_DELETE,true));
  }

 function confirm () {
   transition (CONFIRM)
 } 
 function edit () {   
  setName(name);
  setInterviewer(interviewer);
  transition(EDIT);
 }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === CONFIRM && <Confirm
      message = "Delete appointement?"
      onConfirm = {deleting}
      onCancel = {back}
      />}
      {mode === SHOW && (
        <Show          
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete = {confirm}
          onEdit = {edit}
        />
      )}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
      />}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === EDIT && <Form
        name={name}
        interviewer={interviewer}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back} 
      />}
      {mode === ERROR_SAVE && <Error
        message = "Cannot Save"
        onClose = {back}
      />
      } 
      {mode === ERROR_DELETE && <Error
        message = "Cannot Delete"
        onClose = {back}
      />
      } 
    </article>
    
  );
}
