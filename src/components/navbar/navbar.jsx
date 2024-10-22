import { useContext, useState } from "react"
import './navbar.scss'
import displayIcon from '../../assets/Display.svg'
import down from '../../assets/down.svg'
import { ContentContext } from "../../contextConfig.jsx"

function Navbar() {
    const [optionsView,setOV] = useState(false)
    const {contentViewMode,setCVM} = useContext(ContentContext)
    return(
        <div className="navbar">

            <button onClick={()=>setOV(!optionsView)} className='options-btn'>
                <img src={displayIcon}></img>
                <p>Display</p>
                <img src={down}></img>
            </button>
            {
                optionsView && 
                <div className="options-view">
                
                    <div className='option'>
                        <span className='title'>Grouping</span>
                        <select className='options-btn' onChange={(e) => setCVM(state => ({ ...state, grouping: e.target.value }))} value={contentViewMode.grouping}>
                            <option value='Status'>Status</option>
                            <option value='User'>User</option>
                            <option value='Priority'>Priority</option>
                        </select>
                    </div>

                    <div className='option'>
                        <span className='title'>Ordering</span>
                        <select className='options-btn' onChange={(e) => setCVM(state => ({ ...state, ordering: e.target.value }))} value={contentViewMode.ordering}>
                            <option value='Priority'>Priority</option>
                            <option value='Title'>Title</option>
                        </select>
                    </div>

                </div>
            }
        </div>
    )
}

export default Navbar