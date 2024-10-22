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
            // Fetch request to the API URL
            fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json(); // Parsing JSON response
            })
            .then(data => {
                console.log('Tickets data:', data); // Access the ticket data
                const ticketsGroupedByPriority = [];
                const ticketsGroupedByUser = [];
                const ticketsGroupedByStatus = [];
                // You can manipulate or display the data here
                
                function getUserDetails(userId) {
                    return data.users.find(user => user.id === userId);
                }

                data.tickets.forEach(ticket => {
                    const { priority, userId, status } = ticket;
                    console.log(priority, userId, status)

                    const userDetails = getUserDetails(userId);
                  
                    const ticketWithUser = { ...ticket, user: userDetails };
                  
                    // Group by priority
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
                  
                    // Group by user
                    let userGroup = ticketsGroupedByUser.find(group => group.tag === `${userDetails.name}`);
                    if (!userGroup) {
                      userGroup = { tag: `${userDetails.name}`, tickets: [] };
                      ticketsGroupedByUser.push(userGroup);
                    }
                    userGroup.tickets.push(ticketWithUser);

                    // Group tickets by status, excluding 'cancelled' and 'done' initially
                    if (status !== 'Cancelled' && status !== 'Done') {
                        let statusGroup = ticketsGroupedByStatus.find(group => group.tag === `${status}`);
                        if (!statusGroup) {
                        statusGroup = { tag: `${status}`, tickets: [] };
                        ticketsGroupedByStatus.push(statusGroup);
                        }
                        statusGroup.tickets.push(ticketWithUser);
                    }
                    
                    // Ensure 'cancelled' and 'done' are always present at the end
                    ['Cancelled', 'Done'].forEach(status => {
                        let statusGroup = ticketsGroupedByStatus.find(group => group.tag === status);
                        if (!statusGroup) {
                        statusGroup = { tag: status, tickets: [] };
                        ticketsGroupedByStatus.push(statusGroup);
                        }
                    });
                    
                    // Sort to ensure 'cancelled' and 'done' are last
                    ticketsGroupedByStatus.sort((a, b) => {
                        if (a.tag === 'Done') return 1; // Push 'done' to end
                        if (a.tag === 'Cancelled') return 1; // Push 'cancelled' to end
                        return -1; // Keep other statuses in order
                    });
  
                  });
                  
                // Results
                //   console.log("Tickets grouped by priority:", ticketsGroupedByPriority);
                //   console.log("Tickets grouped by user:", ticketsGroupedByUser);
                //   console.log("Tickets grouped by status:", ticketsGroupedByStatus);
                  
                // Results
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