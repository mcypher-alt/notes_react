export default function NoteItem({ note, isOpen, onToggle, onDelete }) {
    return (
        <div className="mb-3 transition-colors">
            <div className="relative group">
                <button
                    onClick={onToggle}
                    className="shadow-md w-full text-left p-4 pr-24 bg-white
                    dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl
                    hover:border-blue-400 dark:hover:border-blue-500/50 hover:shadow-lg transition-all duration-200"
                >
                    <span className="font-semibold text-gray-800 dark:text-gray-100 w-3/4 wrap-break-word">
                        {note.title}
                    </span>
                </button>
                
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    className="absolute top-1/2 right-3 -translate-y-1/2 bg-red-500/90 dark:bg-red-900/40 text-white
                    dark:text-red-400 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-600 dark:hover:bg-red-900/60
                    border border-transparent dark:border-red-900/50 transition-colors"
                >
                    Удалить
                </button>
            </div>

            {isOpen && (
                <div className="p-4 pt-3 bg-gray-50/50 dark:bg-gray-900/30 rounded-b-xl border-x border-b
                border-gray-100 dark:border-gray-800/50 shadow-inner">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed w-4.5/5 wrap-break-word">
                        {note.description}
                    </p>
                </div>
            )}
        </div>
    );
}