import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const generateRandomNumbers = () => {
  const numbers = [];
  for (let i = 0; i < 4; i++) {
    numbers.push(Math.floor(Math.random() * 99) + 1);
  }
  return numbers;
};

const App = () => {
  const [numbers, setNumbers] = useState([]);
  const [targetValue, setTargetValue] = useState(0);
  const [expression, setExpression] = useState('');
  const [usedNumbers, setUsedNumbers] = useState([]);
  const [times, setTimes] = useState(3);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const newNumbers = generateRandomNumbers();
    setNumbers(newNumbers);
    setTargetValue(Math.floor(Math.random() * 999) + 1);
    setExpression('');
    setUsedNumbers([]);
    setTimes(3);
  };

  const handleNumberPress = (number) => {
    if (!usedNumbers.includes(number)) {
      setExpression((prev) => prev + number);
      setUsedNumbers((prev) => [...prev, number]);
    }
  };

  const handleOperatorPress = (operator) => {
    setExpression((prev) => prev + operator);
  };

  const evaluateExpression = () => {
    try {
      const result = eval(expression);
      if (result === targetValue) {
        Alert.alert('Congratulations', 'You won the game!', [{ text: 'New Game', onPress: resetGame }]);
      } else {
        setTimes((prev) => prev - 1);
        if (times - 1 === 0) {
          Alert.alert('Game Over', 'You have no more attempts!', [{ text: 'Retry', onPress: resetGame }]);
        } else {
          Alert.alert('Try Again', 'Your expression is incorrect.', [{ text: 'Retry' }]);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Invalid expression!', [{ text: 'Retry' }]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EXPRESSION BUILDING</Text>
        <Text style={styles.instructions}>
          In this game, you will create an expression that gives the target value.
        </Text>
      </View>
      <View style={styles.values}>
        <View style={styles.valueBox}>
          <Text style={styles.valueLabel}>YOUR VALUE</Text>
          <Text style={styles.value}>{eval(expression) || 0}</Text>
        </View>
        <View style={styles.valueBox}>
          <Text style={styles.valueLabel}>TARGET VALUE</Text>
          <Text style={styles.value}>{targetValue}</Text>
        </View>
        <View style={styles.valueBox}>
          <Text style={styles.valueLabel}>TIMES</Text>
          <Text style={styles.value}>{times}</Text>
        </View>
      </View>
      <View style={styles.expressionBox}>
        <Text style={styles.expression}>{expression}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        {numbers.map((num) => (
          <TouchableOpacity
            key={num}
            style={usedNumbers.includes(num) ? styles.buttonDisabled : styles.button}
            onPress={() => handleNumberPress(num)}
            disabled={usedNumbers.includes(num)}
          >
            <Text style={styles.buttonText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonsContainer}>
        {['+', '-', '*', '/'].map((operator) => (
          <TouchableOpacity
            key={operator}
            style={styles.button}
            onPress={() => handleOperatorPress(operator)}
          >
            <Text style={styles.buttonText}>{operator}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.controlButtons}>
        <TouchableOpacity style={styles.controlButton} onPress={resetGame}>
          <Text style={styles.controlButtonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={evaluateExpression}>
          <Text style={styles.controlButtonText}>Check</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
  },
  values: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  valueBox: {
    alignItems: 'center',
  },
  valueLabel: {
    color: '#fff',
  },
  value: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  expressionBox: {
    backgroundColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  expression: {
    fontSize: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  controlButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default App;
