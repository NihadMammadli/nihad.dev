import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Phaser from 'phaser'
import styles from './index.module.css'

function Game() {
  const gameRef = useRef<HTMLDivElement>(null)
  const phaserGameRef = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (!gameRef.current || phaserGameRef.current) return

    const cellSize = 50

    class GameScene extends Phaser.Scene {
      private player!: Phaser.GameObjects.Triangle
      private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
      private gridX = 0
      private gridY = 0

      constructor() {
        super('GameScene')
      }

      create() {
        const graphics = this.add.graphics()
        graphics.lineStyle(2, 0x00ff00)
        for (let i = 0; i <= 16; i++) {
          graphics.lineBetween(i * cellSize, 0, i * cellSize, 800)
          graphics.lineBetween(0, i * cellSize, 800, i * cellSize)
        }

        // Create player (isosceles triangle pointing right, centered)
        this.player = this.add.triangle(
          cellSize / 2,
          cellSize / 2,

          // points adjusted so centroid is at (0,0)
          0, -10,     // top
          12, 10,     // bottom right
          -12, 10,    // bottom left

          0xff0000
        )

        // Setup keyboard input
        this.cursors = this.input.keyboard!.createCursorKeys()
      }

      update() {
        let moved = false
        let newRotation = this.player.rotation

        if (Phaser.Input.Keyboard.JustDown(this.cursors.left) && this.gridX > 0) {
          this.gridX--
          newRotation = Math.PI // 180 degrees - pointing left
          moved = true
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right) && this.gridX < 15) {
          this.gridX++
          newRotation = 0 // 0 degrees - pointing right
          moved = true
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.gridY > 0) {
          this.gridY--
          newRotation = -Math.PI / 2 // -90 degrees - pointing up
          moved = true
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down) && this.gridY < 15) {
          this.gridY++
          newRotation = Math.PI / 2 // 90 degrees - pointing down
          moved = true
        }

        if (moved) {
          this.player.rotation = newRotation
        }

        // Update player position
        this.player.x = this.gridX * cellSize + cellSize / 2
        this.player.y = this.gridY * cellSize + cellSize / 2
      }
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 800,
      parent: gameRef.current,
      scene: GameScene,
      backgroundColor: '#2d2d2d'
    }

    phaserGameRef.current = new Phaser.Game(config)

    return () => {
      phaserGameRef.current?.destroy(true)
      phaserGameRef.current = null
    }
  }, [])

  return (
    <div className={styles.container}>
      <p className={styles.instructions}>Use arrow keys to move the red triangle</p>
      <div ref={gameRef} className={styles.gameContainer} />
      <Link to="/" className={styles.backLink}>
        Back to Home
      </Link>
    </div>
  )
}

export default Game
