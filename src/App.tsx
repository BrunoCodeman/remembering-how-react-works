import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PostsList from './components/PostsList';
import MainHeader from './components/MainHeader';

function App() {
  const [count, setCount] = useState(0);
  const [modalIsVisible, setModalVisibility] = useState(false);
  const changeModalVisibility = () => setModalVisibility(!modalIsVisible);
  return (
    <div className="App">
      <MainHeader onCreatePost={changeModalVisibility}/>
      <main>
        <PostsList isPosting={modalIsVisible} onStopPosting={changeModalVisibility} />
      </main>
    </div>
  )
}

export default App
