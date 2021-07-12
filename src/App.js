import './App.css'
import { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Container, Form, Row } from 'react-bootstrap'
import Movie from './components/Movie'

// CONSTRUCTOR
// *RENDER
// *COMPONENTDIDMOUNT
// *COMPONENDDIDUPDATE
// COMPONENTWILLUNMOUNT

// * => MOST IMPORTANT ONES

// REACT COMPONENTS CAN BE BUILT IN TWO WAYS: functions, or classes

// differences: speed, functionalities

// functional components can render JSX and use props
// class components can do everything a functional component can do,
// and moreover deal with STATE and LIFECYCLE METHODS

class App extends Component {
  state = {
    movieTitle: 'Batman Begins',
  }

  componentDidMount = () => {
    // componentDidMount is another lifecycle method
    // that just happens ONCE
    // it happens after the initial render of the component
    console.log('COMPONENTDIDMOUNT')
    // it's pretty much like window.onload() in vanilla JS
    // because it happens just once and it waits for the initial render to complete
    // it's the PERFECT PLACE for fetching information or doing expensive operations
  }

  // render() is a lifecycle method
  // it's also the most used one because it's mandatory in a class component!
  render = () => {
    console.log('THIS IS RENDER')
    // render() gets triggered every time there's a change in the STATE or in the PROPS
    // of the component
    return (
      <div className="App pt-3" id="movie-chooser">
        <Container>
          <Row>
            <Col>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Choose a movie!</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) =>
                    this.setState({
                      movieTitle: e.target.value,
                    })
                  }
                  value={this.state.movieTitle}
                >
                  <option>Batman Begins</option>
                  <option>Man of Steel</option>
                  <option>Wonder Woman</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>{this.state.movieTitle === 'Wonder Woman' && <Movie movieTitle={this.state.movieTitle} />}</Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App
