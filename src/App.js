import './App.css'
import Routes from './routes'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <Router>
                <Routes />
            </Router>
        </div>
    )
}

export default App
