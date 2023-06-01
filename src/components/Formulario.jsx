import { useState, useEffect } from 'react';
import Error from './Error';

function Formulario({setPacientes, pacientes, paciente , setPaciente}) {
    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [error, setError] = useState(false)

    useEffect(()=>{
        if(Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    },[paciente])

    const generarId = ()=>{
        const random = Math.random().toString(36).substr(2)
        const fecha = Date.now().toString(36)
        return random+ fecha
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            setError(true)
        } else {
            setError(false)
        }
        //Objeto de paciente
        const objetoPaciente = {
            nombre, 
            propietario, 
            email, 
            fecha, 
            sintomas
        }
        if(paciente.id){
            //Editando registro
            objetoPaciente.id = paciente.id
            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
            setPacientes(pacientesActualizados)
            setPaciente({})
        }else{
            //Nuevo registro
            objetoPaciente.id = generarId()
            setPacientes([...pacientes, objetoPaciente])
        }
        //Reiniciar form
        
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')

    }
    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h1 className="font-black text-3xl text-center">Seguimiento Pacientes</h1>
            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Adminsitralos</span>
            </p>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-5 mx-3"
            >
                {error &&
                <Error><p>Todos los campos son obligatorios</p></Error>
                }
                <div className="mb-5">
                    <label className="block text-gray-700" htmlFor="mascota">Nombre mascota</label>
                    <input
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="mascota" type="text"
                        placeholder="Nombre de la mascota"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700" htmlFor="propietario">Nombre propietario</label>
                    <input
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="propietario"
                        type="text"
                        placeholder="Nombre del propietario"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700" htmlFor="email">Email</label>
                    <input
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="email"
                        type="email"
                        placeholder="Email de contacto"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700" htmlFor="date">Alta</label>
                    <input
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="date"
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700" htmlFor="sintomas">Sintomas</label>
                    <textarea
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400"
                        id="sintomas"
                        placeholder="Describe los sintomas"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    />
                </div>
                <input type="submit" 
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" 
                value={paciente.id ? 'Editar Paciente' : 'Guardar paciente'} />
            </form>
        </div>
    )
}
export default Formulario