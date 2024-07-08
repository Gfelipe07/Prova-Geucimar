import "./componentes.css";
import axios from 'axios';
import { useState, useEffect } from 'react';


function Pacientes() {

  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState(null);

  function getPacientes() {
    axios.get("http://localhost:5218/pacientes").then((resposta) => {
      setPacientes(resposta.data);
    });
  }

  useEffect(getPacientes, []);

  function excluirPaciente(id) {
    axios.delete("http://localhost:5218/pacientes/" + id)
      .then(() => {
        getPacientes();
      });
  }

  function editarPaciente(paciente) {
    setPaciente(paciente);
  }

  function novoPaciente() {
    setPaciente({
      nome: ""
    });
  }

  function cancelar() {
    setPaciente(null);
  }

  function refresh() {
    cancelar();
    getPacientes();
  }

  function getConteudo() {
    if (paciente == null) {
      return (
        <>
          <button onClick={() => { novoPaciente(); }}> Novo Paciente </button>
          {getTabela()}
        </>
      );
    } else {
      return getFormulario();
    }
  }

  function salvarPaciente() {
    if (paciente.id) {
      axios.put("http://localhost:5218/pacientes/" + paciente.id, paciente).then(() => { refresh(); });
    } else {
      axios.post("http://localhost:5218/pacientes", paciente).then(() => { refresh(); });
    }
  }

  function onChangePaciente(campo, valor, id) {
    paciente[campo] = valor;
    setPaciente({
      ...paciente,
    });
  }

  function getFormulario() {
    return (
      <form action="">
        <label>Nome</label>
        <input type="text" id="nome" name="nome" value={paciente.nome}
          onChange={(e) => { onChangePaciente(e.target.name, e.target.value, paciente.id) }} />

        <button onClick={() => { salvarPaciente(); }}>Salvar</button>
        <button onClick={() => { cancelar(); }}>Cancelar</button>
      </form>
    );
  }

  function getLinha(paciente) {
    return (
      <tr>
        <td>{paciente.id}</td>
        <td>{paciente.nome}</td>
        <td>
          <button onClick={() => { excluirPaciente(paciente.id) }}>Excluir</button>
          <button onClick={() => { editarPaciente(paciente) }}>Editar</button>
        </td>
      </tr>
    );
  }

  function getLinhas() {
    const linhasDaTabela = [];
    for (let i = 0; i < pacientes.length; i++) {
      const paciente = pacientes[i];
      linhasDaTabela[i] = getLinha(paciente);
    }
    return linhasDaTabela;

  }

  function getTabela() {
    return (
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
          {getLinhas()}
        </tbody>
      </table>
    );
  }

  return (
    <>
      <div className="cadastros">
        <div className="conteudo">{getConteudo()}</div>
      </div>
    </>
  );
}

export default Pacientes;