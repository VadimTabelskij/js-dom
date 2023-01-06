class AnimalFormComponent {
  htmlElement;
  onSubmit;
  titleInput;
  yearInput;
  vaccineInput;
  formNameElement;
  submitButton;

  constructor({ onSubmit }) {
    this.htmlElement = document.createElement('form');
    this.htmlElement.className = 'shadow p-3';
    this.htmlElement.innerHTML = `
      <h2 class="h5 text-center">Create Animal</h2>
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" class="form-control" id="title" name="title">
      </div>
      <div class="mb-3">
        <label for="year" class="form-label">Year</label>
        <input type="number" class="form-control" id="year" name="year">
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="vaccine" name="vaccine">
        <label class="form-check-label" for="vaccine">Is vaccine</label>
      </div>
      <button type="submit" class="btn btn-success w-100">Create Animal</button>`;
    this.onSubmit = onSubmit;
    this.titleInput = this.htmlElement.querySelector('[name=title]');
    this.yearInput = this.htmlElement.querySelector('[name=year]');
    this.vaccineInput = this.htmlElement.querySelector('[name=vaccine]');
    this.formNameElement = this.htmlElement.querySelector('h2');
    this.submitButton = this.htmlElement.querySelector('button');

    this.htmlElement.addEventListener('submit', this.handleSubmit);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const values = {
      title: formData.get('title'),
      year: formData.get('year'),
      vaccine: Boolean(formData.get('vaccine')),
    }

    //   inversion of control
    this.onSubmit(values);
    event.target.reset();
  }

  enableEditing = ({ title, year, vaccine, }) => {
    this.titleInput.value = title;
    this.yearInput.value = year;
    this.vaccineInput.checked = vaccine;
    this.formNameElement.innerText = 'Update Animal';
    this.submitButton.innerText = 'Update Animal';
    this.submitButton.className = 'btn btn-warning w-100';
  }

  disableEditing = () => {
    this.htmlElement.reset();
    this.formNameElement.innerText = 'Create Animal';
    this.submitButton.innerText = 'Update Animal';
    this.submitButton.className = 'btn btn-success w-100';
  }
}

export default AnimalFormComponent;
