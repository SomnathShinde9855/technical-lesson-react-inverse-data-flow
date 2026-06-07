import React from 'react'
import HogCard from './HogCard'

export default function HogList({ hogs, hiddenIds, onHide }) {
  return (
    <div className="ui cards">
      {hogs.filter(h => !hiddenIds.includes(h.id)).map(hog => (
        <HogCard key={hog.id} hog={hog} onHide={onHide} />
      ))}
    </div>
  )
}
