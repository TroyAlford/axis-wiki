import React from 'react'

const Media = ({ match }) => (
  <div className="media page">
    <div className="media-container">
      <img
        alt={match.params.filename}
        src={`/media/full/${match.params.filename}`}
      />
    </div>
  </div>
)

Media.displayName = 'Media'
export default Media
