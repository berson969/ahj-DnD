export default class Task {
  constructor(element) {
    this.element = element;


  }

  openModal(text="") {
    const overlay = document.querySelector('.overlay');
  }

  closeModal() {

  };
  addTask() {
    const column = this.element.parentElement;
    const newTask = document.createElement('li');
    const modal = document.createElement('input');
    newTask.className = 'item';
    modal.className = 'item';
  };

  editTsk() {

  };

  deleteTask() {

  };

};
