import React from 'react'

export default function HogForm({ onAdd }) {
  const [name, setName] = React.useState('')
  const [specialty, setSpecialty] = React.useState('')
  const [weight, setWeight] = React.useState('')
  const [greased, setGreased] = React.useState(false)
  const [medal, setMedal] = React.useState('')
  const [image, setImage] = React.useState('')

  function handleSubmit(e){
    e.preventDefault()
    const newHog = {
      id: Date.now(),
      name,
      specialty,
      weight: Number(weight) || 0,
      greased,
      highestMedal: medal,
      image: image || `https://via.placeholder.com/200?text=${encodeURIComponent(name)}`
    }
    onAdd(newHog)
    setName(''); setSpecialty(''); setWeight(''); setGreased(false); setMedal(''); setImage('')
  }

  return (
    <form className="ui form" onSubmit={handleSubmit} style={{marginBottom: '1rem'}}>
      <div className="field">
        <label htmlFor="hog-name">Name</label>
        <input id="hog-name" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="hog-specialty">Specialty</label>
        <input id="hog-specialty" placeholder="Specialty" value={specialty} onChange={e=>setSpecialty(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="hog-weight">Weight</label>
        <input id="hog-weight" placeholder="Weight" value={weight} onChange={e=>setWeight(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="hog-greased">Greased</label>
        <input id="hog-greased" type="checkbox" checked={greased} onChange={e=>setGreased(e.target.checked)} />
      </div>
      <div className="field">
        <label htmlFor="hog-medal">Highest Medal</label>
        <input id="hog-medal" placeholder="Medal" value={medal} onChange={e=>setMedal(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="hog-image">Image URL</label>
        <input id="hog-image" placeholder="Image URL" value={image} onChange={e=>setImage(e.target.value)} />
      </div>
      <button className="ui button primary" type="submit">Add Hog</button>
    </form>
  )
}
