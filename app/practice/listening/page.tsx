'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw } from "lucide-react"

export default function ListeningPractice() {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: string}>({})
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers(prev => ({...prev, [questionId]: answer}))
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)
      setIsPlaying(false)
    }
  }

  const sections = [
    {
      title: "Section 1",
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: `q${i + 1}`,
        question: `Question ${i + 1}`,
        options: ["Option A", "Option B", "Option C", "Option D"]
      }))
    },
    {
      title: "Section 2",
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: `q${i + 11}`,
        question: `Question ${i + 11}`,
        options: ["Option A", "Option B", "Option C", "Option D"]
      }))
    },
    {
      title: "Section 3",
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: `q${i + 21}`,
        question: `Question ${i + 21}`,
        options: ["Option A", "Option B", "Option C", "Option D"]
      }))
    },
    {
      title: "Section 4",
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: `q${i + 31}`,
        question: `Question ${i + 31}`,
        options: ["Option A", "Option B", "Option C", "Option D"]
      }))
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">IELTS Listening Practice</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="h-[calc(100vh-12rem)]">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Audio Player</h2>
              <div className="space-y-4">
                <audio
                  ref={audioRef}
                  src="/placeholder.mp3"
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                />
                <div className="flex items-center space-x-2">
                  <Button onClick={togglePlayPause} aria-label={isPlaying ? "Pause" : "Play"}>
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button onClick={resetAudio} aria-label="Reset">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <div className="flex-grow">
                    <Slider
                      value={[currentTime]}
                      max={audioRef.current?.duration || 100}
                      step={0.1}
                      onValueChange={handleSliderChange}
                      aria-label="Audio progress"
                    />
                  </div>
                </div>
                <p className="text-center">
                  {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')} / 
                  {audioRef.current?.duration ? 
                    `${Math.floor(audioRef.current.duration / 60)}:${Math.floor(audioRef.current.duration % 60).toString().padStart(2, '0')}` : 
                    "0:00"}
                </p>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Instructions</h3>
                <p className="text-gray-700">
                  Listen to the audio and answer the questions in each section. You can pause, play, and rewind the audio as needed. Make sure to select your answers before moving to the next section.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="h-[calc(100vh-12rem)]">
            <CardContent className="p-6">
              <Tabs defaultValue="section1" className="h-full">
                <TabsList className="mb-4">
                  {sections.map((section, index) => (
                    <TabsTrigger key={index} value={`section${index + 1}`}>{section.title}</TabsTrigger>
                  ))}
                  <TabsTrigger value="answers">Your Answers</TabsTrigger>
                </TabsList>
                {sections.map((section, sectionIndex) => (
                  <TabsContent key={sectionIndex} value={`section${sectionIndex + 1}`} className="h-[calc(100vh-20rem)]">
                    <ScrollArea className="h-full">
                      <div className="pr-4 space-y-6">
                        {section.questions.map((q) => (
                          <div key={q.id}>
                            <p className="font-semibold mb-2">{q.question}</p>
                            <RadioGroup onValueChange={(value) => handleAnswerSelect(q.id, value)}>
                              {q.options.map((option, index) => (
                                <div className="flex items-center space-x-2" key={index}>
                                  <RadioGroupItem value={option} id={`${q.id}-${index}`} />
                                  <Label htmlFor={`${q.id}-${index}`}>{option}</Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                ))}
                <TabsContent value="answers" className="h-[calc(100vh-20rem)]">
                  <ScrollArea className="h-full">
                    <div className="pr-4 space-y-4">
                      {Object.entries(selectedAnswers).map(([questionId, answer]) => (
                        <p key={questionId}>Question {questionId.slice(1)}: <span className="font-semibold">{answer}</span></p>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8 flex justify-center">
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
