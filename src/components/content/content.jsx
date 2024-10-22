import { useContext, useEffect } from 'react';
import './content.scss'
import { ContentContext } from '../../contextConfig.jsx';
import Card from '../cards/card.jsx';

function Content() {    
    const {contentViewMode,ticketsByPriority,ticketsByUser,ticketsByStatus} = useContext(ContentContext);
    useEffect(()=>{
       console.log(contentViewMode,ticketsByPriority,ticketsByUser,ticketsByStatus)
    },[])
  return (
    <div className="content">
        {
            contentViewMode.grouping === 'Status' && ticketsByStatus.length > 0 && 
            <>
                {
                    ticketsByStatus.map((content,index)=>(
                        <Card key={index} content = {content} />
                    ))
                }
            </>

        }
        {
            contentViewMode.grouping === 'Priority' && ticketsByPriority.length > 0 &&
            <>
                {
                    ticketsByPriority.map((content,index)=>(
                        <Card key={index} content = {content} />
                    ))
                }
            </>
        }
        {
            contentViewMode.grouping === 'User' && ticketsByUser.length > 0 &&
            <>
                {
                    ticketsByUser.map((content,index)=>(
                        <Card key={index} content = {content} />
                    ))
                }
            </>
        }
    </div>
  );
}

export default Content;