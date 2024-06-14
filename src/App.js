import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'



function App() {
  const API_URL = 'https://666c475449dbc5d7145d6d4b.mockapi.io/plants'

  const [plants, setPlants] = useState([{}])

  const [newPlantName, setNewPlantName] = useState('')
  const [newSpeciesName, setNewSpeciesName] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newSoilType, setNewSoilType] = useState('')

  const [updatedPlantName, setUpdatedPlantName] = useState('')
  const [updatedSpeciesName, setUpdatedSpeciesName] = useState('')
  const [updatedLocation, setUpdatedLocation] = useState('')
  const [updatedSoilType, setUpdatedSoilType] = useState('')

  function getPlants(){
    fetch(API_URL)
    .then(data => data.json())
    .then(data => setPlants(data))
  }
  useEffect(() => {
    getPlants()  
  }, [])

  function deletePlant(id){
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
    .then(() => getPlants())
  }
  
  function updatePlant(plantObject){

    let updatedPlantObject = {
      ...plantObject,
      name: updatedPlantName,
      speciesName: updatedSpeciesName,
      location: updatedLocation,
      soilType: updatedSoilType,
    }

    fetch(`${API_URL}/${plantObject.id}`, {
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(updatedPlantObject)
    })
    .then(() => getPlants())
  }
  
  function postNewPlant(){

    fetch(API_URL, {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        name: newPlantName,
        speciesName: newSpeciesName,
        location: newLocation,
        soilType: newSoilType,
      })
    })
    .then(() => getPlants())
  }

  return (
    <div className="App">

    </div>
  );
}

export default App;
