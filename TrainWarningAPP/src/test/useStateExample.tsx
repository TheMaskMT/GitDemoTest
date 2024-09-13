import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import dayjs, { Dayjs } from 'dayjs';

export default function BasicDateTimePicker() {
const [state, setState] = useState({ count: 0, salary: 1000 })
  const handleClick = val => {
  var valIncrement = val == 'count' ? 1 : 500
    setState({
      ...state,
      [val]: state[val] + valIncrement
    })}
  const { count, salary } = state

  return (
    <div>
      Current count {count}.
      Current salary {salary}.
      <div>
        <button onClick={handleClick.bind(null, 'count')}>Increment count!</button>
        <button onClick={handleClick.bind(null, 'salary')}>Increment Salary!</button>
      </div>
    </div>
  )
}
