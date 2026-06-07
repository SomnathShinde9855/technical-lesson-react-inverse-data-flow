import React, { useState, useMemo } from 'react'
import './App.css'
import porkers from './porkers_data'
import HogList from './components/HogList'
import HogForm from './components/HogForm'
import Filters from './components/Filters'

function App(){
  const [hogs, setHogs] = useState(porkers)
  const [hiddenIds, setHiddenIds] = useState([])
  const [greasedOnly, setGreasedOnly] = useState(false)
  const [sortBy, setSortBy] = useState('name')

  function handleAdd(newHog){
    setHogs(prev => [newHog, ...prev])
  }

  function handleHide(id){
    setHiddenIds(prev => prev.includes(id) ? prev : [...prev, id])
  }

  const visibleHogs = useMemo(()=>{
    let list = [...hogs]
    if(greasedOnly) list = list.filter(h => h.greased)
    if(sortBy === 'name') list.sort((a,b)=> a.name.localeCompare(b.name))
    if(sortBy === 'weight') list.sort((a,b)=> a.weight - b.weight)
    return list
  },[hogs, greasedOnly, sortBy])

  return (
    <div className="ui container" style={{padding: '1rem'}}>
      <h1>Hog Barn</h1>
      <HogForm onAdd={handleAdd} />
      <Filters greasedOnly={greasedOnly} onToggleGreased={setGreasedOnly} sortBy={sortBy} onChangeSort={setSortBy} />
      <HogList hogs={visibleHogs} hiddenIds={hiddenIds} onHide={handleHide} />
    </div>
  )
}

export default App
