import React from 'react'
import PropTypes from 'prop-types';
class Login{
    constructor(uid,pwd){
        this.username=uid;
        this.password=pwd;
    }
}

class PropTypesCom extends React.Component{
    render(){
        return (
            <div>
             <h1 className='text-center mb-2'>PropTypes</h1>
                <h2>Login UserName is :{this.props.loginObj.username}</h2>
                <h2>Login Password is :{this.props.loginObj.password}</h2>

            </div>
        )
    }
}

PropTypesCom.defaultProps={
    loginObj:new Login("GaneshKollati","Admin")
}
PropTypesCom.propTypes={
    loginObj:PropTypes.instanceOf(Login)
}
export default PropTypesCom;