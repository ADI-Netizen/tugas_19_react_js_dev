import React from 'react';
import './css/bootstrap.min.css';
import Navigasi from './component/Navigasi';
import Konten from './component/Konten'

function App() {
  const [modalShow, setModalShow] = React.useState(false)
  return (
    <>
      <Navigasi />
      <Konten modalShow={modalShow} setModalShow={setModalShow} />
    </>
  );
}

export default App;
