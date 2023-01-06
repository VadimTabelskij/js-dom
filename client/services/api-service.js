const serverAddress = 'http://localhost:3000';

const getAnimals = async () => {
  const response = await fetch(`${serverAddress}/animals`);
  const animals = await response.json();

  return animals;
}

const deleteAnimals = async (id) => {
  const response = await fetch(`${serverAddress}/animals/${id}`, {
    method: 'DELETE'
  });
  const cars = await response.json();

  return cars;
}

const createAnimals = async (carProps) => {
  const response = await fetch(`${serverAddress}/animals`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(carProps)
  });
  const cars = await response.json();

  return cars;
}

const updateAnimals = async (id, carProps) => {
  const response = await fetch(`${serverAddress}/animals/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(carProps)
  });
  const animals = await response.json();

  return animals;
}

const ApiService = {
  getAnimals,
  deleteAnimals,
  createAnimals,
  updateAnimals,
};

export default ApiService;
