import AlertComponent from "./components/alert-component.js";
import AnimalFormComponent from "./components/animal-form-component.js";
import AnimalsTableComponent from "./components/animals-table-component.js";
import ContainerComponent from "./components/container-component.js";
import FlexContainerComponent from "./components/flex-container-component.js";
import ApiService from "./services/api-service.js";

let animalTableComponent;
let animalFormComponent;
let alertComponent;

let animals;
let editedRowId = null;

const handleCarDelete = async (id) => {
  try {
    await ApiService.deleteAnimals(id);
    animals = await ApiService.getAnimals();
    animalTableComponent.renderAnimals(animals, editedRowId);
  } catch (error) {
    alertComponent.show(error.message);
  }
}

const handleCarCreate = async (carProps) => {
  try {
    await ApiService.createAnimals(carProps);
    animals = await ApiService.getAnimals();
    animalTableComponent.renderAnimals(animals, editedRowId);
  } catch (error) {
    alertComponent.show(error.message);
  }
}

const handleCarUpdate = async (carProps) => {
  try {
    await ApiService.updateAnimals(editedRowId, carProps);
    animals = await ApiService.getAnimals();
    editedRowId = null;
    animalFormComponent.disableEditing();
    animalTableComponent.renderAnimals(animals, editedRowId);
  } catch (error) {
    alertComponent.show(error.message);
  }
}

const handleCarEdit = (carProps) => {
  if (editedRowId === carProps.id) editedRowId = null;
  else editedRowId = carProps.id;

  animalTableComponent.renderAnimals(animals, editedRowId);
  if (editedRowId === null) {
    animalFormComponent.disableEditing();
    animalFormComponent.onSubmit = handleCarCreate;
  } else {
    animalFormComponent.enableEditing(carProps);
    animalFormComponent.onSubmit = handleCarUpdate;
  }
}

(async function initialize() {
  const rootHtmlElement = document.querySelector('#root');
  const containerComponent = new ContainerComponent();
  alertComponent = new AlertComponent();
  containerComponent.addComponents(alertComponent);
  rootHtmlElement.append(containerComponent.htmlElement);
  try {
    animals = await ApiService.getAnimals();
    animalTableComponent = new AnimalsTableComponent({
      animals,
      onDelete: handleCarDelete,
      onEdit: handleCarEdit,
    });
    animalFormComponent = new AnimalFormComponent({
      onSubmit: handleCarCreate,
    });
    const flexContainerComponent = new FlexContainerComponent();
    flexContainerComponent.addComponents(animalTableComponent, animalFormComponent);
    containerComponent.addComponents(flexContainerComponent);
  } catch (error) {
    alertComponent.show(error.message);
  }
})();
