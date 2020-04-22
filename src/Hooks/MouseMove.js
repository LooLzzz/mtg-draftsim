import { useState } from 'react'

export default function useMouseMove()
{
    var [state, setState] = useState({mouseX: 0, mouseY: 0})
    function handleMouseMove(e)
    {
        e.persist()
        setState(state => ({...state, x: e.clientX, y: e.clientY}))
    }

    return {
        mouseX: state.x,
        mouseY: state.y,
        handleMouseMove,
    }
}