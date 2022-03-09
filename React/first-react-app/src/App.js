import logo from './logo.svg'
import React from 'react'
import Hello from './hello';
import Emp from './empDetails';
import CondationalRendering from './CondationalRender';
import DefaultProps from "./defaultProps"
import StateToProps from './stateToProps';
import PropTypes from './propsTypes';
import SetStateUpdate from './setStateUpdate';
import ForceUpdate from './forceUpdate';
import ErrorBoundary from './ErrorBoundry';
import BuggyCounter from './BuggyCounter';
import LifeCycle from './LifeCycle';
// import empDetails  from './empDetails';

// function App() {
//   return (
//     <div className="App bg-warning">
//        <input type="button" className="btn btn-danger" value="click me"/>
//     </div>
//   );
// }

class App extends React.Component {
  
  render() {
    return (
      
      <div className="App">

        {/* <Hello/> */}
        {/* CW_1 */}
        {/* <Emp/> */}
        {/* <CondationalRendering/> */}
        {/* <DefaultProps/> */}
        {/* <StateToProps/> */}
        {/* <PropTypes/> */}
        {/* <SetStateUpdate/> */}
        {/* <ForceUpdate/> */}
        {/* <ErrorBoundary><BuggyCounter/></ErrorBoundary> */}
        <LifeCycle/>

      </div>
      // <div className="App ">
      //  <h3>{this.state.count}</h3>
      //   <FirstComponent />
      //   <SecondComponent count={this.state.count} inc={this.incre}/>
      // </div>
    );
  }
}
// class FirstComponent extends React.Component{
//   render(){

//     return(
//        <div className='bg-light'>
//           <h1>First Component</h1>
//           <img src={logo} width="200" height="200"/>
//           <hr/>
//        </div>
//     )
//   }
// }


// class SecondComponent extends React.Component{
//   constructor(props){
//     super();
//     console.log(props.count);
//   }

//   render(){
//     return(
//     <div className="" >
//          <h1 className='text-danger'>SecondComponent {this.props.count}</h1>
//          <input type="button" className="btn btn-danger" value="click me" />

//     </div>
//     )
//   }
// }



export default App;
