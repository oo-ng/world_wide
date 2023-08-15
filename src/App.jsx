import  Product  from './pages/Product'; 
import  Pricing  from './pages/Pricing';
import  {BrowserRouter, Route, Routes}  from 'react-router-dom';
import  HomePage  from './pages/HomePage';
import  PageNotFound  from './pages/PageNotFound';
import  {AppLayout}  from './pages/AppLayout';


export const App =()=>{

  return(
    <div>
      Hello
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='pricing' element={<Pricing/>}/>
          <Route path="product" element={<Product/>}/>
          <Route path='*' element={<PageNotFound/>}/>
          <Route path='/AppLayout' element={<AppLayout/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}