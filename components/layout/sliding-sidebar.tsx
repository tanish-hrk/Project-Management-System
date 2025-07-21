"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface SlidingSidebarProps {
  direction?: "left" | "right"
  width?: number
  className?: string
  children: React.ReactNode
}

export function SlidingSidebar({
  direction = "left",
  width = 280,
  className,
  children,
  onToggle,
}: SlidingSidebarProps & { onToggle?: (isOpen: boolean) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    onToggle?.(isOpen)
  }, [isOpen, onToggle])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const sidebarStyle = {
    width: `${width}px`,
    transform: isOpen ? "translateX(0)" : direction === "left" ? `translateX(-${width}px)` : `translateX(${width}px)`,
    transition: "transform 0.3s ease-in-out",
  }

  return (
    <div className="relative h-full">
      <div className={`fixed top-0 h-full bg-white border-r shadow-xl z-50 ${className}`} style={sidebarStyle}>
        {children}
      </div>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
        style={{ display: isOpen ? "block" : "none" }}
        onClick={toggleSidebar}
      ></div>
    </div>
  )
}
