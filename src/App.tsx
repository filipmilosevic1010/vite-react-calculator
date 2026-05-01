import { useState } from 'react'
import './App.css'

type Operation = '+' | '-' | '×' | '÷'

function App() {
  const [numA, setNumA] = useState<string>('')
  const [numB, setNumB] = useState<string>('')
  const [result, setResult] = useState<number | string | null>(null)
  const [lastExpr, setLastExpr] = useState<string>('')

  const calculate = (op: Operation) => {
    const a = parseFloat(numA)
    const b = parseFloat(numB)

    if (isNaN(a) || isNaN(b)) {
      setResult('Unesite oba broja')
      setLastExpr('')
      return
    }

    if (op === '÷' && b === 0) {
      setResult('Dijeljenje s nulom')
      setLastExpr('')
      return
    }

    let res: number
    switch (op) {
      case '+': res = a + b; break
      case '-': res = a - b; break
      case '×': res = a * b; break
      case '÷': res = a / b; break
    }

    setLastExpr(`${a} ${op} ${b}`)
    setResult(parseFloat(res.toFixed(10)))
  }

  const clear = () => {
    setNumA('')
    setNumB('')
    setResult(null)
    setLastExpr('')
  }

  return (
    <div className="calculator">
      <h1>Kalkulator</h1>

      <div className="inputs">
        <input
          type="number"
          value={numA}
          onChange={(e) => setNumA(e.target.value)}
          placeholder="Broj A"
        />
        <input
          type="number"
          value={numB}
          onChange={(e) => setNumB(e.target.value)}
          placeholder="Broj B"
        />
      </div>

      <div className="operations">
        <button onClick={() => calculate('+')}>+</button>
        <button onClick={() => calculate('-')}>−</button>
        <button onClick={() => calculate('×')}>×</button>
        <button onClick={() => calculate('÷')}>÷</button>
      </div>

      <div className={`result ${result !== null ? 'visible' : ''}`}>
        {result !== null && (
          <>
            <span className="expr">{lastExpr} =</span>
            <span className="value">{typeof result === 'number' ? result : result}</span>
          </>
        )}
      </div>

      <button className="clear-btn" onClick={clear}>Obriši</button>
    </div>
  )
}

export default App
