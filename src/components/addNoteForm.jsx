export default function AddNoteForm({ form, setForm, backToggle, onAdd, error }) {
  return (
    <div className='flex flex-col gap-2'>
      <input
        className='p-2 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600'
        value={form.title}
        type="text"
        maxLength={30}
        placeholder="Введите название(макс. символов 30)"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        className='p-2 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600'
        value={form.description}
        type="text"
        maxLength={120}
        placeholder="Введите текст заметки(макс. символов 120)"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <div className='flex gap-2'>
        <button
          onClick={backToggle}
          className='px-4 py-2 text-xs border rounded-xl text-white bg-red-600 hover:bg-red-700'
        >
          Назад
        </button>
        <button
          onClick={onAdd}
          className='px-4 py-2 text-xs border rounded-xl text-white bg-green-600 hover:bg-green-700'
        >
          Добавить
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}