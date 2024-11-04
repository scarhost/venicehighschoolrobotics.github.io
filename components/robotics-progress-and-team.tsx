'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Cpu, Wrench, Cog, Camera, Gamepad, Check, X, Volume2, VolumeX, Star } from 'lucide-react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type SectionItem = {
  id: string;
  issue?: string;
  step?: string;
  solution?: string;
  details: string;
  options: string[];
};

type Section = {
  title: string;
  icon: JSX.Element;
  content: string | SectionItem[];
};

type TeamMember = {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  favoritePart: string;
  quote: string;
  rating: number;
};

const teamMembers: TeamMember[] = [
  {
    id: 'john-doe',
    name: 'John Doe',
    role: 'Lead Engineer',
    imageUrl: '/placeholder.jpg?height=200&width=200',
    favoritePart: 'The innovative drive system',
    quote: 'Innovation distinguishes between a leader and a follower.',
    rating: 4.5,
  },
  {
    id: 'jane-smith',
    name: 'Jane Smith',
    role: 'Software Developer',
    imageUrl: '/placeholder.jpg?height=200&width=200',
    favoritePart: 'The autonomous navigation algorithm',
    quote: 'Code is like humor. When you have to explain it, it&apos;s bad.',
    rating: 4.8,
  },
  {
    id: 'mike-johnson',
    name: 'Mike Johnson',
    role: 'Mechanical Engineer',
    imageUrl: '/placeholder.jpg?height=200&width=200',
    favoritePart: 'The articulated robotic arm',
    quote: 'The only way to do great work is to love what you do.',
    rating: 4.2,
  },
  {
    id: 'sarah-lee',
    name: 'Sarah Lee',
    role: 'Electrical Engineer',
    imageUrl: '/placeholder.jpg?height=200&width=200',
    favoritePart: 'The efficient power distribution system',
    quote: 'In the world of electrical engineering, resistance is futile.',
    rating: 4.7,
  },
];

