// Write your code
import {Component} from 'react'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    givenDate: '',
    appointmentList: [],
    starBtn: false,
    starList: [],
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({givenDate: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, givenDate, appointmentList} = this.state
    const newAppointment = {
      id: v4(),
      title,
      givenDate,
      isStarred: false,
    }
    const newUpdatedList = [...appointmentList, newAppointment]
    this.setState({
      appointmentList: newUpdatedList,
      title: '',
      givenDate: '',
    })
  }

  starToggling = id => {
    const {appointmentList} = this.state

    const result = appointmentList.map(each => {
      if (each.id === id) {
        return {...each, isStarred: !each.isStarred}
      }
      return each
    })
    this.setState({appointmentList: result})
  }

  starBtnClicked = () => {
    const {appointmentList, starBtn} = this.state
    if (starBtn) {
      this.setState({
        starList: [],
        starBtn: false,
      })
    } else {
      const filteredAppointments = appointmentList.filter(
        each => each.isStarred === true,
      )
      this.setState({
        starList: filteredAppointments,
        starBtn: true,
      })
    }
  }

  render() {
    const {title, givenDate, appointmentList, starBtn, starList} = this.state
    const btnClass = starBtn ? 'active' : ''
    return (
      <div className="appointment-app-container">
        <div className="appointment-container">
          <div className="hide-and-seek">
            <div>
              <h1 className="heading">Add Appointment</h1>
              <form className="form" onSubmit={this.addAppointment}>
                <label className="label" htmlFor="title">
                  TITLE
                </label>
                <input
                  id="title"
                  className="input-title"
                  type="text"
                  placeholder="Title"
                  onChange={this.onChangeTitle}
                  value={title}
                />
                <label className="label" htmlFor="date">
                  DATE
                </label>
                <input
                  id="date"
                  className="input-date"
                  type="date"
                  value={givenDate}
                  onChange={this.onChangeDate}
                />

                <div>
                  <button type="submit" className="addButton">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <img
              className="appointment-image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="appointments"
            />
          </div>

          <hr className="line" />

          <div className="result-heading-container">
            <h1 className="heading">Appointments</h1>
            <div className="star-button-container">
              <button
                className={`star-button ${btnClass}`}
                onClick={this.starBtnClicked}
              >
                Starred
              </button>
            </div>
          </div>

          {starBtn ? (
            <ul className="list-container">
              {starList.map(each => (
                <AppointmentItem
                  Details={each}
                  starToggling={this.starToggling}
                  key={each.id}
                />
              ))}
            </ul>
          ) : (
            <ul className="list-container">
              {appointmentList.map(each => (
                <AppointmentItem
                  Details={each}
                  starToggling={this.starToggling}
                  key={each.id}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Appointments
