import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Cliente from "./pages/Cliente"
import Painel from "./pages/Painel"
import "./styles/global.css"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/painel" element={<Painel />} />
        <Route path="*" element={<Navigate to="/cliente" />} />
      </Routes>
    </Router>
  )
}
