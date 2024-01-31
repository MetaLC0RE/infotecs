import React from 'react';
import User from './User';
import '../css/main.css'

class Users extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      users: [
      ],
      search: '',
      error: null,
      isLoaded: false,
      sortName: '',
      sortAge: '',
      sortGender: '',
      sortAddress: ''
    }
  }


  tdClick = () => {
    console.log('clicked')
  }

  listOfUsers = () => {
    fetch("https://dummyjson.com/users/search?q=" + this.state.search)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            users: result.users
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  componentDidMount() {
    this.listOfUsers()
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevState.search !== this.state.search) {
      this.listOfUsers()
    }

  }

  render() {
    const { error, isLoaded, users } = this.state

    if (this.state.error) {
      return <p> Error {error.message} </p>
    } else if (!isLoaded) {
      return <p> Loading </p>
    } else {
      return (<div>
        <input
          type='text'
          placeholder='Поиск'
          onChange={(e) => this.setState({
            search: (e.target.value)

          })}
        />

        <table>
          <tr>
            <th>Фио</th>
            <th>Возраст</th>
            <th>Пол</th>
            <th>Номер телефона</th>
            <th>Адрес</th>
          </tr>
          <tr>
            <td>
              <select onChange={(e) => this.setState({ sortName: (e.target.value) })}>
                <option value='default'>По умолчанию</option>
                <option value='increase'>По возрастанию</option>
                <option value='decrease'>По убыванию</option>
              </select>
            </td>
            <td>
              <select onChange={(e) => this.setState({ sortAge: (e.target.value) })}>
                <option value='default'>По умолчанию</option>
                <option value='increase'>По возрастанию</option>
                <option value='decrease'>По убыванию</option>
              </select>
            </td>
            <td>
              <select onChange={(e) => this.setState({ sortGender: (e.target.value) })}>
                <option value='default'>По умолчанию</option>
                <option value='male'>Сначала мужчины</option>
                <option value='female'>Сначала женщины</option>
              </select>
            </td>
            <td />
            <td>
              <select onChange={(e) => this.setState({ sortAddress: (e.target.value) })}>
                <option value='default'>По умолчанию</option>
                <option value='increase'>По возрастанию</option>
                <option value='decrease'>По убыванию</option>
              </select>
            </td>
          </tr>
          {users.sort((a, b) => this.state.sortName === 'increase' && a.firstName > b.firstName ? -1 :
            this.state.sortName === 'decrease' && a.firstName < b.firstName ? -1 :
              this.state.sortAge === 'increase' ? a.age - b.age :
                this.state.sortAge === 'decrease' ? b.age - a.age :
                  this.state.sortGender === 'male' && a.gender > b.gender ? -1 :
                    this.state.sortGender === 'female' && a.gender < b.gender ? -1 :
                      this.state.sortAddress === 'increase' && a.address.city > b.address.city ? -1 :
                        this.state.sortAddress === 'decrease' && a.address.city < b.address.city ? -1 :
                          a.id - b.id).map((el) => <User key={el.id} user={el} />)}
        </table>
      </div>)
    }
  }
}

export default Users