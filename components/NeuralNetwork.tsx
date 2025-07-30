'use client'

import { useEffect, useRef, useState } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  id: number
  connections: number[]
}

interface Pulse {
  from: number
  to: number
  progress: number
  id: number
}

interface NeuralNetworkProps {
  isHovered?: boolean
}

export function NeuralNetwork({ isHovered = false }: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const nodesRef = useRef<Node[]>([])
  const pulsesRef = useRef<Pulse[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Initialize nodes
    const nodeCount = window.innerWidth < 768 ? 50 : 150
    const nodes: Node[] = []
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        id: i,
        connections: []
      })
    }

    // Create connections based on proximity
    const maxDistance = window.innerWidth < 768 ? 100 : 150
    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + 
            Math.pow(node.y - otherNode.y, 2)
          )
          if (distance < maxDistance && node.connections.length < 3) {
            node.connections.push(j)
          }
        }
      })
    })

    nodesRef.current = nodes

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Update node positions
      nodesRef.current.forEach(node => {
        node.x += node.vx * (isHovered ? 1.5 : 1)
        node.y += node.vy * (isHovered ? 1.5 : 1)

        // Bounce off edges
        if (node.x <= 0 || node.x >= dimensions.width) node.vx *= -1
        if (node.y <= 0 || node.y >= dimensions.height) node.vy *= -1

        // Keep nodes in bounds
        node.x = Math.max(0, Math.min(dimensions.width, node.x))
        node.y = Math.max(0, Math.min(dimensions.height, node.y))
      })

      // Draw connections
      ctx.strokeStyle = isHovered ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.15)'
      ctx.lineWidth = 1

      nodesRef.current.forEach(node => {
        node.connections.forEach(connectionId => {
          const connectedNode = nodesRef.current[connectionId]
          if (connectedNode) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(connectedNode.x, connectedNode.y)
            ctx.stroke()
          }
        })
      })

      // Update and draw pulses
      pulsesRef.current = pulsesRef.current.filter(pulse => {
        pulse.progress += isHovered ? 0.03 : 0.02
        
        if (pulse.progress >= 1) return false

        const fromNode = nodesRef.current[pulse.from]
        const toNode = nodesRef.current[pulse.to]
        
        if (fromNode && toNode) {
          const x = fromNode.x + (toNode.x - fromNode.x) * pulse.progress
          const y = fromNode.y + (toNode.y - fromNode.y) * pulse.progress

          // Draw pulse
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8)
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
          gradient.addColorStop(0.5, 'rgba(147, 197, 253, 0.6)')
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)')

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(x, y, 8, 0, Math.PI * 2)
          ctx.fill()
        }

        return true
      })

      // Create new pulses randomly
      if (Math.random() < (isHovered ? 0.08 : 0.03)) {
        const randomNode = nodesRef.current[Math.floor(Math.random() * nodesRef.current.length)]
        if (randomNode.connections.length > 0) {
          const targetId = randomNode.connections[Math.floor(Math.random() * randomNode.connections.length)]
          pulsesRef.current.push({
            from: randomNode.id,
            to: targetId,
            progress: 0,
            id: Date.now()
          })
        }
      }

      // Draw nodes
      nodesRef.current.forEach(node => {
        // Node glow
        const nodeGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 6)
        nodeGradient.addColorStop(0, isHovered ? 'rgba(147, 197, 253, 0.8)' : 'rgba(147, 197, 253, 0.5)')
        nodeGradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
        
        ctx.fillStyle = nodeGradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, 6, 0, Math.PI * 2)
        ctx.fill()

        // Node center
        ctx.fillStyle = isHovered ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.7)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions, isHovered])

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}