// branch2. we went to api.github.com/users/beezy12 to see my profile in json. now we are trying to set
// up the api call. we install jQuery to use it to fetch data. something about a lifecycle hook that
// fires after page has rendered...it's called componentDidMount. it's a function that does an ajax call
// to the api. we will use the data coming back from the ajax call and set that as the new state
// for this component, we declare the component as a variable in the callback function before the call.
// var component = this. again, has to be done before the call is made. then we can access properties on
// the state to display my github profile pic and name and whatnot. however, my name beezy12 is still
// hard coded into the github url, so in the next branch we are going to change that....


var Card = React.createClass({
  getInitialState: function() {
    return {}
  },
  componentDidMount: function() {
    var component = this
    $.get('https://api.github.com/users/beezy12', function(data) {
      component.setState(data)
    })
  },
  render: function() {
    return (
      <div>
        <img src={this.state.avatar_url} width="80" />
        <h3>{this.state.name}</h3>
        <hr/>
      </div>
    )
  }
})

var Main = React.createClass({
  render: function() {
    return (
      <div>
        <Card />
      </div>

    )
  }
})


ReactDOM.render(<Main />, document.getElementById('root'))
