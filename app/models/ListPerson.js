export default class ListPerson {
  list_person = [];

  addPerson(person) {
    this.list_person.push(person);
  }
  getPersons() {
    return this.list_person;
  }
}