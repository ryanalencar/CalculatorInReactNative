import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default function App() {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState('');

  const { container, displayStyle, buttons, resultStyle, col1, col2, line, btn, btnText } = styles

  const col1Buttons = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    [',', '0', '='],
  ]

  const col2Buttons = ['C', '÷', 'x', '-', '+']

  function handleOp(op) {
    if (op === 'C') {
      setDisplay('')
      setResult('')
    } else if (op === '=') {
      setDisplay(result)
      setResult('')
    } else {
      const displayOp = display + op
      let resultOp = result
      try {
        let fixedOp = displayOp.split('x').join('*')
        fixedOp = fixedOp.split('÷').join('/')
        fixedOp = fixedOp.split(',').join('.')
        resultOp = new String(eval(fixedOp)).toString()
      } catch (e) {

      }
      setDisplay(displayOp)
      setResult(resultOp)
    }

  }

  return (
    <View style={container}>
      <Text style={displayStyle}>{display}</Text>
      <Text style={resultStyle}>{result}</Text>
      <View style={buttons}>
        <View style={col1}>
          {col1Buttons.map((row, index) =>
            <View key={index} style={line}>
              {row.map(op =>
                <TouchableOpacity key={op} style={btn} onPress={() => handleOp(op)} >
                  <Text style={btnText}>{op}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        <View style={col2}>
          {col2Buttons.map(op =>
            <TouchableOpacity key={op} style={btn} onPress={() => handleOp(op)}>
              <Text style={btnText}>{op}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFF3',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  displayStyle: {
    flex: 1,
    fontSize: 60,
    textAlign: 'right',
    paddingTop: 20,
    paddingRight: 10
  },
  resultStyle: {
    flex: 0.4,
    maxHeight: 100,
    fontSize: 32,
    textAlign: 'right',
    paddingRight: 10,
    paddingBottom: 10,
  },
  buttons: {
    flex: 5,
    flexDirection: 'row',
    marginTop: 20,
  },
  col1: {
    flex: 3,
    backgroundColor: '#1A1A1A',
  },
  col2: {
    flex: 1,
    backgroundColor: '#0e0e0e',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
  },
  btnText: {
    textAlign: 'center',
    fontSize: 40,
    color: '#fffff3',
  }
});
