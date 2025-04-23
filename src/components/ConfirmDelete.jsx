import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Typography,
} from "@mui/material";

function ConfirmDelete({ open, onClose, onConfirm, userName }) {

    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmar a exclusão</DialogTitle>
            <DialogContent>
                <Typography>Deseja mesmo excluir o usuário:</Typography>
                <p>{userName} ?</p>
                <DialogActions>
                    <Button onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={onConfirm}>
                        Excluir
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
export default ConfirmDelete;
