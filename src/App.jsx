import { useEffect, useState } from 'react'

export default function ToDoApp() {
  const [noteList, setNoteList] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [noteId, setNoteId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] =  useState('');
  const [searchValue, setSearchValue] = useState('');
  const filteredNotes = noteList.filter(note =>
    note.title.toLowerCase().includes(searchValue));

  const renderList = (notes) => {
    if (notes.length !== 0) {
      return notes.map((note) => (
        <div key={note.id}>
          <button onClick={() => setNoteId(noteId === note.id ? null : note.id)}>
            {note.title}
          </button>
          <button onClick={() => confirm("Действительно желаете удалить?") && handleDelete(note.id)}>Удалить</button>
          {noteId === note.id && <p>{note.description}</p>}
        </div>
      ));
    }
    return <p>Задач в списке нет. Добавьте первую!</p>;
  };

  const handleShow = () => {
    return (
      <>
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
          {error && <p className="text-red-500">{error}</p>}
        </>
    )
  };

  const handleDelete = (id) => {
    const filteredList = noteList.filter(note => note.id !== id);
    setNoteList(filteredList);
    localStorage.setItem('notes', JSON.stringify(filteredList));
  };

  const handleAdd = () => {
    if (form.title.trim() === '' || form.description.trim() === '') {
      setError("Поля не могут быть пустыми!");
      return;
    }

    setError('');
    const newTask = {
      id: Date.now(),
      title: form.title,
      description: form.description
    };
    const updatedList = [...noteList, newTask];
    setNoteList(updatedList);
    localStorage.setItem('notes', JSON.stringify(updatedList));
    setForm({ title: '', description: '' });
    setShowForm(false);
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
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Назад" : "Добавить заметку"}
        </button>
        {showForm && handleShow()}
      </div>
      <input
      value={searchValue}
      type='text'
      placeholder='Введите название заметки...'
      onChange={(e) => setSearchValue(e.target.value)}
      />
      <div>{renderList(filteredNotes)}</div>
    </div>
  );
}