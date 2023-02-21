import { useEffect, useState } from "react";


export const useFetch = ( url ) => {
  
    const [state, setState] = useState({
        dataR: null,
        isLoading: true,
        hasError: null,
    })


    const getFetch = async () => {

        setState({
            ...state,
            isLoading: true,
        });

        const resp = await fetch(url);
        //console.log('resp:',resp)
        const dataR = await resp.json();
        //console.log('DATA DEL USEFETCH AAAAAAAA', data)
        setState({
            dataR,
            isLoading: false,
            hasError: null,
        });
    }


    useEffect(() => {
        getFetch();
        //console.log('termino el effect')
    }, [url])
    


    return {
        dataR:     state.dataR,
        isLoading: state.isLoading,
        hasError:  state.hasError,
    };
}