import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import "components/InterviewerListItem.scss";

export default function InterviewerList(props) {
  //const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const array = props.interviewers.map( interviewer => <InterviewerListItem 
    key = {interviewer.id}
    name = {interviewer.name} 
    avatar = {interviewer.avatar} 
    selected = {interviewer.id === props.interviewer}
    setInterviewer={ event => props.onChange(interviewer.id)}
    />
   )

  return (

  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{array}</ul>
  </section>

  );
}

