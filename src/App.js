import React, { useState, useEffect } from "react";

import "./styles.css";
import api from '../src/services/api'

function App() {
  const [state, setState] = useState({data: [], isLoading: false})

  async function handleAddRepository() {
    fetchData();
  }

  async function handleRemoveRepository(id) {
    const newData = state.data.filter(item => item.id !== id)    
    setState(prevState => ({...prevState, data: newData}))
    await api.delete(`/repositories/${id}`)
  }

  async function fetchData() {
    //fetch data
    setState(prevState => ({...prevState, isLoading: true}))
    api.get('/repositories').then(result => setState({data: result.data, isLoading: false}))         
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {/* {console.log(state)} */}
        {
          state.data.map(item => {
            return (
              <li key={item.id}>
                {item.title}
                <button onClick={() => handleRemoveRepository(item.id)}>
                  Remover 
                </button>
              </li>              
            );
          })
        }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
