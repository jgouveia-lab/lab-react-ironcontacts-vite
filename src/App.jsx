import { useState } from "react";
import "./App.css";
import allContacts from "./contacts.json";

function App() {
  const [contacts, setContacts] = useState(allContacts.slice(0, 5));

  const addRandomContact = () => {
    const shownIds = contacts.map((contact) => contact.id);
    const remaining = allContacts.filter(
      (contact) => !shownIds.includes(contact.id)
    );
    if (remaining.length === 0) return;

    const randomContact =
      remaining[Math.floor(Math.random() * remaining.length)];
    setContacts([...contacts, randomContact]);
  };

  const sortByName = () => {
    const sorted = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
    setContacts(sorted);
  };

  const sortByPopularity = () => {
    const sorted = [...contacts].sort((a, b) => b.popularity - a.popularity);
    setContacts(sorted);
  };

  const deleteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>

      <div className="toolbar">
        <button onClick={addRandomContact}>Add Random Contact</button>
        <button onClick={sortByPopularity}>Sort by Popularity</button>
        <button onClick={sortByName}>Sort by Name</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img src={contact.pictureUrl} alt={contact.name} />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar && "🏆"}</td>
              <td>{contact.wonEmmy && "🌟"}</td>
              <td>
                <button
                  className="btn-delete"
                  onClick={() => deleteContact(contact.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
