import React from 'react'

class ForceUpdate extends React.Component{
    constructor(props){
        super(props)
        this.state={date:new Date()}

    }
    updateDate=()=>{
        this.setState({date:new Date()})
        // console.log(this.state);
        this.forceUpdate();

    }
    render(){
        console.log("rendered");
        return (
            <div>
            <h1 className='text-center mb-2 text-warning'>Force Update</h1>
             <div className='d-flex mb-2'>
                 <h2>Current time of the state variable is  : </h2>
                 <h3>{this.state.date.toLocaleTimeString()}</h3>
             </div>
             <input className='btn btn-primary' defaultValue="update date" onClick={this.updateDate}/>


            </div>
        )
    }
}

export default ForceUpdate;