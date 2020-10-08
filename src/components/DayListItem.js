import React from "react";
import "components/DayListItem.scss";
var classnames = require('classnames');
export default function DayListItem(props) {
 
const dayClass = classnames ("li", {
 
   "day-list__item" : true, 
  
  "day-list__item--selected" : props.selected,
  "day-list__item--full": props.spots === 0,
})
  const formatSpots = function (props) {
  return (props.spots === 0 ? 'no spots remaining': props.spots === 1 ? '1 spot remaining' : props.spots === 2 ? '2 spots remaining':`${props.spots} spots remaining`) ;
  }
    return (
    <li data-testid="day" className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular"> {props.name}</h2> 
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}
