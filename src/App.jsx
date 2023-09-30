import  Product  from './pages/Product'; 
import  Pricing  from './pages/Pricing';
import  {BrowserRouter, Route, Navigate, Routes}  from 'react-router-dom';
import  HomePage  from './pages/HomePage';
import  PageNotFound  from './pages/PageNotFound';
import  {AppLayout}  from './pages/AppLayout';
import {Login} from './pages/Login';
import { Signup } from './pages/Signup';
import { CityList } from './components/CityList';
import { CountryList } from './components/CountryList';
import City from './components/City'
import  Form from './components/Form';
import { CityProvider } from './components/context/citiesProvider';
import { GoogleAuthContextProvider } from './components/context/googleAuthProvider';
import { ProtectedRoute } from './components/ProtectedRoute';

export const App =()=>{

  return(    
    <GoogleAuthContextProvider>
    <CityProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<HomePage/>}/>
          <Route path='pricing' element={<Pricing/>}/>
          <Route path="product" element={<Product/>}/>
          <Route path='*' element={<PageNotFound/>}/>

          
            <Route path='/app' element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
              <Route index element = {<Navigate replace to="cities"/>}/>
              <Route path='cities' element={<CityList/>}/>
              <Route path='cities/:id' element ={<City/>}/>
              <Route path='cities/form/' element ={<Form/>}/>
              <Route path='countries' element={<CountryList />}/>
              <Route path='form' element={<Form/>}/>
            </Route>
          

          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </CityProvider>  
    </GoogleAuthContextProvider>
    
  )
}