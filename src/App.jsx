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
    if (notes.length === 0) {
      return <p>Задач в списке нет. Добавьте первую!</p>;
    }
    return notes.map((note) => (
      <div key={note.id} className="mb-3">
        <div className="relative">
          <button
            onClick={() => setNoteId(noteId === note.id ? null : note.id)}
            className="shadow-lg w-full text-left p-4 pr-16 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
          >
            <span className="font-medium text-gray-800">{note.title}</span>
          </button>
          <button
            onClick={() => confirm("Действительно желаете удалить?") && handleDelete(note.id)}
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
          >
            Удалить
          </button>
        </div>
        {noteId === note.id && (
          <p className="p-4 pt-2 text-gray-600">
            {note.description}
          </p>)}
      </div>
      ));
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
    <div className='flex flex-col grow'>
      <h1 className='text-center text-white mt-2'>Заметки</h1>
      <div className='grow bg-white rounded-xl shadow-lg p-6 border border-gray-200'>
        <div>
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Назад" : "Добавить заметку"}
          </button>
          {showForm && handleShow()}
        </div>
        <div className='mt-5 mb-5'>
          <input className='rounded-xl border-2 border-purple-500'
          value={searchValue}
          type='text'
          placeholder='Введите название заметки...'
          onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{renderList(filteredNotes)}</div>
      </div>
      <footer className="h-25 text-white flex items-center justify-center">Подвал</footer>
    </div>
  );
}