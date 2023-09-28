import { useEffect, useState } from "react";
import "./breedGrid.css"

function BreedGrid() {
  const [breeds, setBreeds] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [selectedBreeds, setSelectedBreeds] = useState([]);


  useEffect(() => {
    async function fetchBreedsAndImages() {
      try {
        const response = await fetch("https://api.thedogapi.com/v1/breeds?limit=10&api_key=live_DY5eyxtdwUrxhFVlyza1cF08vvrgG7dWl9VlWbSS1MIPGbdM9L4PgOrqs9u5rxLh");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const mappedBreeds = data.map((breed) => ({
          name: breed.name,
          image: breed.reference_image_id
            ? `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg?api_key=live_DY5eyxtdwUrxhFVlyza1cF08vvrgG7dWl9VlWbSS1MIPGbdM9L4PgOrqs9u5rxLh`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGJgB5xhH65b5h1Du2pBNY2Ih468oA4-obaG0U6dAbWQmJQxoRGToG_Ci5uEVwDwKVuRI&usqp=CAU",
        }));
        setBreeds(mappedBreeds);
      } catch (error) {
          console.error("Error fetching breeds:", error);
      }
      setLoadingImages(false);
    }

    fetchBreedsAndImages();
  }, [breeds]);

  const handleCheckboxChange = (breedName, breedImage) => {
    setSelectedBreeds((prevSelectedBreeds) => {
      const isBreedSelected = prevSelectedBreeds.some(
        (selectedBreed) => selectedBreed.name === breedName
      );

      if (isBreedSelected) {
        return prevSelectedBreeds.filter((selectedBreed) => selectedBreed.name !== breedName);
      } else {
        return [...prevSelectedBreeds, { name: breedName, image: breedImage }];
      }
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      dogs: selectedBreeds,
    };

    await fetch("http://localhost:5000/doghouse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(dataToSend),
    })
    .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
    .then((data) => {
        console.log("Response from server:", data);
        handleClearAll();
      })
    .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  const handleClearAll = () => {
    setSelectedBreeds([]);
  };

  return (
      <>
      {loadingImages && <p>Loading images...</p>}
      {!loadingImages && (
        <form onSubmit={handleFormSubmit}>

          <div className="action-buttons">
            <button type="button" onClick={handleClearAll}>
              Clear All Selections
            </button>
            <button type="submit">Register Kennel</button>
          </div>

          <div className="breed-grid">
            {breeds.map((breed) => (
              <div key={breed.name} className="breed-card">
                <h2>{breed.name}</h2>
                <label>
                  <input
                    type="checkbox"
                    name="selectedBreeds"
                    value={breed.name}
                    checked={selectedBreeds.some((selectedBreed) => selectedBreed.name === breed.name)}
                    onChange={() => handleCheckboxChange(breed.name, breed.image)}
                  />
                  Select
                  <img
                    src={breed.image}
                    alt={breed.name}
                    className="breed-image"
                  />
                </label>
              </div>
            ))}
          </div>

        </form>
      )}
    </>
  );

}
export default BreedGrid;
