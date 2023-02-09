import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2'


const initialValues = {
    nombre: '',
    apellido: '',
    edad: 18
}

const PersonasErrores = Yup.object().shape({
    nombre: Yup.string()
        .min(5, 'El nombre debe tener como minimo 5 caracteres')
        .max(70, 'No puede ser muy largo el nombre.')
        .required('Requerido'),
    apellido: Yup.string()
        .required('El apellido es requerido.')
        .min(10, 'Se necesita como minumo 10 caracteres.')
        .max(100, 'no puede superar los 100 caracteres'),
    edad: Yup.number()
        .integer('Debe ser numero entero')
        .required('Se necesita la edad si o si.')
        .positive('No puede ser negativo'),
});

const PersonaForm = () => {
    const handleSubmit = async(values, actions) => {

        try {
            const respuesta = await axios.post(`${process.env.REACT_APP_API_URL}/people`, values);
            console.log(respuesta);
            if (respuesta.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: 'GENIAL!!!',
                    text: `Se ha agregado ${respuesta.data.nombre} perfectamente!`,
                });

                actions.resetForm(initialValues);
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Ops que mal!!!',
                text: `Error: ${error?.response?.data?.message || error.message}`,
            })
        }


        
    }

  return (
    <Formik 
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={PersonasErrores}
    >
        {({ errors, touched, isValid, dirty }) => (
            <Form>
                <Field name="nombre" className="form-control" placeholder="Nombre" />
                {touched.nombre && errors.nombre && <div className="ms-3 mt-1 text-danger">{errors.nombre}</div>}
                <Field name="apellido" className="form-control mt-2" placeholder="Apellido"/>
                {touched.apellido && errors.apellido && <div className="ms-3 mt-1 text-danger">{errors.apellido}</div>}
                <Field name="edad" type="number" className="form-control mt-2" placeholder="Edad" />
                {touched.edad && errors.edad && <div className="ms-3 mt-1 text-danger">{errors.edad}</div>}
                <button className="btn btn-primary mt-5" disabled={!(isValid && dirty)}>Crear Persona</button>
            </Form>
        )}
    </Formik>
  )
}

export default PersonaForm