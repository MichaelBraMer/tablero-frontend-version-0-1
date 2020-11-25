
export const RECIVE_GAME = 'RECIVE_GAME';
export const SUCCESS_GAME = 'SUCCESS_GAME';
export const ERROR_GAME = 'ERROR_GAME';
export const CLOSE_ERROR = 'CLOSE_ERROR';
export const REFRESH_GAME = 'REFRESH_GAME';

const reciveGame = () => {
    return {
        type: RECIVE_GAME,
    };
};

const successGame = (data: any) => {
    return {
        type: SUCCESS_GAME,
        data
    };
};

const refreshGame = (data: any) => {
    return {
        type: REFRESH_GAME,
        data
    };
};

const errorGame = (texto: any) => {
    return {
        type: ERROR_GAME,
        text: texto
    };
};

const closeError = () => {
    return {
        type: CLOSE_ERROR,
    }
}

export const createGame = (anfitrion: String, socket: any) => async (dispatch: any) => {
    try {
        if (anfitrion.length < 4) {
            dispatch(errorGame("El nombre debe ser mas largo."))
            return;
        }
        dispatch(reciveGame());
        socket.emit("crearJuego", anfitrion, function (resp: any) {
            if (resp) {
                dispatch(successGame(resp));
            } else {
                dispatch(errorGame("No se encontro la sala."));
            }
        });
    } catch (err) {
        dispatch(errorGame("No se pudo crear la partida."));
    }
};

export const joinJuego = (invitado: String, codigo: String, socket: any) => async (dispatch: any) => {
    try {
        if (invitado.length < 4) {
            dispatch(errorGame("El nombre debe ser mas largo."))
            return;
        }
        if (codigo.length !== 4) {
            dispatch(errorGame("El codigo debe ser de 4 digitos."))
            return;
        }
        dispatch(reciveGame());
        socket.emit("unirseJuego", { nombre: invitado, codigo }, function (resp: any) {
            if (resp) {
                dispatch(successGame(resp));
            } else {
                dispatch(errorGame("No se encontro la sala."));
            }
        });
    } catch (err) {
        dispatch(errorGame("No se pudo unir la partida."));
    }
}

export const enviarMsj = (codigo: String, nombre: String, mensaje: String, socket: any) => async (dispatch: any) => {
    try {
        if (codigo.length !== 4) {
            dispatch(errorGame("El codigo debe ser de 4 digitos."))
            return;
        }
        if (nombre.length < 4) {
            dispatch(errorGame("El nombre debe ser mas largo."))
            return;
        }
        if (mensaje.length < 1) {
            dispatch(errorGame("El codigo es necesario."))
            return;
        }
        dispatch(reciveGame());
        socket.emit("enviarMensaje", { codigo, nombre, mensaje }, function (resp: any) {
            if (resp) {
                dispatch(refreshGame(resp));
            } else {
                dispatch(errorGame("No se encontro la sala."));
            }
        });
    } catch (err) {
        dispatch(errorGame("No se pudo enviar el mensaje."));
    }
}

export const nextGame = (codigo: String, socket: any) => async (dispatch: any) => {
    try {
        if(codigo.length !== 4){
            dispatch(errorGame("El codigo debe ser de 4 digitos."))
            return;
        }
        dispatch(reciveGame());
        socket.emit("siguienteJuego", codigo, function(resp: any){
            if (resp) {
                console.log(resp);
                dispatch(refreshGame(resp));
            } else {
                dispatch(errorGame("No se encontro la sala."));
            }
        });
    } catch (err) {
        dispatch(errorGame("No se puede continuar con el juego."));
    }
}

export const refrescarJuego = (juego: any) => async (dispatch: any) => {

    dispatch(refreshGame(juego));

}

export const closeAlert = () => async (dispatch: any) => {
    dispatch(closeError());
}