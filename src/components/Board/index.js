import React, {useState } from 'react';
import produce from 'immer';
import { Container } from "./styles";

import BoradContext from  './context';
import { loadLists } from '../../Services/api';
import List from '../List';

const data = loadLists();

export default function Board() {
    const [lists, setLists ] = useState(data);

    function move(fromList, toList, from, to){
        setLists(produce(
            lists, draft => {
                const dragged = draft[fromList].cards[from];

                draft[fromList].cards.splice(from, 1);
                draft[toList].cards.splice(to, 0, dragged)
            }
        ))
    }

    return (
        <BoradContext.Provider value={{lists, move}}>
            <Container>
                {lists.map( (list ,index) => ( 
                    <List key={list.title} index={index} data={list} /> 
                ))}
            </Container>
        </BoradContext.Provider>
    )
}
