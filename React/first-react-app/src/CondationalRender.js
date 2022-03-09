import React from 'react'

class CondationalRendering extends React.Component{
    constructor(){
        super();
        this.state={
            displayBio:false
        }
    }
    render(){
        const fetch=this.state.displayBio?"true":"false"
        const bio=this.state.displayBio?(
            <div>
                <h2>we are learning react...</h2>
            </div>
        ):(<h1>bio not setted</h1>);
        return (
           <div>
               <h1 className='text-center text-warning'>CondationalRendering</h1>
               <h3>When bio is :{fetch}</h3>
                {bio}
           </div>
        )
    }
}

export default CondationalRendering;