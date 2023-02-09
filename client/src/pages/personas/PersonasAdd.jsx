import React from 'react'
import PersonaForm from '../../components/PersonaForm'

const PersonasAdd = () => {
  return (
    <>
        <h1>Agregar Persona</h1>
        <hr />
        <div className="row">
            <div className="col-lg-4 col-sm-12 col-md-6">
                <PersonaForm />
            </div>
        </div>
    </>
  )
}

export default PersonasAdd