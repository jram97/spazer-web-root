import Axios from 'httpConfig';
import { useState, useEffect } from 'react'

export const useGet = (rute) => {

    const [state, setState] = useState({
        loading: true,
        data: [],
        error: null,
    });

    useEffect(() => {

        const token = localStorage.getItem('spazer_token');

        const headers = {
            "Content-Type": "application/json",
            "access-token": token
        }

        setState({ ...state, loading: true })

        Axios.get(rute, { headers })
            .then(({ data }) => setState({ loading: false, error: null, data }))
            .catch(error => setState({ loading: false, error, data: [] }))

    }, [rute])

    return [state.loading, state.data, state.error];
}
