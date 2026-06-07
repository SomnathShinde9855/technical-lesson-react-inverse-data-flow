import React from 'react'

export default function Filters({ greasedOnly, onToggleGreased, sortBy, onChangeSort }){
  return (
    <div className="ui form" style={{marginBottom: '1rem'}}>
      <div className="field">
        <input id="greased-only" type="checkbox" checked={greasedOnly} onChange={e=>onToggleGreased(e.target.checked)} />
        <label htmlFor="greased-only">Greased only</label>
      </div>
      <div className="field">
        <label htmlFor="sort-by">Sort by</label>
        <select id="sort-by" value={sortBy} onChange={e=>onChangeSort(e.target.value)}>
          <option value="name">Name</option>
          <option value="weight">Weight</option>
        </select>
      </div>
    </div>
  )
}
