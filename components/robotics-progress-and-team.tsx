'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Cpu, Wrench, Cog, Camera, Gamepad, Check, X, Volume2, VolumeX, Star } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type TeamMember = {
  id: string
  name: string
  role: string
  imageUrl: string
  favoritePart: string
  quote: string
  rating: number
}

type SectionContentItem = {
  id: string
  issue?: string
  step?: string
  solution?: string
  details?: string
  options?: string[]
}

const teamMembers: TeamMember[] = [
  {
    id: 'john-doe',
    name: 'John Doe',
    role: 'Lead Engineer',
    imageUrl: '/placeholder.jpg?height=200&width=200',
    favoritePart: 'The innovative drive system',
    quote: 'Innovation distinguishes between a leader and a follower.',
    rating: 4.5
  },
  {
    id: 'jane-smith',
    name: 'Jane Smith',
    role: 'Software Developer',
    imageUrl: '/placeholder.jpg?height=200&width=200',
    favoritePart: 'The autonomous navigation algorithm',
    quote: 'Code is like humor. When you have to explain it, it&apos;s bad.',
    rating: 4.8
  },
  {
    id: 'mike-johnson',
    name: 'Mike Johnson',
    role: 'Mechanical Engineer',
    imageUrl: '/placeholder.jpg?height=200&width=200',
    favoritePart: 'The articulated robotic arm',
    quote: 'The only way to do great work is to love what you do.',
    rating: 4.2
  },
  {
    id: 'sarah-lee',
    name: 'Sarah Lee',
    role: 'Electrical Engineer',
    imageUrl: '/placeholder.jpg?height=200&width=200',
    favoritePart: 'The efficient power distribution system',
    quote: 'In the world of electrical engineering, resistance is futile.',
    rating: 4.7
  },
]

export function RoboticsProgressAndTeamComponent() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})
  const [completedItems, setCompletedItems] = useState<{ [key: string]: boolean }>({})
  const [notes, setNotes] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [currentPage, setCurrentPage] = useState('progress')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }

  const toggleItem = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleCompletion = (id: string) => {
    setCompletedItems(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const updateNote = (id: string, note: string) => {
    setNotes(prev => ({ ...prev, [id]: note }))
  }

  const toggleMusic = () => {
    const audio = document.getElementById('backgroundMusic') as HTMLAudioElement
    if (isMusicPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsMusicPlaying(!isMusicPlaying)
  }

  const sections = [
    {
      title: 'Our Progress',
      icon: <Cpu className="w-6 h-6" />,
      content: 'We recently completed making the robot movement. This is a significant milestone in our project!',
    },
    {
      title: 'Current Issues',
      icon: <Wrench className="w-6 h-6" />,
      content: [
        {
          id: 'battery',
          issue: 'Battery falling out of place',
          solution: 'Design and 3D print a custom battery holder that securely fits in the robot chassis.',
          details: 'The battery falling out is a critical issue that needs immediate attention. Here are some options to fix it:',
          options: [
            '3D print a custom battery holder',
            'Use industrial-strength velcro straps',
            'Install a metal bracket system',
          ],
        },
        {
          id: 'wheels',
          issue: 'Wheels movement is not perfect',
          solution: 'Calibrate the motor controllers and adjust the PID values for smoother motion.',
          details: 'Imperfect wheel movement can affect the robot\'s performance. Here\'s what we can do:',
          options: [
            'Fine-tune PID controller parameters',
            'Check for mechanical issues in the drivetrain',
            'Upgrade to more precise motor encoders',
          ],
        },
        {
          id: 'webcam',
          issue: 'Webcam needed for automation purposes',
          solution: 'Research compatible webcams, integrate with ROS (Robot Operating System) for image processing.',
          details: 'Implementing a webcam is crucial for autonomous operations. Here\'s our plan:',
          options: [
            'Select a high-resolution, wide-angle webcam',
            'Implement OpenCV for image processing',
            'Integrate webcam data with the robot\'s decision-making system',
          ],
        },
      ] as SectionContentItem[],
    },
    {
      title: 'Next Steps',
      icon: <Cog className="w-6 h-6" />,
      content: [
        {
          id: 'qr-scanning',
          step: 'Work with webcam for QR scanning',
          details: 'Implement OpenCV for QR code detection and integrate with robot control system.',
          options: [
            'Set up OpenCV environment',
            'Develop QR code detection algorithm',
            'Test QR code scanning in various lighting conditions',
          ],
        },
        {
          id: 'servo-code',
          step: 'Prepare servo control code',
          details: 'Develop modular code for servo control that can be easily integrated when the claw is built.',
          options: [
            'Design a flexible servo control interface',
            'Implement position and speed control for servos',
            'Create a simulation environment for testing',
          ],
        },
        {
          id: 'assign-roles',
          step: 'Assign roles for bot operation',
          details: 'Identify team members\' strengths and assign roles like driver, operator, and technician.',
          options: [
            'Conduct skill assessment for team members',
            'Define clear responsibilities for each role',
            'Organize training sessions for each role',
          ],
        },
      ] as SectionContentItem[],
    },
  ]

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-white"
            >
              Rev Robotics
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
        className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100"
      >
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Cpu className="h-8 w-8 text-blue-600" />
                  <span className="ml-2 text-xl font-bold text-blue-600 cursor-pointer" onClick={() => setCurrentPage('progress')}>Rev Robotics</span>
                </div>
                <div className="hidden sm:ml-80 sm:flex sm:space-x-8 mt-3 ml-4">
                  <Button
                    variant={currentPage === 'progress' ? 'default' : 'ghost'}
                    onClick={() => setCurrentPage('progress')}
                  >
                    Progress Report
                  </Button>
                  <Button
                    variant={currentPage === 'team' ? 'default' : 'ghost'}
                    onClick={() => setCurrentPage('team')}
                  >
                    Team
                  </Button>
                </div>
              </div>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={toggleMusic}>
                  {isMusicPlaying ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <audio id="backgroundMusic" loop>
          <source src="/b-music.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <AnimatePresence mode="wait">
          {currentPage === 'progress' && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="py-12 px-4 sm:px-6 lg:px-8"
            >
              <div className="max-w-3xl mx-auto">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl font-bold text-center text-blue-600 mb-8"
                >
                  Rev Robotics{' '}
                  <Button
                    variant="link"
                    className="text-4xl font-bold text-center text-blue-600 mb-8"
                    onClick={() => setCurrentPage('team')}
                  >
                    Team
                  </Button>{' '}
                  Progress
                </motion.h1>
                {/* Other components for rendering sections */}
              </div>
            </motion.div>
          )}
          {/* Render for 'team' page */}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
