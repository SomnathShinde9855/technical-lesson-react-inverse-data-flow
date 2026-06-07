import React from 'react'

export default function HogCard({ hog, onHide }) {
  const [showDetails, setShowDetails] = React.useState(false)

  return (
    <div className="ui card" aria-label="hog card" onClick={() => setShowDetails(s => !s)} style={{cursor:'pointer'}}>
      <div className="image">
        <img src={hog.image} alt={hog.name} />
      </div>
      <div className="content">
        <h3 className="header">{hog.name}</h3>
        {showDetails && (
          <div className="description">
            <p><strong>Specialty:</strong> {hog.specialty}</p>
            <p><strong>Weight:</strong> {hog.weight}</p>
            <p><strong>Greased:</strong> {hog.greased ? 'Yes' : 'No'}</p>
            <p><strong>Highest Medal:</strong> {hog.highestMedal}</p>
          </div>
        )}
      </div>
      <div className="extra content">
        <button className="ui tiny button negative" onClick={(e) => { e.stopPropagation(); onHide(hog.id); }}>Hide Me</button>
      </div>
    </div>
  )
}
