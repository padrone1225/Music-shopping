import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Nav extends Component {
  state = {
    searchText: ''
  }
  onLogout = () => {
    localStorage.removeItem('token')
    this.props.history.replace('/')
  }
  onInputChange = e => {
    this.setState({ searchText: e.target.value })
  }
  onSearchSubmit = e => {
    e.preventDefault()
    if (this.state.searchText.length > 0) {
      this.props.history.push({
        pathname: '/stream/search',
        search: `?q=${this.state.searchText.toLowerCase()}`,
        state: { id: this.state.searchText.toLowerCase() }
      })
      this.setState({ searchText: '' })
    }
  }
  render() {
    return (
      <nav className="navbar ">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <p>SoundIze</p>
          </a>

          <a
            className="navbar-item is-hidden-desktop"
            href="https://github.com/jgthms/bulma"
            target="_blank"
          >
            <span className="icon">
              <i className="fa fa-github" />
            </span>
          </a>

          <a
            className="navbar-item is-hidden-desktop"
            href="https://twitter.com/jgthms"
            target="_blank"
          >
            <span className="icon">
              <i className="fa fa-twitter" />
            </span>
          </a>

          <div className="navbar-burger burger" data-target="navMenubd-example">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div id="navMenubd-example" className="navbar-menu">
          <div className="navbar-start">
            <NavLink
              className="navbar-item "
              to="/stream/me"
              activeStyle={{ color: '#ff6b42' }}
            >
              Min Musik
            </NavLink>
            <NavLink
              className="navbar-item "
              to="/app/search/hej"
              activeStyle={{ color: '#ff6b42' }}
            >
              Utforska
            </NavLink>
            <NavLink
              className="navbar-item "
              to="/adadad"
              activeStyle={{ color: '#ff6b42' }}
            >
              Nytt
            </NavLink>
            <NavLink
              className="navbar-item "
              to="/sdsdsd"
              activeStyle={{ color: '#ff6b42' }}
            >
              Topplistor
            </NavLink>
            <NavLink
              to="/login"
              onClick={() => this.onLogout()}
              className="navbar-item"
            >
              Refresh
            </NavLink>
          </div>

          <div className="navbar-end">
            <form onSubmit={this.onSearchSubmit}>
              <input
                className="input"
                onChange={this.onInputChange}
                value={this.state.searchText}
                type="text"
                placeholder="Sök"
              />
            </form>

            <div className="navbar-item">
              {this.props.user ? (
                <div
                  className="field is-grouped"
                  style={{ alignItems: 'center' }}
                >
                  <img src={this.props.user.images[0].url} />
                  <div className="navbar-item has-dropdown is-hoverable user-nav-dropdown">
                    <a className="navbar-link user-nav-link">
                      {this.props.user.display_name}
                    </a>
                    <div className="navbar-dropdown">
                      <a
                        onClick={() => this.onLogout()}
                        className="navbar-item"
                      >
                        Logga ut
                      </a>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Nav
