import "./componentes.css";
import axios from "axios";
import { useState, useEffect } from "react";

function Medicamentos() {
  //Entidades e listas utilizadas na página
  const [medicamento, setMedicamento] = useState(null);
  const [medicamentos, setMedicamentos] = useState([]);

  //Funções de carregamento de dados do backend
  function getMedicamentos() {
    axios.get("http://localhost:5218/medicamentos").then((resposta) => {
      setMedicamentos(resposta.data);
    });
  }

  useEffect(() => {
    getMedicamentos();
  }, []);

  //Funções para manipulação da entidade principal
  function novoMedicamento() {
    setMedicamento({
      id: 0,
      nome: "",
      paciente: "",
    });
  }

  function editarMedicamento(medicamento) {
    setMedicamento(medicamento);
  }

  function alterarMedicamento(campo, valor, idp) {
    medicamento[campo] = valor;
    setMedicamento({
      ...medicamento,
    });
  }

  function excluirMedicamento(id) {
    axios.delete("http://localhost:5218/medicamentos/" + id).then(() => {
      reiniciarEstadoDosObjetos();
    });
  }

  function salvarMedicamento() {
    if (medicamento.id) {
      axios
        .put(
          "http://localhost:5218/medicamentos/" + medicamento.id,
          medicamento
        )
        .then(() => {
          reiniciarEstadoDosObjetos();
        });
    } else {
      axios.post("http://localhost:5218/medicamentos", medicamento).then(() => {
        reiniciarEstadoDosObjetos();
      });
    }
  }

  function reiniciarEstadoDosObjetos() {
    setMedicamento(null);
    getMedicamentos();
  }

  //Função para geração do formulário
  function getFormulario() {
    return (
      <form>
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={medicamento.nome}
          onChange={(e) => {
            alterarMedicamento(e.target.name, e.target.value, medicamento.id);
          }}
        />
        <label>Paciente</label>
        <input
          type="text"
          name="paciente"
          value={medicamento.paciente}
          onChange={(e) => {
            alterarMedicamento(e.target.name, e.target.value, medicamento.id);
          }}
        />
        <button
          type="button"
          onClick={() => {
            salvarMedicamento();
          }}
        >
          Salvar
        </button>

        <button
          type="button"
          onClick={() => {
            setMedicamento(null);
          }}
        >
          Cancelar
        </button>
      </form>
    );
  }

  //Funções para geração da tabela
  function getLinhaDaTabela(medicamento) {
    return (
      <tr key={medicamento.id}>
        <td>{medicamento.id}</td>
        <td>{medicamento.nome}</td>
        <td>{medicamento.paciente}</td>
        <td>
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "Confirmar a exclusão da sequência " + medicamento.nome + "?"
                )
              ) {
                excluirMedicamento(medicamento.id);
              }
            }}
          >
            Excluir
          </button>
          <button
            type="button"
            onClick={() => {
              editarMedicamento(medicamento);
            }}
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }

  function getLinhasDaTabela() {
    const linhasDaTabela = [];
    for (let i = 0; i < medicamentos.length; i++) {
      const medicamento = medicamentos[i];
      linhasDaTabela[i] = getLinhaDaTabela(medicamento);
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
            <th>Paciente</th>
            <th>Ações</th>
          </tr>
          {getLinhasDaTabela()}
        </tbody>
      </table>
    );
  }

  //Função do conteúdo principal
  function getConteudo() {
    if (medicamento == null) {
      return (
        <>
          <button
            type="button"
            onClick={() => {
              novoMedicamento();
            }}
          >
            Novo medicamento
          </button>
          {getTabela()}
        </>
      );
    } else {
      return getFormulario();
    }
  }

  return (
    <div className="cadastros">
      <div className="conteudo">{getConteudo()}</div>
    </div>
  );
}

export default Medicamentos;
