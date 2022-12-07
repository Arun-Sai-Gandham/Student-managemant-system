import BodyContent from './components/bodyContent/bodyContent';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import ViewStudentDetails from './components/viewStudent/viewStudent';

function App() {
  return (
    <div className="App">
      <div className="main-outer">
        
        <div className="header">
          <Header/>
        </div>
        <div className="body-content">
          <Router>
           <div className="App">
            <Routes>
                  <Route exact path='/' element={< BodyContent />}></Route>
                  <Route exact path='/view-student/:user_id' element={<ViewStudentDetails />}></Route>
            </Routes>
          </div>
          </Router>
        </div>
        <div className="footer">
          <Footer/>
        </div>
      </div>
    </div>
  );
}

export default App;
