import React from 'react'

class DefaultProps extends React.Component{
    // constructor(props){
    //     super(props)
        
    //   }
      render() {
        // console.log("checking this",this.props.data)
        return (
          <div>
            <hr/>
             <h2 className='text-center'>DefaultProps</h2>
            <table className="table table-warning  table-hover">
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
                  
                  this.props.data.map((record) => 
                  
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

DefaultProps.defaultProps={data: [
    { id: 101, empname: "Ganesh", desig: "SE", department: "cse" },
    { id: 102, empname: "ramesh", desig: "SDE", department: "cse" },
    { id: 103, empname: "suresh", desig: "Front end", department: "ece" },
    { id: 104, empname: "mahesh", desig: "React dev", department: "ece" },
    { id: 105, empname: "rajesh", desig: "Angular dev", department: "IT" },
  ]}

  export default DefaultProps;