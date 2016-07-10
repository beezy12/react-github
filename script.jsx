// branch2. we went to api.github.com/users/beezy12 to see my profile in json. now we are trying to set
// up the api call. we install jQuery to use it to fetch data. something about a lifecycle hook that
// fires after page has rendered...it's called componentDidMount. it's a function that does an ajax call
// to the api. we will use the data coming back from the ajax call and set that as the new state
// for this component, we declare the component as a variable in the callback function before the call.
// var component = this. again, has to be done before the call is made. then we can access properties on
// the state to display my github profile pic and name and whatnot. however, my name beezy12 is still
// hard coded into the github url, so in the next branch we are going to change that....

// branch3. all I did was add the login varibles to Main. im making branch4 now....

// branch4. still, with my Cards, the name's are manually entered. so we are making an array of cards that
// we can add to.

// branch5. emptied the array, and making a form that allows user's to add to the array.
// this part got crazy.

// ******   as the state changes.....the render auto updates? im pretty sure



var Card = React.createClass({
  getInitialState: function() {
    return {}
  },
  componentDidMount: function() {
    var component = this
    $.get('https://api.github.com/users/' + this.props.login, function(data) {
      component.setState(data)
    })
  },
  render: function() {
    return (
      <div>
        <img src={this.state.avatar_url} width="80" />
        <div>
          <h3>{this.state.name}</h3>
          <h4>public repos: {this.state.public_repos}</h4>
        </div>
        <hr/>
      </div>
    )
  }
})

// prevent default prevents the form from submitting normally and refreshing the page
// also, use ref= to get React to access the value of the text input
var Form = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault()
    var loginInput = ReactDOM.findDOMNode(this.refs.login)

    // add the card here...and reset the input back to empty
    this.props.addCard(loginInput.value)
    loginInput.value = ''
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input placeholder="enter github login name" ref="login" />
        <button>Add</button>
      </form>
    )
  }
})

// as the state changes.....the render auto updates? im pretty sure
var Main = React.createClass({
  getInitialState: function() {
    return {logins: []}
  },
  addCard: function(loginToAdd) {
    this.setState({logins: this.state.logins.concat(loginToAdd)})
  },
  render: function() {
    var cards = this.state.logins.map(function(login) {
      return (<Card login={login} />)
    })
    return (
      <div>
        <Form addCard={this.addCard}/>
        {cards}
      </div>

    )
  }
})


ReactDOM.render(<Main />, document.getElementById('root'))
