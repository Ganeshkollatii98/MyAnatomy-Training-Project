import React from 'react'

class StateToProps extends React.Component{
    constructor(props){
        super(props);
        this.state=new Date();
    }

    render(){
        return(
            <div>
               <h1 className='text-primary text-center '>State To Props</h1>
                <div className='d-flex'><h3 className='text-uppercase '> Current Time Is : <PassingState data={this.state}/></h3></div>
                
            </div>
        )
    }
}

class PassingState extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props.data.toLocaleTimeString());
        return (
            <div>
                <h3 className='text-warning'>{this.props.data.toLocaleTimeString()}</h3>
            </div>
        )
    }
}
export default StateToProps;