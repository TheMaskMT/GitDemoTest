import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const TestAddInput = () => {
  const [inputs, setInputs] = useState([]);

  const addInputField = () => {
    setInputs([...inputs, '']); // Thêm một phần tử mới vào mảng
  };

  const handleInputChange = (text, index) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = text;
    setInputs(updatedInputs);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {inputs.map((input, index) => (
        <TextInput
          key={index}
          style={styles.input}
          value={input}
          onChangeText={(text) => handleInputChange(text, index)}
          placeholder={`Input ${index + 1}`}
        />
      ))}
      <Button title="Thêm trường nhập liệu" onPress={addInputField} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default TestAddInput;
