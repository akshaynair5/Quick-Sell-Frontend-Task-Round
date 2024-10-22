import { createContext, useEffect, useState } from "react";


export const ContentContext = createContext()
export const ContentContextProvider =({children})=>{
    const [contentViewMode,setCVM] = useState({grouping: 'Status', ordering: 'Priority'})
    const [ticketsByPriority,setTicketsByPriority] = useState([])
    const [ticketsByUser,setTicketsByUser] = useState([])
    const [ticketsByStatus,setTicketsByStatus] = useState([])

    useEffect(()=>{
        const savedContentViewMode = localStorage.getItem('contentViewMode')
        if(savedContentViewMode){
            setCVM(JSON.parse(savedContentViewMode))
        }
    },[])
    
    useEffect(()=>{
        const fetchData = async () =>{
            await fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Tickets data:', data);
                const ticketsGroupedByPriority = [];
                const ticketsGroupedByUser = [];
                const ticketsGroupedByStatus = [];

                function getUserDetails(userId) {
                    return data.users.find(user => user.id === userId);
                }

                data.tickets.forEach(ticket => {
                    const { priority, userId, status } = ticket;
                    console.log(priority, userId, status)

                    const userDetails = getUserDetails(userId);
                  
                    const ticketWithUser = { ...ticket, user: userDetails };
                  
                    const priorityMap = {
                        0: 'No priority',
                        1: 'low',
                        2: 'Medium',
                        3: 'High',
                        4: 'Urgent',
                    };
                      
                    let priorityGroup = ticketsGroupedByPriority.find(group => group.tag === priorityMap[priority]);
                    if (!priorityGroup) {
                      priorityGroup = { tag: priorityMap[priority], tickets: [] };
                      ticketsGroupedByPriority.push(priorityGroup);
                    }
                    priorityGroup.tickets.push(ticketWithUser);                    
                  
                    let userGroup = ticketsGroupedByUser.find(group => group.tag === `${userDetails.name}`);
                    if (!userGroup) {
                      userGroup = { tag: `${userDetails.name}`, tickets: [] };
                      ticketsGroupedByUser.push(userGroup);
                    }
                    userGroup.tickets.push(ticketWithUser);

                    if (status !== 'Cancelled' && status !== 'Done') {
                        let statusGroup = ticketsGroupedByStatus.find(group => group.tag === `${status}`);
                        if (!statusGroup) {
                        statusGroup = { tag: `${status}`, tickets: [] };
                        ticketsGroupedByStatus.push(statusGroup);
                        }
                        statusGroup.tickets.push(ticketWithUser);
                    }
                    ['Cancelled', 'Done'].forEach(status => {
                        let statusGroup = ticketsGroupedByStatus.find(group => group.tag === status);
                        if (!statusGroup) {
                        statusGroup = { tag: status, tickets: [] };
                        ticketsGroupedByStatus.push(statusGroup);
                        }
                    });
                    
                    ticketsGroupedByStatus.sort((a, b) => {
                        if (a.tag === 'Done') return 1; 
                        if (a.tag === 'Cancelled') return 1; 
                        return -1;
                    });
  
                  });
                  
                // Results
                //   console.log("Tickets grouped by priority:", ticketsGroupedByPriority);
                //   console.log("Tickets grouped by user:", ticketsGroupedByUser);
                //   console.log("Tickets grouped by status:", ticketsGroupedByStatus);
                  
                setTicketsByPriority(ticketsGroupedByPriority);
                setTicketsByUser(ticketsGroupedByUser);
                setTicketsByStatus(ticketsGroupedByStatus);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

        }
        fetchData()
        localStorage.setItem('contentViewMode', JSON.stringify(contentViewMode))
    },[contentViewMode]);
    return(
        <ContentContext.Provider value={{contentViewMode,contentViewMode,ticketsByPriority,ticketsByUser,ticketsByStatus,setCVM}}>
            {children}
        </ContentContext.Provider>
    )
}