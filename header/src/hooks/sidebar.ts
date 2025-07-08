"use client"

import { useState } from "react"

export const useSidebar = () => {
    const [show, setShow] = useState(false)

    const toggleSidebar = () => {
        setShow(old => !old)
    }

    const onOpen = () => {
        setShow(true)
    }

    const onClose = () => {
        setShow(false)
    }

    return { show, setShow, toggleSidebar, onOpen, onClose}
}