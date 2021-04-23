import { toast } from "react-toastify";
import { ToastSuccess } from "../components/ui/ToastSuccess";
import { types } from "../types/types";

export const startLoadWarnings = () => {

    return async (dispatch) => {

        // fecth warnings

        dispatch(loadWarnings(mockWarnings));

    }
}

const loadWarnings = (warnings) => ({
    type: types.warningLoadWarnings,
    payload: warnings
});

export const startDeleteWarning = (id) => {

    return async (dispatch) => {

        // TODO: delete id from DB



        dispatch(deleteWarning(id));
        setTimeout(() => {
            toast.success(<ToastSuccess text="Aviso eliminado con éxito" />);
        }, 600);
    }

}

const deleteWarning = (id) => ({
    type: types.warningRemoveWarning,
    payload: id
});

export const startAddWarning = (warning) => {

    return async (dispatch) => {

        // TODO: save warning to DB
        const newWarning = {
            id: new Date().getTime(),
            description: warning.description
        }
        dispatch(addWarning(newWarning));

        setTimeout(() => {
            toast.success(<ToastSuccess text="Aviso agregado con éxito" />);
        }, 600);
    }

}

const addWarning = (warning) => ({
    type: types.warningAddWarning,
    payload: warning
});

const mockWarnings = [

    {
        id: '12313123',
        description: 'F1 H3 parará 17/03/2020 17:50 5 horas'
    },
    {
        id: '12315123a',
        description: 'F2 P3 paro 19/04/2020 18:50-20:45'
    },
    {
        id: '12321323c',
        description: 'Pedir electrodos'
    }, {
        id: '12313123v',
        description: 'F1 H3 parará 17/03/2020 17:50 5 horas'
    },
    {
        id: '12315123b',
        description: 'F2 P3 paro 19/04/2020 18:50-20:45'
    },
    {
        id: '12321323n',
        description: 'Pedir electrodos'
    }, {
        id: '12313123m',
        description: 'F1 H3 parará 17/03/2020 17:50 5 horas'
    },
    {
        id: '123151233v',
        description: 'F2 P3 paro 19/04/2020 18:50-20:45'
    },
    {
        id: '12321323v',
        description: 'Pedir electrodos'
    }, {
        id: '12313123a',
        description: 'F1 H3 parará 17/03/2020 17:50 5 horas'
    },
    {
        id: '12315123v',
        description: 'F2 P3 paro 19/04/2020 18:50-20:45'
    },
    {
        id: '12321323sa',
        description: 'Pedir electrodos'
    }, {
        id: '12313123vc',
        description: 'F1 H3 parará 17/03/2020 17:50 5 horas'
    },
    {
        id: '12315123as',
        description: 'F2 P3 paro 19/04/2020 18:50-20:45'
    },
    {
        id: '12321323csdfgvsd',
        description: 'Pedir electrodos'
    }, {
        id: '12313123s',
        description: 'F1 H3 parará 17/03/2020 17:50 5 horas'
    },
    {
        id: '12315123vsd',
        description: 'F2 P3 paro 19/04/2020 18:50-20:45'
    },
    {
        id: '12321323abf',
        description: 'Pedir electrodos'
    }, {
        id: '12313123vdas',
        description: 'F1 H3 parará 17/03/2020 17:50 5 horas'
    },
    {
        id: '12315123s',
        description: 'F2 P3 paro 19/04/2020 18:50-20:45'
    },
    {
        id: '12321323vvsd',
        description: 'Pedir electrodos'
    }, {
        id: '12313123avdasv',
        description: 'F1 H3 parará 17/03/2020 17:50 5 horas'
    },
    {
        id: '12315123vnrty',
        description: 'F2 P3 paro 19/04/2020 18:50-20:45'
    },
    {
        id: '12321323sdqwqwe',
        description: 'Pedir electrodos'
    }, {
        id: '12313123gfwergb',
        description: 'F1 H3 parará 17/03/2020 17:50 5 horas'
    },
    {
        id: '12315123scdv',
        description: 'F2 P3 paro 19/04/2020 18:50-20:45'
    },
    {
        id: '12321323vsdv',
        description: 'Pedir electrodos'
    }, {
        id: '12313123brgfb',
        description: 'F1 H3 parará 17/03/2020 17:50 5 horas'
    },
    {
        id: '12315123qwdq',
        description: 'F2 P3 paro 19/04/2020 18:50-20:45'
    },
    {
        id: '12321323svddv',
        description: 'Pedir electrodos'
    },
]