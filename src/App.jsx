import { useEffect, useState } from 'react'

export default function ToDoApp() {
  const [noteList, setNoteList] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [noteId, setNoteId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] =  useState('');
  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [isMenuOpen, setMenuOpen] = useState(false);

  const getSortedNotes = (notes) => {
  if (sortBy === "date") {
    return [...notes].sort((a, b) => b.id - a.id);
  }
  return notes;
  }

  const filteredNotes = (noteList) => {
    return noteList.filter(note =>
    note.title.toLowerCase().includes(searchValue));
  }

  const filtered = filteredNotes(noteList);
  const sorted = getSortedNotes(filtered);

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
          {!showForm && (
            <button
            className='bg-linear-to-br from-[#667eea] to-[#764ba2] text-white border-none py-3 px-6 rounded-[50px] text-[1rem] font-bold cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 mb-4'
            onClick={() => setShowForm(true)}
            >
            Добавить заметку
            </button>
          )}
          {showForm && (
            <div className='flex flex-col gap-2'>
              <input
                  className='p-2 border rounded'
                  value={form.title}
                  type="text"
                  placeholder="Введите название"
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <input
                  className='p-2 border rounded'
                  value={form.description}
                  type="text"
                  placeholder="Введите текст заметки"
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
                <div className='flex'>
                  {showForm && (
                    <button
                    onClick={() => setShowForm(false)}
                    className='w-18 text-xs p-2 border rounded-xl text-white bg-red-600  hover:bg-red-700'
                    >
                      Назад
                    </button>
                  )}
                  <button
                  onClick={handleAdd}
                  className='w-18 text-xs p-2 border rounded-xl text-white bg-green-600 hover:bg-green-700'
                  >
                    Добавить
                  </button>
                </div>
                {error && <p className="text-red-500">{error}</p>}
            </div>
          )}
        </div>

        <div className='relative mt-5 mb-5 flex justify-between items-center'>
          <input
            className='rounded-xl border-2 border-purple-500 mr-4'
            value={searchValue}
            type='text'
            placeholder='Введите название заметки...'
            onChange={(e) => setSearchValue(e.target.value)}
          />
          
          <div className='relative'>
            <button
              className='bg-linear-to-br from-[#667eea] to-[#764ba2] text-white py-2 px-4 rounded-full whitespace-nowrap'
              onClick={() => setMenuOpen(!isMenuOpen)}
            >
              Отсортировать
            </button>
            
            {isMenuOpen && (
              <div className='absolute right-0 top-full w-48 bg-white rounded-lg shadow-lg border z-10'>
                <div className='py-2'>
                  <p className='px-4 py-2 text-sm font-semibold text-gray-500 border-b'>
                    Сортировка
                  </p>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setSortBy('default');
                    }}
                    className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    📅 По умолчанию
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setSortBy('date');
                    }}
                    className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    🔄 По дате
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
        className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {renderList(sorted)}
        </div>
      </div>
      <footer className="h-25 text-white flex items-center justify-center">Подвал</footer>
    </div>
  );
}