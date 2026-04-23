export const getFilteredNotes = (notes, searchValue) => {
    return notes.filter(note =>
    note.title.toLowerCase().includes(searchValue.toLowerCase())
    );
};

export const getSortedNotes = (notes, sortBy) => {
    if (sortBy === "date") {
        return [...notes].sort((a, b) => b.id - a.id);
    }
    return notes;
};