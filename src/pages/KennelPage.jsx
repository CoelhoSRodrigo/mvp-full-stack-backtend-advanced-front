import { useEffect, useState } from "react";
import "./KennelPage.css";

function KennelPage() {
  const [doghouses, setDoghouses] = useState([]);

  useEffect (() => {
    const fetchKennels = async () => {
      try {
        const response = await fetch("http://localhost:5000/doghouses");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDoghouses(data.doghouseList);
      } catch (error) {
        console.error("Error fetching kennels:", error);
      }
    }

    fetchKennels();
  }, []);

  const handleDeleteKennel = async (kennelId) => {
    try {
      const response = await fetch(`http://localhost:5000/doghouse?id=${kennelId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedDoghouses = doghouses.filter((dogHouse) => dogHouse.id !== kennelId);
      setDoghouses(updatedDoghouses);
    } catch (error) {
      console.error('Error deleting kennel:', error);
    }
  };


 return (
    <div>
      <h1>Welcome to the Kennel Page</h1>
      {doghouses.map((dogHouse, index) => (
        <div key={index} className="dog-house">
          <div>
            <p>ID: {dogHouse.id}</p>
            <p>Data de Criação: {dogHouse.data_criacao}</p>
            <p>Dogs:</p>
            <button onClick={() => handleDeleteKennel(dogHouse.id)}>Delete Kennel</button>
          </div>
          {dogHouse.dogs.map((dog, dogIndex) => (
            <div key={dogIndex} className="dog-card">
              <img
                src={dog.image}
                alt={dog.name}
                className="dog-image"
              />
              <p>{dog.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default KennelPage;