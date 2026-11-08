'use client'

import { useEffect, useState } from 'react'
import Animetion from '../../components/animetion'
import './animetion.css'
import { useRouter } from 'next/navigation'
import { checkLogin } from '@/utils/login'

export default function Page() {
    const router = useRouter()
    useEffect(() => checkLogin(router, '/animetion'), [router])
  const [keyEvent, setKeyEvent] = useState<KeyboardEvent | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') e.preventDefault() // กันหน้าเลื่อนลงเวลากด Space
      setKeyEvent(e)
    }
    window.addEventListener('keydown', handleKeyDown)
    
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return <Animetion keyEvent={keyEvent} />
}
