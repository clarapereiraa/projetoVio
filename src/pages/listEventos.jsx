import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { Button, IconButton, Alert, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../axios/axios";  // Certifique-se de que esse caminho esteja correto
import { useNavigate } from "react-router-dom";
import ModalCriarIngresso from "../components/ModalCriarIngresso";

function ListEventos() {
  const [eventos, setEventos] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const navigate = useNavigate();

  // Função para exibir o alerta
  const showAlert = (severity, message) => {
    setAlert({ open: true, severity, message });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  // Função para obter eventos
  async function getEventos() {
    try {
      const response = await api.getEventos();
      if (response && response.data && response.data.eventos) {
        setEventos(response.data.eventos);  // Atualiza os eventos
      } else {
        showAlert("warning", "Nenhum evento encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar eventos", error);
      showAlert("error", "Erro ao buscar eventos");
    }
  }

  // Função para excluir um evento
  async function deleteEventos(id) {
    try {
      await api.deleteEventos(id);
      await getEventos();  // Recarrega os eventos após a exclusão
      showAlert("success", "Evento excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar evento", error);
      showAlert("error", "Erro ao deletar evento");
    }
  }

  useEffect(() => {
    getEventos();  // Chama a função para buscar os eventos assim que o componente for montado
  }, []);

  const [eventoSelecionado, setEventoSelecionado] = useState("");
const [modalOpen, setModalOpen] = useState(false);

const abrirModalIngresso = (evento) => {
  setEventoSelecionado(evento);
  setModalOpen(true);
};

const fecharModalIngresso = () => {
  setModalOpen(false);
  setEventoSelecionado("");
};

  return (
    <div>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>

      <ModalCriarIngresso
      open={modalOpen}
      onClose={fecharModalIngresso}
      eventoSelecionado={eventoSelecionado}/>

      {eventos.length === 0 ? (
        <h1>Carregando eventos...</h1>  // Mensagem enquanto os dados estão sendo carregados
      ) : (
        <div>
          <h5>Lista de Eventos</h5>
          <TableContainer component={Paper} style={{ margin: "2px" }}>
            <Table size="small">
              <TableHead style={{ backgroundColor: "brown" }}>
                <TableRow>
                  <TableCell align="center">Nome</TableCell> {/* Nome do Evento */}
                  <TableCell align="center">Descrição</TableCell>
                  <TableCell align="center">Data e Hora</TableCell>
                  <TableCell align="center">Ações</TableCell>
                  <TableCell align="center" sx={{color: "#fff"}}>Criar ingresso</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {eventos.map((evento) => (
                  <TableRow key={evento.id_evento}>
                    <TableCell align="center">{evento.nome}</TableCell> {/* Nome do Evento */}
                    <TableCell align="center">{evento.descricao}</TableCell>
                    <TableCell align="center">{evento.data_hora}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => deleteEventos(evento.id_evento)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                    <IconButton onClick={() => abrirModalIngresso(evento)}>
                    Adicionar 
                    </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      <Button fullWidth variant="contained" onClick={() => navigate("/users")}>
        Voltar para lista de usuários
      </Button>
    </div>
  );
}

export default ListEventos;
