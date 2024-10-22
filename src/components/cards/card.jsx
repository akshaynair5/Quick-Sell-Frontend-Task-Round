import { useContext, useEffect, useState } from 'react';
import './card.scss'
import Ticket from '../tickets/ticket';
import add from '../../assets/add.svg'
import dot from '../../assets/3 dot menu.svg'
import in_progress from '../../assets/in-progress.svg'
import Backlog from '../../assets/Backlog.svg'
import To_do from '../../assets/To-do.svg'
import no_priority from '../../assets/No-priority.svg'
import low_priority from '../../assets/Img - Low Priority.svg'
import medium_priority from '../../assets/Img - Medium Priority.svg'
import high_priority from '../../assets/Img - High Priority.svg'
import urgent_priority from '../../assets/SVG - Urgent Priority colour.svg'
import Cancelled from '../../assets/Cancelled.svg'
import Done from '../../assets/Done.svg'
import { ContentContext } from '../../contextConfig';

function Card({content}) {
    const { contentViewMode } = useContext(ContentContext);
    const [sortedTickets, setSortedTickets] = useState(content.tickets)

    useEffect(() => {
      const sortedTickets = [...content.tickets].sort((a, b) => {
        if (contentViewMode.ordering === 'Priority') {
          return b.priority - a.priority;
        } else if (contentViewMode.ordering === 'Title') {
            console.log('ll')
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
      
      setSortedTickets(sortedTickets);
    
    }, [contentViewMode]);

  const imageMap = {
    'Backlog': Backlog,
    'In progress': in_progress,
    'Todo': To_do,
    'Cancelled': Cancelled,
    'Done': Done,
    'No priority' :  no_priority,
    'low' : low_priority,
    'Medium' : medium_priority,
    'High' : high_priority,
    'Urgent' : urgent_priority,
  }

  return (
    <div className="card">
        <div className='card-title'>
            <img src={imageMap[content.tag]} className='card-icon'></img>
            <div className='card-id'>{content.tag} <span>{content.tickets.length}</span> </div>
            <button className='btn'><img src={add}></img></button>
            <button className='btn'><img src={dot}></img></button>

        </div>
        {
            sortedTickets.map((ticket,index)=>(
                <Ticket ticket={ticket} key={index}/>
            ))
        }
    </div>
  )
}

export default Card;