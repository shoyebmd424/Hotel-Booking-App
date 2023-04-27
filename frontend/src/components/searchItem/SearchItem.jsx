import { Link } from "react-router-dom"
import "./searchItem.css"

const SearchItem = (item) => {
  return (
    <div className="searchItem">
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        // src={item.photos}
        // alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.item.name}</h1>
        <span className="siDistance">{item.item.distance} from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">
         {item.item.desc}
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
     {item.item.rating&&
        <div className="siRating">
          <span>Excellent</span>
          <button>{item.item.rating}</button>
        </div>} 
        <div className="siDetailTexts">
          <span className="siPrice">${item.item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
        <Link to={`/hotel/${item.item._id}`}>  <button className="siCheckButton">See availability</button></Link>
        </div>
      </div>
    </div>
  )
}

export default SearchItem