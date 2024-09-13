import React, { useState } from 'react';

// React Component to manage and modify an array
const ArrayManager = () => {
    // Initialize state with an empty array
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    // Handle input change for adding/editing
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Add a new item to the array
    const handleAddItem = () => {
        if (inputValue.trim()) {
            setItems([...items, inputValue]); // Add new item to array
            setInputValue(''); // Clear input after adding
        }
    };

    // Edit an existing item in the array
    const handleEditItem = (index) => {
        setInputValue(items[index]); // Set current item value in input
        setEditIndex(index); // Store index of the item being edited
    };

    // Save the edited item in the array
    const handleSaveEdit = () => {
        const updatedItems = [...items];
        updatedItems[editIndex] = inputValue; // Update the value at the specified index
        setItems(updatedItems);
        setInputValue(''); // Clear input after saving
        setEditIndex(null); // Reset the edit index
    };

    // Delete an item from the array
    const handleDeleteItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index); // Filter out the item by index
        setItems(updatedItems);
    };

    return (
        <div>
            <h2>Array Manager</h2>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter item"
                />
                {editIndex !== null ? (
                    <button onClick={handleSaveEdit}>Save Edit</button>
                ) : (
                    <button onClick={handleAddItem}>Add Item</button>
                )}
            </div>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item}{' '}
                        <button onClick={() => handleEditItem(index)}>Edit</button>{' '}
                        <button onClick={() => handleDeleteItem(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArrayManager;
