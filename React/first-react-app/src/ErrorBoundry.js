import React from 'react'

class ErrorBoundary extends React.Component {

    //state variables error and error_info is initialized to null constructor (props) {
    constructor(props) {

        super(props);

        this.state = { error: null, error_info: null }
    }
    //When an error occurs, this callback function is called.

//Updating the state of error and error_info with the received data. this.setState ({error: error, error_info:error_info})

    componentDidCatch(error, error_info){
        this.setState({error:error,error_info:error_info})
    }

    render() {

        console.log("Inside render() of ErrorBoundary...");
    
        if (this.state.error_info) {
            return (
            <div>
    
                <h1> Something went wrong...</h1>
    
                <h2> {this.state.error.toString()}</h2>
                <h2> More info: {this.state.error_info.componentStack}</h2>
    
            </div>
            );
        }
        return this.props.children;
    }

    
}

export default ErrorBoundary;




