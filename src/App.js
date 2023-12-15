import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CategoryTable from './components/Categoria';
import DirectorTable from './components/Director';
import MovieTable from './components/Pelicula';




const App = () => {
  return (
    <div>
      <h1>Administrar Datos</h1>
      <CategoryTable />
      <DirectorTable />
      <MovieTable />
    </div>
  );
};


export default App;
