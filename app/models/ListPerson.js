export default class ListPerson {
  list_person = [];

  addPerson = function(person){
    this.list_person.push(person);
  }
  getPerson = function() {
    return this.list_person;
  }
  deletePerson = function(index) {
    this.list_person.splice(index, 1);
  }
  updatePerson(updatedPerson, index) {
    this.list_person[index] = updatedPerson;
  }
}