export function RoboticsProgressAndTeamComponent() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
  const [completedItems, setCompletedItems] = useState<{ [key: string]: boolean }>({});
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState('progress');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCompletion = (id: string) => {
    setCompletedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const updateNote = (id: string, note: string) => {
    setNotes((prev) => ({ ...prev, [id]: note }));
  };

  const toggleMusic = () => {
    const audio = document.getElementById('backgroundMusic') as HTMLAudioElement;
    if (isMusicPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const sections: Section[] = [
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
        solution: 'Implement a secure battery mounting solution using REV Robotics components.',
        details: 'The battery falling out is a critical issue that needs immediate attention. Here are detailed steps to fix it:',
        options: [
          'Utilize the REV Robotics Battery Holder Plate, designed to support a REV 12V Battery securely. :contentReference[oaicite:0]{index=0}',
          'Employ industrial-strength hook and loop fasteners to hold the battery firmly in place. :contentReference[oaicite:1]{index=1}',
          'Design and 3D print a custom battery holder tailored to your robot’s chassis, ensuring a snug fit. :contentReference[oaicite:2]{index=2}',
        ],
      },
      {
        id: 'wheels',
        issue: 'Wheels movement is not perfect',
        solution: 'Calibrate motor controllers and adjust PID values using appropriate tools.',
        details: 'Imperfect wheel movement can affect the robot’s performance. Here’s what we can do for fine-tuning:',
        options: [
          'Use the FTC Dashboard tool to visualize and adjust PID controller parameters in real-time for smoother motion.',
          'Inspect the drivetrain for any loose connections, worn gears, or misalignments that may impact wheel performance.',
          'Upgrade to motor encoders with higher resolution to ensure more precise movement tracking and feedback.',
        ],
      },
      {
        id: 'webcam',
        issue: 'Webcam needed for automation purposes',
        solution: 'Integrate a compatible webcam with OpenCV for image processing.',
        details: 'Implementing a webcam is crucial for autonomous operations. Detailed steps include:',
        options: [
          'Select a high-resolution, wide-angle USB webcam compatible with the robot’s control system.',
          'Set up OpenCV in the programming environment and test basic image processing scripts to ensure compatibility.',
          'Integrate webcam data into the robot’s decision-making system, considering lighting conditions and testing with various QR codes for consistent performance.',
        ],
      },
    ],
  },
  {
    title: 'Next Steps',
    icon: <Cog className="w-6 h-6" />,
    content: [
      {
        id: 'qr-scanning',
        step: 'Work with webcam for QR scanning',
        details: 'Implement OpenCV for QR code detection and integrate with the robot control system. Follow these detailed steps:',
        options: [
          'Install OpenCV and any necessary libraries (e.g., `pip install opencv-python`).',
          'Develop a Python script that uses `cv2` for QR code detection and test it with static images.',
          'Integrate the OpenCV code into the robot’s control system and test QR scanning under different lighting conditions to ensure reliability.',
        ],
      },
      {
        id: 'servo-code',
        step: 'Prepare servo control code',
        details: 'Develop modular code for servo control, ensuring it’s ready for the integration phase. Key steps:',
        options: [
          'Design a flexible interface for controlling servo positions, allowing for easy adjustments.',
          'Implement basic position and speed control functions using libraries like FTC SDK’s Servo class.',
          'Create a simulation environment or use test servos to validate the movement accuracy and response times.',
        ],
      },
      {
        id: 'assign-roles',
        step: 'Assign roles for bot operation',
        details: 'Identify team members’ strengths and assign roles for efficient robot operation during competitions.',
        options: [
          'Conduct a skill assessment to understand team members’ experience and strengths.',
          'Define clear responsibilities for each role (e.g., driver, operator, technician) to streamline operations.',
          'Plan and organize training sessions tailored to each role, ensuring everyone is confident and prepared.',
        ],
      },
    ],
  },
];


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
                  <span className="ml-2 text-xl font-bold text-blue-600 cursor-pointer" onClick={() => setCurrentPage('progress')}>
                    Rev Robotics
                  </span>
                </div>
                <div className="hidden sm:ml-80 sm:flex sm:space-x-8 mt-3 ml-4">
                  <Button variant={currentPage === 'progress' ? 'default' : 'ghost'} onClick={() => setCurrentPage('progress')}>
                    Progress Report
                  </Button>
                  <Button variant={currentPage === 'team' ? 'default' : 'ghost'} onClick={() => setCurrentPage('team')}>
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
                {sections.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="mb-6"
                  >
                    <Button
                      variant="outline"
                      onClick={() => toggleSection(section.title)}
                      className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                      <div className="flex items-center">
                        {section.icon}
                        <h2 className="ml-2 text-xl font-semibold text-gray-800">{section.title}</h2>
                      </div>
                      {activeSection === section.title ? (
                        <ChevronUp className="w-5 h-5 text-blue-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-blue-500" />
                      )}
                    </Button>
                    <AnimatePresence>
                      {activeSection === section.title && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-2 p-4 bg-white rounded-lg shadow-inner"
                        >
                          {Array.isArray(section.content) ? (
                            <ul className="space-y-4">
                              {(section.content as SectionItem[]).map((item, i) => (
                                <motion.li
                                  key={item.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: i * 0.1 }}
                                  className="border-b pb-4"
                                >
                                  <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-blue-600">
                                      {item.issue || item.step}
                                    </h3>
                                    <div className="flex items-center space-x-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => toggleItem(item.id)}
                                      >
                                        Information
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => toggleCompletion(item.id)}
                                      >
                                        {completedItems[item.id] ? (
                                          <Check className="w-4 h-4 text-green-500" />
                                        ) : (
                                          <X className="w-4 h-4 text-red-500" />
                                        )}
                                      </Button>
                                    </div>
                                  </div>
                                  <p className="text-gray-600 mt-1">
                                    {item.solution || item.details}
                                  </p>
                                  <AnimatePresence>
                                    {expandedItems[item.id] && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-2"
                                      >
                                        <h4 className="font-semibold text-gray-700 mb-2">Options:</h4>
                                        <ul className="list-disc list-inside space-y-1">
                                          {item.options.map((option, index) => (
                                            <li key={index} className="text-gray-600">{option}</li>
                                          ))}
                                        </ul>
                                        <div className="mt-4">
                                          <label htmlFor={`note-${item.id}`} className="block text-sm font-medium text-gray-700">
                                            Notes:
                                          </label>
                                          <textarea
                                            id={`note-${item.id}`}
                                            value={notes[item.id] || ''}
                                            onChange={(e) => updateNote(item.id, e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                            rows={3}
                                            placeholder="Add your thoughts or plans here..."
                                          />
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </motion.li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-600">{section.content}</p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mt-12 p-6 bg-white rounded-lg shadow-lg"
                >
                  <h2 className="text-2xl font-bold text-blue-600 mb-4">Team Focus</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Camera className="w-6 h-6 text-orange-500 mr-2 flex-shrink-0 mt-1" />
                      <p className="text-gray-700">
                        <span className="font-semibold">Webcam Integration:</span> Focus on implementing computer vision for QR code scanning. This will be crucial for the autonomous phase.
                      </p>
                    </div>
                    <div className="flex items-start">
                      <Cog className="w-6 h-6 text-orange-500 mr-2 flex-shrink-0 mt-1" />
                      <p className="text-gray-700">
                        <span className="font-semibold">Servo Preparation:</span> While Lev and James work on the physical claw and arm, prepare the servo control code to ensure smooth integration later.
                      </p>
                    </div>
                    <div className="flex items-start">
                      <Gamepad className="w-6 h-6 text-orange-500 mr-2 flex-shrink-0 mt-1" />
                      <p className="text-gray-700">
                        <span className="font-semibold">Role Assignment:</span> Begin the process of identifying team members who will operate the bot during competitions. Consider skills like precision control, quick decision-making, and technical troubleshooting.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {currentPage === 'team' && (
            <motion.div
              key="team"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="py-12 px-4 sm:px-6 lg:px-8"
            >
              <div className="max-w-7xl mx-auto">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl font-bold text-center text-blue-600 mb-12"
                >
                  Our Nerds
                </motion.h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card>
                        <CardHeader>
                          <div className="relative h-48 w-full mb-4">
                            <Image
                              src={member.imageUrl}
                              alt={`Photo of ${member.name}`}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-t-lg"
                            />
                          </div>
                          <CardTitle>{member.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Badge className="mb-2">{member.role}</Badge>
                          <p className="text-sm text-gray-600 mb-2">Favorite part: {member.favoritePart}</p>
                          <blockquote className="italic text-sm text-gray-500 mb-4">&quot;{member.quote}&quot;</blockquote>
                          <div className="flex items-center mb-4">
                            <span className="text-gray-700 mr-2">Robot Rating:</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(member.rating)
                                      ? 'text-yellow-400'
                                      : i < member.rating
                                      ? 'text-yellow-200'
                                      : 'text-gray-300'
                                  }`}
                                  fill="currentColor"
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">{member.rating.toFixed(1)}</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" onClick={() => alert(`View more about ${member.name}`)}>
                            View More
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
