import React from 'react'

class BuggyCounter extends React.Component{
    constructor(props){
        super(props);
        this.state={counter:1}
    }
    updateCounter=()=>{
        this.setState(({counter})=>({counter:counter+1}))
    }

    render(){
        if(this.state.counter==4)
        {
            throw new Error("Invalid Count..");
        }
        return (
            <div>
                <h1 onClick={this.updateCounter}> Click on the number to update the value : {this.state.counter}</h1>
            </div>
        )
    }
}
export default BuggyCounter;