import { Component } from 'react'

class Movie extends Component {

    timer = null

    state = {
        fetchedMovie: {},
    }

    // constructor(props) {
    //     super(props)
    //     console.log('this is the constructor of Movie')
    //     // constructor nowadays is useful for ONE thing:
    //     // bind the 'this' into your event listeners
    //     this.myClickHandler = this.myClickHandler.bind(this)
    //     // we're manually attaching the 'this' to my event listener
    // }

    componentDidMount = async () => {
        this.fetchMovie()

        this.timer = setInterval(() => {
            console.log('time goes by...')
        }, 1000)

    }

    fetchMovie = async () => {
        // console.log('this is movie componentDidMount')
        // I want to fetch the movie poster
        try {
            let response = await fetch('http://www.omdbapi.com/?apikey=24ad60e9&s=' + this.props.movieTitle)
            if (response.ok) {
                console.log(response)
                let data = await response.json()
                console.log(data.Search[0])
                this.setState({
                    fetchedMovie: data.Search[0]
                })
            } else {
                console.log('error')
            }
        } catch (error) {
            console.log(error)
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        console.log('COMPONENTDIDUPDATE')
        // it works like render()
        // it will fire again every time there's a change in the state or in the props

        // our goal is to launch fetchMovie when we're getting a new movieTitle prop
        // the problem is that we're re-entering componentDidUpdate because we're setting the state
        // into fetchMovie()
        // you'll enter componentDidUpdate in BOTH situations:
        // 1) if you're changing the state
        // 2) if you're receiving a new movieTitle prop

        if (
            // this if should launch fetchMovie just if we received a new movieTitle prop
            // this if should PREVENT to launch fetchMovie if we're getting here just because
            // we set the state again
            prevProps.movieTitle !== this.props.movieTitle
        ) {
            this.fetchMovie()
        }
        // IF YOU DON'T PUT A CONDITION IN YOUR COMPONENTDIDUPDATE
        // VERY OFTEN YOU'LL ENTER AN INFINITE LOOP!!
    }

    // this.state.arrayOfNames.push('Stefano') // PRETTY BAD
    // console.log(this.state.arrayOfNames)
    // let currentArray = [...this.state.arrayOfNames]
    // currentArray.push('Stefano')
    // this.setState({
    //     arrayOfNames: currentArray
    // }, () => {
    //     console.log('currentArray', this.state.arrayOfNames)
    // })
    // this.setState({
    //     arrayOfNames: [...this.state.arrayOfNames, 'Stefano']
    // }, () => {
    //     console.log('arrayOfNames', this.state.arrayOfNames)
    // })
    myClickHandler = () => {
        console.log(this.setState)
    }

    componentWillUnmount = () => {
        // this is a lifecycle method called one instant before the unmounting of the component
        console.log('BYE BYE')
        // a component will get removed from the dom usually in two situations:
        // 1) a page refresh
        // 2) a conditional rendering
        // this is useful in rare situations
        // - disconnecting the user from a socket, or a real-time connection
        // - clearing intervals or timeouts
        clearInterval(this.timer)
    }

    render() {

        // this.fetchMovie()

        // console.log('the movie I received is: ', this.props.movieTitle)
        // this is getting fired again at every movie change
        // because Movie it's receiving this information with props!
        // render() will fire again, because of the new prop!
        return (
            <div className="movie-poster" onClick={this.myClickHandler}>
                {/* we're preventing now our application to crash
                if we still don't have a Title and a Poster to use */}
                {
                    this.state.fetchedMovie.Title && <>
                        <p>{this.state.fetchedMovie.Title}</p>
                        <img
                            src={this.state.fetchedMovie.Poster}
                            style={{ width: '300px', height: 'auto' }}
                            alt="movie"
                        />
                    </>
                }
            </div>
        )
    }
}

export default Movie