'use client'

import { useRef, useState, useEffect } from 'react'

type AnimetionProps = {
  fieldwidth?: number
  fieldheight?: number
  ballradius?: number
  velocity?: number
  keyEvent?: KeyboardEvent | null
}

const Animetion = ({ fieldwidth, fieldheight, ballradius, velocity, keyEvent }: AnimetionProps) => {
  const _fieldwidth = fieldwidth || 640
  const _fieldheight = fieldheight || 480
  const _ballradius = ballradius || 50
  const _velocity = velocity || 200 // pixel/second
  const _keyEvent = keyEvent || null

  // internal calculation
  const frameRate = 120 // frames/second
  const frameTime = 1 / frameRate // second
  const ballDiameter = 2 * _ballradius
  const xMax = _fieldwidth - ballDiameter - 4 // -4 เพราะขอบสนามหนา 2px ซ้ายขวา
  const yMax = _fieldheight - ballDiameter - 4
  const xVelocity = _velocity / Math.sqrt(2)
  const yVelocity = _velocity / Math.sqrt(2)

  // state
  const [balltype, setballtype] = useState('none')
  const [running, setRunning] = useState(false)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [moveRight, setMoveRight] = useState(true)
  const [moveDown, setMoveDown] = useState(true)

  const timer = useRef<number | null>(null)

  // กดปุ่มบนคีย์บอร์ด (page ส่งมาให้ทาง keyEvent)
  useEffect(() => {
    if (_keyEvent !== null) {
      if (_keyEvent.key === ' ') setRunning(!running)
      else if (_keyEvent.key === '0') setballtype('none')
      else if (_keyEvent.key === '1') setballtype('basketball')
      else if (_keyEvent.key === '2') setballtype('football')
      else if (_keyEvent.key === '3') setballtype('volley')
      else if (_keyEvent.key === '4') setballtype('human')
    }
  }, [_keyEvent])

  // ตั้งเวลาคำนวณเฟรมถัดไป
  useEffect(() => {
    if (running) {
      if (timer.current === null) {
        timer.current = window.setTimeout(() => {
          calculateNextFrame()
        }, frameTime * 1000)
      }
    }
    return () => {
      if (timer.current !== null) {
        clearTimeout(timer.current)
        timer.current = null
      }
    }
  })

  const calculateNextFrame = () => {
    // x axis
    let xNew
    if (moveRight) { // ->
      xNew = x + xVelocity / frameRate // px/frame
      if (xNew >= xMax) {
        xNew = xMax - (xNew - xMax)
        setMoveRight(false) // <-
      }
    } else { // <-
      xNew = x - xVelocity / frameRate
      if (xNew <= 0) {
        xNew = -xNew
        setMoveRight(true) // ->
      }
    }
    setX(xNew)

    // y axis
    let yNew
    if (moveDown) { // ลงล่าง
      yNew = y + yVelocity / frameRate
      if (yNew >= yMax) {
        yNew = yMax - (yNew - yMax)
        setMoveDown(false) // up
      }
    } else { // ขึ้นบน
      yNew = y - yVelocity / frameRate
      if (yNew <= 0) {
        yNew = -yNew
        setMoveDown(true) // down
      }
    }
    setY(yNew)
  }

  // เลือกรูปลูกบอลตาม balltype
  let ballImage = 'none'
  if (balltype === 'basketball') {
    ballImage = 'url(/animation/bask.png)'
  } else if (balltype === 'football') {
    ballImage = 'url(/animation/football.png)'
  } else if (balltype === 'volley') {
    ballImage = 'url(/animation/valley.png)'
  } else if (balltype === 'human') {
    ballImage = 'url(/animation/human.png)'
  }

  // view
  return (
    <>
      {/* animation */}
      <div className="mt-3 mx-auto border w-fit">
        {/* field */}
        <div
          className="relative border-2 border-black"
          style={{
            width: `${_fieldwidth}px`,
            height: `${_fieldheight}px`,
            backgroundImage: 'url(/animetion/images.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* ball */}
          <div
            className={`absolute rounded-full border border-black spinning ${running ? '' : 'paused'}`}
            style={{
              left: `${x}px`, // x
              top: `${y}px`, // y
              width: `${ballDiameter}px`,
              height: `${ballDiameter}px`,
              backgroundColor: 'lightcyan',
              backgroundImage: ballImage,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          ></div>
        </div>

        {/* button row */}
        <div className="mt-1 flex justify-between">
          {/* run/pause */}
          <button
            className={`px-4 py-2 rounded font-bold text-white ${running ? 'bg-red-600' : 'bg-green-600'}`}
            onClick={() => setRunning(!running)}
          >
            {running ? 'PAUSE' : 'RUN'}
          </button>

          <div>
            <div className="flex justify-end gap-1">
              {/* NONE */}
              <button
                className="px-3 py-2 rounded border border-gray-500 text-gray-600"
                onClick={() => setballtype('none')}
              >
                NONE
              </button>

              {/* Basketball */}
              <button
                className="px-3 py-2 rounded border border-blue-600 text-blue-600"
                onClick={() => setballtype('basketball')}
              >
                Basketball
              </button>

              {/* Football */}
              <button
                className="px-3 py-2 rounded border border-blue-600 text-blue-600"
                onClick={() => setballtype('football')}
              >
                Football
              </button>

              {/* Volleyball */}
              <button
                className="px-3 py-2 rounded border border-blue-600 text-blue-600"
                onClick={() => setballtype('volley')}
              >
                Volleyball
              </button>

              {/* Human */}
              <button
                className="px-3 py-2 rounded border border-blue-600 text-blue-600"
                onClick={() => setballtype('human')}
              >
                Human
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Animetion
