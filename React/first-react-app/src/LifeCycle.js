import React from 'react'

class LifeCycle extends React.Component{
    constructor(props){
        super(props)
        this.state={date:new Date()}

    }
    updateDate=()=>{
        this.setState({date:new Date()})
        // console.log(this.state);
        // this.forceUpdate();

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
    componentDidMount(){
        alert("ComponentDidMount : This  function is called when the component is rendered in Dom..")
    }
    componentWillMount(){
        alert("ComponentWillMount: This function is called before the data is rendered into DOM")
    }
    componentWillUpdate(){
        alert("componentWillUpdate : This function is invoked before the updation occurs..")
    }
    componentDidUpdate(){
        
            alert("componentDidUpdate : This function is invoked after the component is updated...")
        
    }
    componentWillUnmount(){
        alert("componentWillUnmount : This function is called before the component is removed and destroy")
    }
}

export default LifeCycle;