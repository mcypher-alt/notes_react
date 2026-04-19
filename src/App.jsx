import { useEffect, useState } from 'react'

export default function ToDoApp() {
  const [noteList, setNoteList] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [noteId, setNoteId] = useState(null);

  const renderList = () => {
    if (noteList.length !== 0) {
      return noteList.map((note) => (
        <div key={note.id}>
          <button onClick={() => setNoteId(noteId === note.id ? null : note.id)}>
            {note.title}
          </button>
          {noteId === note.id && <p>{note.description}</p>}
        </div>
      ));
    }
    return <p>Задач в списке нет. Добавьте первую!</p>;
  };

  const handleAdd = () => {
    if (form.title.trim() === '') return;

    const newTask = {
      id: Date.now(),
      title: form.title,
      description: form.description
    };
    const updatedList = [...noteList, newTask];
    setNoteList(updatedList);
    localStorage.setItem('notes', JSON.stringify(updatedList));
    setForm({ title: '', description: '' });
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
          type="text"
          placeholder="Введите название"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          value={form.description}
          type="text"
          placeholder="Введите текст заметки"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button onClick={handleAdd}>Добавить</button>
      </div>
      <div>{renderList()}</div>
    </div>
  );
}