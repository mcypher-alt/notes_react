import { useEffect, useState } from 'react'

export default function ToDoApp() {
  const [noteList, setNoteList] = useState([]);
  const [form, setForm] = useState({title: '', description: ''});
  const renderList = () => {
    if (noteList.length !== 0) {
      return (
        noteList.map((note) => {
          return (
          <div key={note.id}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
          </div>
          );
      }
        )
          )
            }
    else return <p>Задача в списке нет. Добавьте первую!</p>
  };

  const handleAdd = () => {
    const newTask = {
      id: Date.now(),
      title: form.title,
      description: form.description
    };
    const updatedList = [...noteList, newTask];
    setNoteList(updatedList);
    localStorage.setItem('notes', JSON.stringify(updatedList));
    setForm({title: '', description: ''});
  };

  useEffect(() => {
    const saved = localStorage.getItem('notes');
    if (saved) {
        setNoteList(JSON.parse(saved));
    }
}, []);

  return (
    <div>
      <div>
        <input
        value={form.title}
        type='text'
        placeholder='Введите название'
        onChange={(e) => setForm({...form, title: e.target.value})}
        ></input>
        <input
        value={form.description}
        type='text'
        placeholder='Введите текст заметки'
        onChange={(e) => setForm({...form, description: e.target.value})}
        ></input>
        <button onClick={handleAdd}>Добавить</button>
      </div>
      <div>
        {renderList()}
      </div>
    </div>
  )
};