export default function AddButton({ onClick}) {
    return (
        <button
            className='bg-linear-to-br from-[#667eea] to-[#764ba2]
            text-white border-none py-3 px-6 rounded-[50px] text-[1rem]
            font-bold cursor-pointer transition-all duration-200 hover:scale-105
            hover:shadow-lg active:scale-95 mb-4'
            onClick={onClick}>Добавить заметку</button>
    )
};