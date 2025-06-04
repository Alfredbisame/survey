"use client"

import { useEffect, useRef } from "react"

export function FloatingElements() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create particles
    const particles: Particle[] = []
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 30))

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number
      shape: string

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.size = Math.random() * 15 + 5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = this.getRandomColor()
        this.opacity = Math.random() * 0.5 + 0.1
        this.shape = this.getRandomShape()
      }

      getRandomColor() {
        const colors = ["#8B5CF6", "#EC4899", "#06B6D4", "#6366F1"]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      getRandomShape() {
        const shapes = ["circle", "square", "triangle"]
        return shapes[Math.floor(Math.random() * shapes.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > (canvas?.width ?? 0)) this.x = 0
        else if (this.x < 0) this.x = canvas?.width ?? 0
        if (this.y > (canvas?.height ?? 0)) this.y = 0
        else if (this.y < 0) this.y = canvas?.height ?? 0
      }

      draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color

        if (this.shape === "circle") {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()
        } else if (this.shape === "square") {
          ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)
        } else if (this.shape === "triangle") {
          ctx.beginPath()
          ctx.moveTo(this.x, this.y - this.size / 2)
          ctx.lineTo(this.x - this.size / 2, this.y + this.size / 2)
          ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2)
          ctx.closePath()
          ctx.fill()
        }

        ctx.globalAlpha = 1
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
}
