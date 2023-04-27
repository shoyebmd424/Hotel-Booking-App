import "./hotel.css"
import useFatch from "../../Hooks/useFatch";
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import MailList from "../../components/mailList/MailList"
import Footer from "../../components/footer/Footer"
import { faCircleArrowLeft, faCircleArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons"
import { useLocation, useNavigate } from "react-router-dom"
import { SearchContext } from "../../Context/SearchContext";
import { AuthContext } from "../../Context/AuthContext";
import Reserve from "../../components/Reserve/Reserve";


const Hotel = () => {
  const location= useLocation();
  const id =location.pathname.split("/")[2];
  const {data,loading,error}=useFatch(`/hotel/${id}`)
  const {user}=useContext(AuthContext);
  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];
  const navigate=useNavigate();
  const [open,setOpen]= useState(false);
  const [openModel,setOpenModel]= useState(false);
  const [slideNumber,setSlideNumber]=useState(0);
  const {dates,options}=useContext(SearchContext);
const perday=1000*60*60*24;
const daydifference=(date1,date2)=>{
  const timediff=Math.abs(date2.getTime()-date1.getTime());
  const difdays=Math.ceil(timediff/perday)
  return difdays;
}
const handle=()=>{
  if(user){
setOpenModel(true)
  }else{
    navigate("/login");
  }
}
  const handleOpen=(i)=>{
    setOpen(true);
    setSlideNumber(i)
  } 
 const days=daydifference(dates[0].endDate,dates[0].startDate);

  const handleMove=(direction)=>{
    let newSlideNumber;
    if(direction==="l"){
        newSlideNumber=slideNumber===0?5:slideNumber-1
    }else{
      newSlideNumber=slideNumber===5?0:slideNumber+1
    }
    setSlideNumber(newSlideNumber)
  }

  return (
    <div>
        <Navbar/>
        <Header type="list"/>
       { loading? ("Loding"):<><div className="hotelContainer">

          {open && <div className="slider">
              <FontAwesomeIcon icon={faCircleXmark} onClick={()=>setOpen(false)} className="close"/>
              <FontAwesomeIcon icon={faCircleArrowLeft} onClick={()=>handleMove("l")} className="arrow"/>
              <div className="sliderWrapper">
                  <img src={photos[slideNumber].src} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon icon={faCircleArrowRight} onClick={()=>handleMove("r")} className="arrow"/>
          </div>}


            <div className="hotelWrapper">
              <button className="bookNow">Reserve or Book Now!</button>
              <h1 className="hotelTitle">{data.name}</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.address}</span>
              </div>
              <span className="hotelDistance">
                Excellent location – {data.distance}m from center
              </span>
              <span className="hotelPriceHighlight">
                Book a stay over  ${data.cheapestPrice} at this property and get a free airport taxi
              </span>
              <div className="hotelImages">
            
                  {
                      photos.map((photo,i)=>(
                          <div className="hotelImgWrapper" key={i} onClick={()=>handleOpen(i)}>
                              <img src={photo.src} alt="" className="hotelImg" />
                          </div>
                      ))
                  }

              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">{data.title}</h1>
                  <p className="hotelDesc">
                  {data.desc}
                  </p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {days}-night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of {data.rating} !
                  </span>
                  <h2>
                    <b>${days*data.cheapestPrice*options.room  }</b> ({days} nights)
                  </h2>
                  <button onClick={handle}>Reserve or Book Now!</button>
                </div>
              </div>
            </div>
            </div>
           </>
}
        <MailList/>
        <Footer/>
        {openModel&& <Reserve setOpen={setOpenModel} hotelId={id}/>}
    </div>
  )
}

export default Hotel