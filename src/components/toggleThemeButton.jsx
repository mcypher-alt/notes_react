export default function ThemeToggle({ darkMode, setDarkMode }) {
    return (
        <button
        onClick={() => setDarkMode(!darkMode)}
        className="relative mr-5 ml-auto px-6 py-2 rounded-full text-white font-medium
        cursor-pointer overflow-hidden bg-gray-800 dark:bg-linear-to-br
        from-[#667eea] to-[#764ba2] transition-all duration-200 hover:scale-105"
        >
            <span>{darkMode ? '☀️' : '🌙'}</span>
        </button>
        );
};