import React, { useEffect, useState } from "react"
import { db } from "../firebase/firebase"
import { collection, getDocs } from "firebase/firestore"

export default function Painel() {
  const [agendamentos, setAgendamentos] = useState([])

  useEffect(() => {
    const carregar = async () => {
      const snap = await getDocs(collection(db, "agendamentos"))
      const lista = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setAgendamentos(lista)
    }
    carregar()
  }, [])

  return (
    <div className="container">
      <h1>Painel do Profissional</h1>
      {agendamentos.length === 0 && <p>Nenhum agendamento encontrado.</p>}
      <ul>
        {agendamentos.map(a => (
          <li key={a.id}>
            <strong>{a.nome}</strong> — {a.telefone} — {a.data} às {a.horario}
          </li>
        ))}
      </ul>
    </div>
  )
}
