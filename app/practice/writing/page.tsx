'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function WritingPractice() {
  const [task1Response, setTask1Response] = useState('')
  const [task2Response, setTask2Response] = useState('')
  const [wordCount1, setWordCount1] = useState(0)
  const [wordCount2, setWordCount2] = useState(0)

  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word !== '').length
  }

  const handleTask1Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTask1Response(e.target.value)
    setWordCount1(countWords(e.target.value))
  }

  const handleTask2Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTask2Response(e.target.value)
    setWordCount2(countWords(e.target.value))
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">IELTS Writing Practice</h1>
        <Tabs defaultValue="task1" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="task1">Task 1</TabsTrigger>
            <TabsTrigger value="task2">Task 2</TabsTrigger>
          </TabsList>
          <TabsContent value="task1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Task 1</h2>
                <ScrollArea className="h-[200px] mb-4 border rounded-md p-4">
                  <div className="space-y-4">
                    <p className="font-medium">Instructions:</p>
                    <p>You should spend about 20 minutes on this task.</p>
                    <p>
                      The graph below shows the average monthly temperatures in London over a one-year period.
                      Summarise the information by selecting and reporting the main features, and make comparisons where relevant.
                    </p>
                    <p>Write at least 150 words.</p>
                    <img 
                      src="/placeholder.svg?height=300&width=500" 
                      alt="Graph showing average monthly temperatures in London" 
                      className="mx-auto"
                    />
                  </div>
                </ScrollArea>
                <Textarea
                  placeholder="Type your response here..."
                  value={task1Response}
                  onChange={handleTask1Change}
                  className="min-h-[200px]"
                />
                <p className="mt-2 text-sm text-gray-500">Word count: {wordCount1}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="task2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Task 2</h2>
                <ScrollArea className="h-[200px] mb-4 border rounded-md p-4">
                  <div className="space-y-4">
                    <p className="font-medium">Instructions:</p>
                    <p>You should spend about 40 minutes on this task.</p>
                    <p>
                      Write about the following topic:
                    </p>
                    <p className="font-medium">
                      Some people believe that universities should provide graduates with the knowledge and skills needed in the workplace. Others think that the true function of a university should be to give access to knowledge for its own sake, regardless of whether the course is useful to an employer.
                    </p>
                    <p>
                      Discuss both these views and give your own opinion.
                    </p>
                    <p>
                      Give reasons for your answer and include any relevant examples from your own knowledge or experience.
                    </p>
                    <p>Write at least 250 words.</p>
                  </div>
                </ScrollArea>
                <Textarea
                  placeholder="Type your response here..."
                  value={task2Response}
                  onChange={handleTask2Change}
                  className="min-h-[300px]"
                />
                <p className="mt-2 text-sm text-gray-500">Word count: {wordCount2}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="mt-8 flex justify-center space-x-4">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
          <Button>Submit Responses</Button>
        </div>
      </div>
    </div>
  )
}