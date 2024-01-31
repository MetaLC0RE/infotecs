import React from 'react';
import '../css/main.css'

class User extends React.Component {

  render() {
    const user = this.props.user

    return (<tr>
      <td>{user.firstName} {user.lastName} {user.maidenName}</td>
      <td>{user.age}</td>
      <td>{user.gender}</td>
      <td>{user.phone}</td>
      <td>{user.address.city} {user.address.address}</td>
    </tr>)

  }
}

export default User