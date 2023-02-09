import React from 'react'
import { Link } from 'react-router-dom'

const Personas = () => {
  return (
    <>
      <h1>Listado de Personas</h1>
      <Link to="/personas/agregar" className="btn btn-primary">Agregar Persona</Link>
    </>
  )
}

export default Personas