const h = React.createElement
const MitoInstance = MITO.init({
  debug: true,
  silentConsole: true,
  maxBreadcrumbs: 10,
  dsn: 'http://localhost:2021/errors/upload'
})

window._MITO_ = MitoInstance

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { counter: 0 }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(({ counter }) => ({
      counter: counter + 1
    }))
  }

  render() {
    if (this.state.counter === 3) {
      throw new Error('I crashed!')
    }
    return h('h1', { onClick: this.handleClick, id: 'numException' }, this.state.counter)
  }
}
ReactDOM.render(h(MITO.ErrorBoundary, { children: h(BuggyCounter), MitoInstance }), document.getElementById('root'))
