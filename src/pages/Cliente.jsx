import React, { useState } from "react"
import { db } from "../firebase/firebase"
import { collection, addDoc, Timestamp } from "firebase/firestore"

export default function Cliente() {
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [data, setData] = useState("")
  const [horario, setHorario] = useState("")
  const [mensagem, setMensagem] = useState("")

  const handleAgendar = async () => {
    if (!nome.trim() || !telefone.trim() || !data || !horario) {
      setMensagem("⚠️ Preencha todos os campos.")
      return
    }

    try {
      await addDoc(collection(db, "agendamentos"), {
        nome,
        telefone,
        data,
        horario,
        criadoEm: Timestamp.now()
      })
      setMensagem("✅ Agendamento realizado com sucesso!")
      setNome("")
      setTelefone("")
      setData("")
      setHorario("")
    } catch (erro) {
      console.error("Erro:", erro)
      setMensagem("❌ Erro ao salvar agendamento.")
    }
  }

  return (
    <div className="container">
      <h1>Agendamento</h1>
      <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
      <input type="tel" placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />
      <input type="date" value={data} onChange={e => setData(e.target.value)} />
      <input type="time" value={horario} onChange={e => setHorario(e.target.value)} />
      <button onClick={handleAgendar}>Agendar</button>
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  )
}
