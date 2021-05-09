import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';


export default function (params) {
    let history = useHistory();

    return [
        () => { 
            history.push("/about") 
        },
        () => {
            history.push("/about")
        },
        () => { 
            history.push("/about") 
        },
        () => {
            history.push("/about")
        },
      ]
}