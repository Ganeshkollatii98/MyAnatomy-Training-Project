import React from 'react'

class SetStateUpdate extends React.Component{
    constructor(props){
        super(props)
        this.state={name:"Ganesh Kollati"}

    }
    updateName=()=>{
        this.setState({name:"Charan Kumar"})
        console.log(this.state);
    }
    render(){
        return (
            <div>
             <h1 className='text-center mb-2 text-warning'>Set State Update</h1>
             <div className='d-flex mb-2'>
                 <h2>Name of the state variable is  : </h2>
                 <h3>{this.state.name}</h3>
             </div>
             <input className='btn btn-primary' value="update name" onClick={this.updateName}/>


            </div>
        )
    }
}

export default SetStateUpdate;