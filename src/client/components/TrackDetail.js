import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import PieChart from './PieChart'

import { getTrackDetail } from '../actions/track_actions'
import { setupAuthToAPI } from '../actions/user_actions'

class TrackDetail extends Component {
  async componentWillMount() {
    window.scroll(0, 0)
    await this.props.setupAuthToAPI()
    this.props.getTrackDetail(this.props.match.params.id)
  }
  navigateToArtistDetailPage = id => {
    this.props.history.push(`/artists/${id}`)
  }
  renderFormattedArtists = artists => {
    return artists.map((artist, index) => {
      if (index + 1 === artists.length) {
        return (
          <h2
            key={index}
            onClick={() => this.navigateToArtistDetailPage(artist.id)}
          >
            {artist.name}
          </h2>
        )
      } else {
        return (
          <h2
            key={index}
            onClick={() => this.navigateToArtistDetailPage(artist.id)}
          >
            {artist.name + ', '}
          </h2>
        )
      }
    })
  }
  render() {
    const { trackDetail } = this.props
    return (
      <div className="track-detail-component">
        <div className="track-header">
          <div className="track-art-wrapper">
            <img
              className="track-art"
              src={
                trackDetail.album.images
                  ? trackDetail.album.images[0].url
                  : 'https://upload.wikimedia.org/wikipedia/en/e/ee/Unknown-person.gif'
              }
            />
          </div>
          <div className="track-info-details">
            <div className="track-names">
              <div className="track-artists">
                {trackDetail.artists
                  ? this.renderFormattedArtists(trackDetail.artists)
                  : null}
              </div>
              <h1>{trackDetail.name}</h1>
            </div>
            <div className="track-character">
              <p>
                BPM: <span>{Math.round(trackDetail.tempo)}</span>
              </p>
              <p>
                Key: <span>{trackDetail.key}</span>
              </p>
            </div>
            <div className="track-measurements">
              <div>
                <p>Acousticness</p>
                <PieChart
                  measure={trackDetail.acousticness}
                  cn={'graph-one'}
                  cnt={'updated-text-one'}
                />
              </div>
              <div>
                <p>Danceability</p>
                <PieChart
                  measure={trackDetail.danceability}
                  cn={'graph-two'}
                  cnt={'updated-text-two'}
                />
              </div>
              <div>
                <p>Energy</p>
                <PieChart
                  measure={trackDetail.energy}
                  cn={'graph-three'}
                  cnt={'updated-text-three'}
                />
              </div>
              <div>
                <p>Instrumentalness</p>
                <PieChart
                  measure={trackDetail.instrumentalness}
                  cn={'graph-four'}
                  cnt={'updated-text-four'}
                />
              </div>
              <div>
                <p>Speechiness</p>
                <PieChart
                  measure={trackDetail.speechiness}
                  cn={'graph-five'}
                  cnt={'updated-text-five'}
                />
              </div>
              <div>
                <p>Valence</p>
                <PieChart
                  measure={trackDetail.valence}
                  cn={'graph-six'}
                  cnt={'updated-text-six'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ track }) => {
  return { trackDetail: track.trackDetail }
}

export default withRouter(
  connect(mapStateToProps, { setupAuthToAPI, getTrackDetail })(TrackDetail)
)
