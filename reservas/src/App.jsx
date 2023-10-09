
import { AuthProvider } from './context/AuthContext';
import './App.css';
import '@mui/material/styles';
import FormsFirebase from './component/FormsFirebase';
import logoIMG from '../src/img/nonita.png'
function App() {
  return (
    <AuthProvider>
      <div className='contenedorTotal'>
        <div className='encabezado'>
          <h1>

            <img
              src={logoIMG}
              alt="Descripción de la imagen"
              style={{ maxWidth: "300px" }} // Opcional: aplica estilos a la imagen
            />
          </h1>
        </div>
        <FormsFirebase />
      </div>
    </AuthProvider>
  )
}

export default App;
