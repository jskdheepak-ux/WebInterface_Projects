import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentInput, setCurrentInput] = useState("0");
  const [previousInput, setPreviousInput] = useState(null);
  const [operation, setOperation] = useState(null);
  const [overwrite, setOverwrite] = useState(false);
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);

  // Statistics
  const totalCalculations = history.length;
  const lastResult = history.length > 0 ? history[0].result : "0";

  // Handle number click
  const handleNumber = (digit) => {
    if (currentInput === "Error") {
      setCurrentInput(digit);
      setOverwrite(false);
      return;
    }

    if (overwrite) {
      setCurrentInput(digit);
      setOverwrite(false);
      return;
    }

    if (currentInput === "0") {
      setCurrentInput(digit);
    } else {
      if (currentInput.length < 16) {
        setCurrentInput(currentInput + digit);
      }
    }
  };

  // Handle decimal dot
  const handleDecimal = () => {
    if (currentInput === "Error" || overwrite) {
      setCurrentInput("0.");
      setOverwrite(false);
      return;
    }
    if (!currentInput.includes(".")) {
      setCurrentInput(currentInput + ".");
    }
  };

  // Handle operations (+, -, *, /)
  const handleOperator = (op) => {
    if (currentInput === "Error") return;

    if (previousInput !== null && operation && !overwrite) {
      // Calculate intermediate result
      const result = calculate(previousInput, currentInput, operation);
      if (result === "Error") {
        setCurrentInput("Error");
        setPreviousInput(null);
        setOperation(null);
        setOverwrite(true);
        return;
      }
      setPreviousInput(result);
      setCurrentInput(String(result));
    } else {
      setPreviousInput(currentInput);
    }

    setOperation(op);
    setOverwrite(true);
  };

  // Calculation core
  const calculate = (a, b, op) => {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    if (isNaN(num1) || isNaN(num2)) return "0";

    let result = 0;
    switch (op) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "×":
      case "*":
        result = num1 * num2;
        break;
      case "÷":
      case "/":
        if (num2 === 0) return "Error";
        result = num1 / num2;
        break;
      default:
        return String(num2);
    }

    // Fix precision floating point issues (e.g. 0.1 + 0.2 = 0.30000000000000004)
    return parseFloat(result.toFixed(10)).toString();
  };

  // Handle Equals (=)
  const handleEquals = () => {
    if (!operation || previousInput === null || currentInput === "Error") return;

    const expressionStr = `${previousInput} ${operation} ${currentInput}`;
    const result = calculate(previousInput, currentInput, operation);

    if (result === "Error") {
      setCurrentInput("Error");
      setPreviousInput(null);
      setOperation(null);
      setOverwrite(true);
      return;
    }

    // Add to history
    const newEntry = {
      id: Date.now(),
      expression: expressionStr,
      result: result,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    };

    setHistory((prev) => [newEntry, ...prev.slice(0, 19)]);
    setCurrentInput(result);
    setPreviousInput(null);
    setOperation(null);
    setOverwrite(true);
  };

  // Clear All (AC)
  const handleAllClear = () => {
    setCurrentInput("0");
    setPreviousInput(null);
    setOperation(null);
    setOverwrite(false);
  };

  // Backspace / Delete last digit
  const handleDelete = () => {
    if (currentInput === "Error" || overwrite) {
      setCurrentInput("0");
      setOverwrite(false);
      return;
    }

    if (currentInput.length > 1) {
      setCurrentInput(currentInput.slice(0, -1));
    } else {
      setCurrentInput("0");
    }
  };

  // Toggle Positive / Negative sign (±)
  const handleToggleSign = () => {
    if (currentInput === "0" || currentInput === "Error") return;
    if (currentInput.startsWith("-")) {
      setCurrentInput(currentInput.substring(1));
    } else {
      setCurrentInput("-" + currentInput);
    }
  };

  // Percentage (%)
  const handlePercentage = () => {
    if (currentInput === "Error") return;
    const value = parseFloat(currentInput);
    if (!isNaN(value)) {
      const result = parseFloat((value / 100).toFixed(10)).toString();
      setCurrentInput(result);
      setOverwrite(true);
    }
  };

  // Scientific / Quick helpers: Square (x²), Square Root (√x), Reciprocal (1/x)
  const handleQuickMath = (type) => {
    if (currentInput === "Error") return;
    const val = parseFloat(currentInput);
    if (isNaN(val)) return;

    let res = 0;
    let label = "";

    if (type === "sq") {
      res = Math.pow(val, 2);
      label = `sqr(${val})`;
    } else if (type === "sqrt") {
      if (val < 0) {
        setCurrentInput("Error");
        return;
      }
      res = Math.sqrt(val);
      label = `√(${val})`;
    } else if (type === "inv") {
      if (val === 0) {
        setCurrentInput("Error");
        return;
      }
      res = 1 / val;
      label = `1/(${val})`;
    }

    const formatted = parseFloat(res.toFixed(10)).toString();
    setHistory((prev) => [
      {
        id: Date.now(),
        expression: label,
        result: formatted,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      },
      ...prev.slice(0, 19)
    ]);

    setCurrentInput(formatted);
    setOverwrite(true);
  };

  // Copy result to clipboard
  const handleCopy = () => {
    if (currentInput === "Error") return;
    navigator.clipboard.writeText(currentInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Restore result from history
  const handleHistorySelect = (val) => {
    setCurrentInput(val);
    setOverwrite(true);
  };

  // Clear calculation history
  const clearHistory = () => {
    setHistory([]);
  };

  // Physical Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= "0" && e.key <= "9") {
        handleNumber(e.key);
      } else if (e.key === ".") {
        handleDecimal();
      } else if (e.key === "+") {
        handleOperator("+");
      } else if (e.key === "-") {
        handleOperator("-");
      } else if (e.key === "*") {
        handleOperator("×");
      } else if (e.key === "/") {
        e.preventDefault();
        handleOperator("÷");
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        handleEquals();
      } else if (e.key === "Backspace") {
        handleDelete();
      } else if (e.key === "Escape") {
        handleAllClear();
      } else if (e.key === "%") {
        handlePercentage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="app">
      {/* Header */}
      <header>
        <h1>🎓 College Smart Calculator</h1>
        <p>Interactive lab calculator with memory & history</p>
      </header>

      {/* Summary Cards */}
      <div className="summary">
        <div className="summary-card total">
          <h3>Calculations Done</h3>
          <p>{totalCalculations}</p>
        </div>
        <div className="summary-card present-card">
          <h3>Last Result</h3>
          <p>{lastResult.length > 7 ? `${lastResult.slice(0, 6)}…` : lastResult}</p>
        </div>
        <div className="summary-card active-op-card">
          <h3>Active Operator</h3>
          <p>{operation ? operation : "Ready"}</p>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="calculator-workspace">
        {/* Calculator Device Card */}
        <div className="calculator-card">
          <div className="calculator-top-bar">
            <span className="college-badge">ENG LAB EDITION</span>
            <button className="copy-btn" onClick={handleCopy} title="Copy to clipboard">
              {copied ? "✓ Copied" : "📋 Copy"}
            </button>
          </div>

          {/* Screen */}
          <div className="display-screen">
            <div className="expression-line">
              {previousInput !== null && operation ? `${previousInput} ${operation}` : "\u00A0"}
            </div>
            <div className={`main-line ${currentInput.length > 10 ? "text-shrink" : ""}`}>
              {currentInput}
            </div>
          </div>

          {/* Quick Scientific Helpers */}
          <div className="quick-helpers">
            <button onClick={() => handleQuickMath("sq")} title="Square">x²</button>
            <button onClick={() => handleQuickMath("sqrt")} title="Square Root">√x</button>
            <button onClick={() => handleQuickMath("inv")} title="Reciprocal">1/x</button>
            <button onClick={handlePercentage} title="Percentage">%</button>
          </div>

          {/* Main Keypad Grid */}
          <div className="keypad">
            <button className="btn-function" onClick={handleAllClear}>AC</button>
            <button className="btn-function" onClick={handleDelete}>⌫</button>
            <button className="btn-function" onClick={handleToggleSign}>±</button>
            <button
              className={`btn-operator ${operation === "÷" ? "op-selected" : ""}`}
              onClick={() => handleOperator("÷")}
            >
              ÷
            </button>

            <button className="btn-number" onClick={() => handleNumber("7")}>7</button>
            <button className="btn-number" onClick={() => handleNumber("8")}>8</button>
            <button className="btn-number" onClick={() => handleNumber("9")}>9</button>
            <button
              className={`btn-operator ${operation === "×" ? "op-selected" : ""}`}
              onClick={() => handleOperator("×")}
            >
              ×
            </button>

            <button className="btn-number" onClick={() => handleNumber("4")}>4</button>
            <button className="btn-number" onClick={() => handleNumber("5")}>5</button>
            <button className="btn-number" onClick={() => handleNumber("6")}>6</button>
            <button
              className={`btn-operator ${operation === "-" ? "op-selected" : ""}`}
              onClick={() => handleOperator("-")}
            >
              −
            </button>

            <button className="btn-number" onClick={() => handleNumber("1")}>1</button>
            <button className="btn-number" onClick={() => handleNumber("2")}>2</button>
            <button className="btn-number" onClick={() => handleNumber("3")}>3</button>
            <button
              className={`btn-operator ${operation === "+" ? "op-selected" : ""}`}
              onClick={() => handleOperator("+")}
            >
              +
            </button>

            <button className="btn-number btn-zero" onClick={() => handleNumber("0")}>0</button>
            <button className="btn-number" onClick={handleDecimal}>.</button>
            <button className="btn-equals" onClick={handleEquals}>=</button>
          </div>
        </div>

        {/* History Panel */}
        <div className="history-panel">
          <div className="history-header">
            <h3>📜 Calculation History</h3>
            {history.length > 0 && (
              <button className="reset-btn" onClick={clearHistory}>
                ↻ Clear
              </button>
            )}
          </div>

          <div className="history-list">
            {history.length === 0 ? (
              <div className="history-empty">
                <span className="empty-icon">💡</span>
                <p>No calculations yet.</p>
                <small>Perform an operation to view history log</small>
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className="history-item"
                  onClick={() => handleHistorySelect(item.result)}
                  title="Click to load into display"
                >
                  <div className="history-top">
                    <span className="history-expr">{item.expression}</span>
                    <span className="history-time">{item.time}</span>
                  </div>
                  <div className="history-result">= {item.result}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
