import { useEffect, useContext } from 'react'
import './ticket.scss'
import user from '../../assets/user.png'
import dot from '../../assets/3 dot menu.svg'
import check from '../../assets/check.svg'
import empty from '../../assets/empty.svg'
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

function Ticket({ticket}) {
    const { contentViewMode } = useContext(ContentContext);

    const imageMap = {
        'Backlog': Backlog,
        'In progress': in_progress,
        'Todo': To_do,
        'Cancelled': Cancelled,
        'Done': Done,
        0 :  no_priority,
        1 : low_priority,
        2 : medium_priority,
        3 : high_priority,
        4 : urgent_priority,
    }


  return (
    <div className='ticket'>
        <div className='row'>
            <div className='id'>{ticket.id}</div>
            {
                contentViewMode.grouping != 'User' && 
                <>
                    <img src={user} className='profilePhoto'></img>
                    <div className='active-status' style={{backgroundColor: ticket.user.available == true ? 'rgb(17, 177, 17)' : 'rgb(160, 164, 160)'}}></div>
                </>
            }
        </div>
        <div className='row2'>
            {
                ticket.status === 'Done' && <img src={check}></img>
            }
            {
                ticket.status != 'Done' && <img src={empty}></img>
            }
            <p className='title'>{ticket.title}</p>
        </div>
        <div className='row3'>
            {
                contentViewMode.grouping === 'Status' && <button className='btn'><img src={imageMap[ticket.priority]}></img></button>
            }
            {
                contentViewMode.grouping === 'User' && <button className='btn'><img src={imageMap[ticket.priority]}></img></button>
            }
            {
                ticket.tag.map((tag, index) => (
                    <div key={index} className='tag'><span className='dot'></span> {tag}</div>
                ))
            }
        </div>
    </div>
    )
}

export default Ticket