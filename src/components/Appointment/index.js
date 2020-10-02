import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";


export default function Appointment (props) {


  return (
    <article className="appointment">
    <Fragment>
    <Header time={props.time}/>
    {props.interview? <Show student={props.interview.student} interviewer={props.interview.interviewer.name} />: <Empty id={props.id} time={props.time}/> }
    </Fragment>
    </article>  
  );
}
