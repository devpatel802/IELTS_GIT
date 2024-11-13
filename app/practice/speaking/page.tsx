'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Mic, StopCircle, RotateCcw } from "lucide-react"

// This is a mock function to simulate AI analysis
// In a real application, this would be replaced with an actual API call to an AI service
const mockAIAnalysis = async (audioBlob: Blob) => {
  await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate processing time
  return {
    fluencyAndCoherence: Math.random() * 9,
    lexicalResource: Math.random() * 9,
    grammaticalRangeAndAccuracy: Math.random() * 9,
    pronunciation: Math.random() * 9,
    overallBand: (Math.random() * 4 + 5).toFixed(1), // Random score between 5.0 and 9.0
    feedback: "Your speaking demonstrates good fluency with some hesitations. Try to expand your vocabulary and work on your pronunciation of certain words. Overall, a solid performance!"
  }
}

export default function SpeakingPractice() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [analysis, setAnalysis] = useState<any>(null)
  const [currentPart, setCurrentPart] = useState(1)
  const [timer, setTimer] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        setAudioBlob(audioBlob)
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      setTimer(0)
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const resetRecording = () => {
    setAudioBlob(null)
    setAnalysis(null)
    setTimer(0)
  }

  const analyzeRecording = async () => {
    if (audioBlob) {
      const result = await mockAIAnalysis(audioBlob)
      setAnalysis(result)
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const speakingParts = [
    {
      part: 1,
      description: "Introduction and Interview",
      questions: [
        "Can you tell me about your hometown?",
        "What do you do for a living?",
        "Do you enjoy your work/studies? Why or why not?",
      ]
    },
    {
      part: 2,
      description: "Individual Long Turn",
      task: "Describe a memorable journey you have taken. You should say:\n- Where you went\n- Why you went there\n- Who you went with\n- What happened during the journey\n\nExplain why this journey was memorable for you."
    },
    {
      part: 3,
      description: "Two-way Discussion",
      questions: [
        "How has travel changed in your country in the last few decades?",
        "Do you think travel is necessary for a good education? Why or why not?",
        "What are some potential negative effects of international tourism?",
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">IELTS Speaking Practice with AI Analysis</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="h-[calc(100vh-12rem)]">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Speaking Task</h2>
              <Tabs value={`part${currentPart}`} onValueChange={(value) => setCurrentPart(Number(value.replace('part', '')))}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="part1">Part 1</TabsTrigger>
                  <TabsTrigger value="part2">Part 2</TabsTrigger>
                  <TabsTrigger value="part3">Part 3</TabsTrigger>
                </TabsList>
                {speakingParts.map((part, index) => (
                  <TabsContent key={index} value={`part${part.part}`}>
                    <ScrollArea className="h-[calc(100vh-24rem)]">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">{part.description}</h3>
                        {part.questions ? (
                          <ul className="list-disc pl-5 space-y-2">
                            {part.questions.map((question, qIndex) => (
                              <li key={qIndex}>{question}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="whitespace-pre-line">{part.task}</p>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                ))}
              </Tabs>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-x-2">
                    <Button onClick={startRecording} disabled={isRecording}>
                      <Mic className="mr-2 h-4 w-4" /> Start Recording
                    </Button>
                    <Button onClick={stopRecording} disabled={!isRecording} variant="secondary">
                      <StopCircle className="mr-2 h-4 w-4" /> Stop Recording
                    </Button>
                    <Button onClick={resetRecording} disabled={!audioBlob} variant="outline">
                      <RotateCcw className="mr-2 h-4 w-4" /> Reset
                    </Button>
                  </div>
                  <span className="text-lg font-semibold">{formatTime(timer)}</span>
                </div>
                {audioBlob && (
                  <div className="space-y-2">
                    <audio src={URL.createObjectURL(audioBlob)} controls className="w-full" />
                    <Button onClick={analyzeRecording} className="w-full">Analyze Recording</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="h-[calc(100vh-12rem)]">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">AI Analysis</h2>
              {analysis ? (
                <ScrollArea className="h-[calc(100vh-16rem)]">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Overall Band Score</h3>
                      <p className="text-3xl font-bold text-blue-600">{analysis.overallBand}</p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Detailed Scores</h3>
                      {[
                        { name: "Fluency and Coherence", score: analysis.fluencyAndCoherence },
                        { name: "Lexical Resource", score: analysis.lexicalResource },
                        { name: "Grammatical Range and Accuracy", score: analysis.grammaticalRangeAndAccuracy },
                        { name: "Pronunciation", score: analysis.pronunciation },
                      ].map((criterion, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span>{criterion.name}</span>
                            <span>{criterion.score.toFixed(1)}</span>
                          </div>
                          <Progress value={criterion.score * 11.11} className="h-2" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Feedback</h3>
                      <p>{analysis.feedback}</p>
                    </div>
                  </div>
                </ScrollArea>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500 text-center">Record your speaking and click "Analyze Recording" to see AI feedback.</p>
                </div>
              )}
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