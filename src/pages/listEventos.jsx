import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import api from "../axios/axios"; // Importar a instância do axios
import { Button, IconButton, Alert, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";

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

  // Fechar o alerta
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  async function getEventos() {
    try {
      const response = await api.get("/eventos");
      setEventos(response.data.eventos);
    } catch (error) {
      console.error("Erro ao buscar eventos", error);
      showAlert("error", "Erro ao buscar eventos");
    }
  }

  async function deleteEvento(id) {
    try {
      await api.delete(`/eventos/${id}`);
      await getEventos();
      showAlert("success", "Evento excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar evento", error);
      showAlert("error", error.response.data.error || "Erro desconhecido");
    }
  }

  const listEventos = eventos.map((evento) => (
    <TableRow key={evento.id_evento}>
      <TableCell align="center">{evento.nom}</TableCell>
      <TableCell align="center">{evento.descricao}</TableCell>
      <TableCell align="center">{evento.data_hora}</TableCell>
      <TableCell align="center">{evento.fk_id_organizador}</TableCell>
      <TableCell align="center">
        <IconButton onClick={() => deleteEvento(evento.id_evento)}>
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  ));

  function logout() {
    localStorage.removeItem("authenticated");
    navigate("/");
  }

  useEffect(() => {
    getEventos();
  }, []);

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
      {eventos.length === 0 ? (
        <h1>Carregando eventos...</h1>
      ) : (
        <div>
          <h5>Lista de eventos</h5>
          <TableContainer component={Paper} style={{ margin: "2px" }}>
            <Table size="small">
              <TableHead style={{ backgroundColor: "brown", borderStyle: "solid" }}>
                <TableRow>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Descrição</TableCell>
                  <TableCell align="center">Data e Hora</TableCell>
                  <TableCell align="center">Organizador</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{listEventos}</TableBody>
            </Table>
          </TableContainer>
          <Button fullWidth variant="contained" onClick={logout}>
            SAIR
          </Button>
        </div>
      )}
    </div>
  );
}

export default ListEventos;
