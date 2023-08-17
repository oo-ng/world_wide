import  Product  from './pages/Product'; 
import  Pricing  from './pages/Pricing';
import  {BrowserRouter, Route, Routes}  from 'react-router-dom';
import  HomePage  from './pages/HomePage';
import  PageNotFound  from './pages/PageNotFound';
import  {AppLayout}  from './pages/AppLayout';
import Login from './pages/Login';
import { CityList } from './components/CityList';
import { CountryList } from './components/CountryList';


export const App =()=>{

  return(      
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<HomePage/>}/>
        <Route path='pricing' element={<Pricing/>}/>
        <Route path="product" element={<Product/>}/>
        <Route path='*' element={<PageNotFound/>}/>

        <Route path='/app' element={<AppLayout/>}>
          <Route index element = {<CityList/>}/>
          <Route path='cities' element={<CityList/>}/>
          <Route path='countries' element={<CountryList />}/>
          <Route path='form' element={<p>Form</p>}/>
        </Route>

        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}