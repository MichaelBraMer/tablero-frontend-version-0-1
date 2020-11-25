import {
    RECIVE_GAME,
    SUCCESS_GAME,
    ERROR_GAME,
    CLOSE_ERROR,
    REFRESH_GAME
} from '../actions/login';

export default (
    state = {
        reciveGame: false,
        succesGame: false,
        errorGame: false,
        errorMessage: "",
        juego: {
            jugadores: [{id:'', nombre:'', posicion:0 }],
            codigo: "",
            ronda: 0,
            mensajes: [],
            turno: 0,
            juego: 0
        },
        jugador: {
            id: "",
            nombre: "",
            posicion: 0
        }
    },
    action: any
) => {
    switch (action.type) {
        case RECIVE_GAME:
            return {
                ...state,
                reciveGame: true,
            };
        case SUCCESS_GAME:
            return {
                ...state,
                reciveGame: false,
                succesGame: true,
                jugador: action.data.jugador,
                juego: action.data.juego
            };
        case ERROR_GAME:
            return {
                ...state,
                reciveGame: false,
                errorGame: true,
                errorMessage: action.text,
            };
        case CLOSE_ERROR:
            return {
                ...state,
                reciveGame: false,
                errorGame: false,
                errorMessage: "",
            }
        case REFRESH_GAME:
            return {
                ...state,
                reciveGame: false,
                succesGame: true,
                juego: action.data
            };
        default:
            return state;
    }
};