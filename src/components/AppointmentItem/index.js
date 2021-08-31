// Write your code here

import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {Details, starToggling} = props
  const {id, title, givenDate, isStarred} = Details
  const fDate = format(new Date(givenDate), 'dd MMMM yyyy, EEEE')
  const imageSource = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const starClicked = () => {
    starToggling(id)
  }
  return (
    <li className="list-item">
      <div className="list-div">
        <div className="name-star">
          <p className="title">{title}</p>
          <button
            type="button"
            testid="star"
            className="image-container"
            onClick={starClicked}
          >
            <img src={imageSource} className="img1" alt="star" />
          </button>
        </div>
        <p className="date">Date:{fDate}</p>
      </div>
    </li>
  )
}

export default AppointmentItem
