import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { setupAuthToAPI } from '../actions/user_actions'

class AlbumDetail extends Component {
  async componentWillMount() {
    window.scroll(0, 0)
    await this.props.setupAuthToAPI()
  }
  render() {
    return (
      <div className="album-detail-component ">
        <h1>AlbumDetail</h1>
      </div>
    )
  }
}

const mapStateToProps = ({ categories }) => {
  return { categories: categories.categories }
}

export default withRouter(
  connect(mapStateToProps, { setupAuthToAPI })(AlbumDetail)
)
