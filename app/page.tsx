'use client'

import { useRouter } from 'next/navigation';
import './home.css'
import { useEffect } from 'react';
import { checkLogin } from '@/utils/login';


export default function Home() {
  const router = useRouter()
  useEffect(() => checkLogin(router, '/'), [router])
  return (
    <main className="home-content">
      <section className="home-card">
        <div className="instructor-section">
          <img
            src="/images/human.png"
          />
        </div>

        <div className="course-section">
          <h1>
            <strong>
              CSI205 Front-End Software
            </strong>
          </h1>
          <h2>
            <strong>เป้าหมายสายงานที่ต้องการ</strong>
          </h2>
          <ul>
            <li>
              <strong>Software Development</strong>{" "}
              Full-Stack Developer ทำได้ทั้ง Frontend และ Backend
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

