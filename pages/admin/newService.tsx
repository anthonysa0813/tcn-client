import React from 'react'
import LayoutDashboard from '../../components/dashboard/LayoutDashboard'

const NewServicePage = () => {
  return (
    <LayoutDashboard>
        <h1>Crear un nuevo servicio</h1>
        <form>
            <div className="field">
                <label>Título:</label>
                <input type="text"  />
            </div>
            <div className="field">
                <label>Nombre de la compañia:</label>
                <input type="text"  />
            </div>
        </form>
    </LayoutDashboard>
  )
}

export default NewServicePage