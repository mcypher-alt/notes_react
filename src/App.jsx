import { useEffect, useState } from 'react'
import { getFilteredNotes, getSortedNotes } from './utils/sortAndFilter';
import NoteItem from './components/newItem';
import AddButton from './components/addButton';
import AddNoteForm from './components/addNoteForm';
import ThemeToggle from './components/toggleThemeButton';

export default function ToDoApp() {
  const [noteList, setNoteList] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [noteId, setNoteId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] =  useState('');
  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [isMenuOpen, setMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
    });

  const filtered = getFilteredNotes(noteList, searchValue);
  const sorted = getSortedNotes(filtered, sortBy);

  useEffect(() => {
      const saved = localStorage.getItem('notes');
      if (saved) {
        setNoteList(JSON.parse(saved));
      }
      if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
  }
    }, [darkMode]);

  const renderList = (notes) => {
    if (notes.length === 0) {
      return <p>Задач в списке нет. Добавьте первую!</p>;
    }
    return notes.map((note) => (
      <NoteItem
      note={note}
      key={note.id}
      isOpen={noteId === note.id}
      onToggle={() => setNoteId(noteId === note.id ? null : note.id)}
      onDelete={() => confirm('Вы действительно желаете удалить заметку?') && handleDelete(note.id)}
      />
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

  return (
    <div className='flex flex-col grow'>
      <h1 className='text-center text-white dark:text-gray-600 mt-2'>Заметки</h1>
      <div
      className='grow bg-white dark:bg-gray-800 rounded-xl
      shadow-lg dark:shadow-gray-900/50 p-6 border border-gray-200 dark:border-gray-700'>
        <div>
          {!showForm && (<AddButton onClick={() => setShowForm(true)} />)}
          {showForm && (
            <AddNoteForm
            form={form}
            backToggle={() => setShowForm(false)}
            onAdd={handleAdd}
            error={error}
            setForm={setForm}
            />
          )}
        </div>

        <div className='relative mt-5 mb-5 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center'>
          <input
            className='w-full sm:w-64 rounded-xl border-2 border-purple-500 dark:text-gray-300 p-2'
            value={searchValue}
            type='text'
            placeholder='Введите название заметки...'
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className='relative flex items-center justify-between sm:justify-end gap-3'>
            <ThemeToggle
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            />

            <button
              className='bg-linear-to-br
              from-[#667eea] to-[#764ba2] text-white py-2 px-4 rounded-full
              whitespace-nowrap transition-all duration-200 hover:scale-105'
              onClick={() => setMenuOpen(!isMenuOpen)}
            >
              Отсортировать
            </button>
            
            {isMenuOpen && (
              <div className='absolute right-0 top-full w-48 bg-white dark:bg-gray-800
              rounded-lg shadow-lg dark:shadow-gray-900/50 border z-10'>
                <div className='py-2'>
                  <p className='px-4 py-2 text-sm font-semibold text-gray-700
                  dark:text-gray-400 border-b'>
                    Сортировка
                  </p>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setSortBy('default');
                    }}
                    className='w-full text-left px-4 py-2 text-sm
                    text-gray-700 dark:text-gray-400 hover:bg-gray-400'
                  >
                    📅 По умолчанию
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setSortBy('date');
                    }}
                    className='w-full text-left px-4 py-2 text-sm text-gray-700
                    dark:text-gray-400 hover:bg-gray-400'
                  >
                    🔄 По дате(возрастанию)
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