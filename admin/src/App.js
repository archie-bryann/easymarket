import { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import Main from './components/Main/Main';
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [myClass,setMyClass] = useState('');

  function toggleSidebar() {
    if(!sidebarOpen) {
      setMyClass('sidebar_responsive');
      setSidebarOpen(true);
    }
  }

  function closeSidebar() {
    if(sidebarOpen) {
      setMyClass('');
      setSidebarOpen(false);
    }
  }

  return (
    <div className = "container">
      <NavBar toggleSidebar = {toggleSidebar} />
      <Main /> 
      <Sidebar myClass = {myClass} closeSidebar = {closeSidebar} />
    </div>
  );
}

export default App;