import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import {useContext, useState} from 'react'
import {format} from "date-fns";
import { useNavigate } from "react-router-dom";
import {SearchContext} from "../../Context/SearchContext";
const Header = ({type}) => {
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [openDate,setOpenDate] = useState(false)

  const [openOptions,setOpenOptions]= useState(false)

  const [options,setOptions]=useState({
    adult:1,
    children:0,
    room:1
  })
  const handleOption=(name,operation)=>{
    setOptions((prev)=>{
      return{
        ...prev,
        [name]:operation==="d"?options[name]-1:options[name]+1
      }
    })
  }
const {dispatch}=useContext(SearchContext)
  const [destination,setDestination]=useState("")

  const navigate=useNavigate();
  const handleSearch=()=>{
    dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}})
      navigate("/hotels",{state:{destination,dates,options}})
  } 
  return (
    <div className="header">
      <div className={type==="list"?"headerContainer listMode":"headerContainer"}>
        <div className="headerList">
          <div className="headerListItem active">
              <FontAwesomeIcon icon={faBed}/>
              <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>

        {type!=="list" && <><h1 className="headerTitle">
        A lifetime of discounts? It's Genius.
        </h1>
        <p className="headerDesc">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Lamabooking account
            </p>
        <button className="headerBtn">Sign in / Register</button>


        <div className="headerSearch">
            <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon"/>
                <input onChange={(e)=>setDestination(e.target.value)} type="text" placeholder="Where are you going?" className="headerSearchInput"/>
            </div>

            <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
                <span onClick={()=>setOpenDate(!openDate)} className="headerSearchText">
                    {`${format(dates[0].startDate,"MM/dd/yyyy")} to ${format(dates[0].endDate,"MM/dd/yyyy")}`}
                </span>
                {
                  openDate && <DateRange
                  editableDateInputs={true}
                  onChange={item => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  className="date"
                  minDate={new Date()}
                />
                }
            </div>

            <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
                <span onClick={()=>setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adults · ${options.children} children · ${options.room} room}`}</span>
              {openOptions &&  <div className="options">
                    <div className="optionItem">
                        <span className="optionText">Adult</span>
                        <div className="optionCounter">
                          <button onClick={()=>handleOption("adult","d")} disabled={options.adult<=1} className="optionCounterButton">-</button>
                          <span className="optionCounterNumber">{options.adult}</span>
                          <button onClick={()=>handleOption("adult","i")} className="optionCounterButton">+</button>
                        </div>

                    </div>

                    <div className="optionItem">
                        <span className="optionText">Children</span>
                        <div className="optionCounter">
                          <button onClick={()=>handleOption("children","d")} disabled={options.children<=0}  className="optionCounterButton">-</button>
                          <span className="optionCounterNumber">{options.children}</span>
                          <button onClick={()=>handleOption("children","i")} className="optionCounterButton">+</button>
                        </div>

                    </div>

                    <div className="optionItem">
                        <span className="optionText">Room</span>
                        <div className="optionCounter">
                          <button onClick={()=>handleOption("room","d")} disabled={options.room<=1} className="optionCounterButton">-</button>
                          <span className="optionCounterNumber">{options.room}</span>
                          <button onClick={()=>handleOption("room","i")} className="optionCounterButton">+</button>
                        </div>

                    </div>
                </div>}
            </div>

            <div className="headerSearchItem">
                <button onClick={()=>handleSearch()} className="headerBtn">Search</button>
            </div>
        </div>
        </>}
      </div>
        
    </div>
  )
}

export default Header