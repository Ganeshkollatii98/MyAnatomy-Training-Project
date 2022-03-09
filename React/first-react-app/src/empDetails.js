// import logo from './logo.svg'
import React from 'react'


class Emp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 101, empname: "Ganesh", desig: "SE", department: "cse" },
        { id: 102, empname: "ramesh", desig: "SDE", department: "cse" },
        { id: 103, empname: "suresh", desig: "Front end", department: "ece" },
        { id: 104, empname: "mahesh", desig: "React dev", department: "ece" },
        { id: 105, empname: "rajesh", desig: "Angular dev", department: "IT" },
      ]
    }
  }
  render() {
    return (

      <div className="App">
        {/* CW_1 */}
        <DisplayName />
        <div>

          <DisplayData data={this.state} />

        </div>
      </div>
    );
  }
}


class DisplayName extends React.Component {
  render() {
    return (
      <div>
        <h1 className='text-center'>Displaying employee details</h1>
      </div>
    )
  }
}

class DisplayData extends React.Component {
  constructor(props){
    super(props)
    this.state=props.data;
  }
  render() {
    console.log("checking",this.state.data)
    return (
      <div>
        <table className="table table-success table-striped">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">name</th>
              <th scope="col">department</th>
              <th scope="col">designation</th>
            </tr>
          </thead>
          <tbody>
            {
              
              this.state.data.map((record) => 
              
              <tr key={record.id}>
                <th>{record.id}</th>
                <td>{record.empname}</td>
                <td>{record.department}</td>
                <td>{record.desig}</td>
              </tr>

            )}

          </tbody>
        </table>
      </div>
    )
  }
}



export default Emp;
