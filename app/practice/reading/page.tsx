'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function ReadingPractice() {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: string}>({})

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers(prev => ({...prev, [questionId]: answer}))
  }

  const sections = [
    {
      title: "Section 1",
      content: `The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower. Constructed from 1887 to 1889 as the entrance arch to the 1889 World's Fair, it was initially criticized by some of France's leading artists and intellectuals for its design, but it has become a global cultural icon of France and one of the most recognizable structures in the world.

The Eiffel Tower is the most-visited paid monument in the world; 6.91 million people ascended it in 2015. The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest man-made structure in the world, a title it held for 41 years until the Chrysler Building in New York City was finished in 1930.`,
      questions: [
        { id: "q1", question: "When was the Eiffel Tower constructed?", options: ["1887-1889", "1889-1891", "1885-1887", "1890-1892"] },
        { id: "q2", question: "What was the original purpose of the Eiffel Tower?", options: ["Tourist attraction", "Radio tower", "World's Fair entrance", "Military lookout"] },
        { id: "q3", question: "How tall is the Eiffel Tower?", options: ["300 metres", "324 metres", "350 metres", "400 metres"] },
      ]
    },
    {
      title: "Section 2",
      content: `The tower has three levels for visitors, with restaurants on the first and second levels. The top level's upper platform is 276 m (906 ft) above the ground – the highest observation deck accessible to the public in the European Union. Tickets can be purchased to ascend by stairs or lift to the first and second levels. The climb from ground level to the first level is over 300 steps, as is the climb from the first level to the second. Although there is a staircase to the top level, it is usually accessible only by lift.

The design of the Eiffel Tower is attributed to Maurice Koechlin and Émile Nouguier, two senior engineers working for the Compagnie des Établissements Eiffel. It was envisioned after discussion about a suitable centerpiece for the proposed 1889 Exposition Universelle, a world's fair to celebrate the centennial of the French Revolution. Eiffel openly acknowledged that inspiration for a tower came from the Latting Observatory built in New York City in 1853.`,
      questions: [
        { id: "q14", question: "How many levels does the Eiffel Tower have for visitors?", options: ["Two", "Three", "Four", "Five"] },
        { id: "q15", question: "What is the height of the top level's upper platform?", options: ["324 m", "300 m", "276 m", "250 m"] },
        { id: "q16", question: "Who is credited with the design of the Eiffel Tower?", options: ["Gustave Eiffel", "Maurice Koechlin and Émile Nouguier", "French Revolution committee", "World's Fair organizers"] },
      ]
    },
    {
      title: "Section 3",
      content: `The tower is a prominent feature of Paris's skyline and has been used in dozens of films and TV shows. Its image has been widely used to represent Paris and France. The tower has been the inspiration for the creation of over 30 duplicates and similar towers around the world.

As a global landmark, the Eiffel Tower is a major tourist destination and a symbol of French culture. It has been at the center of many significant historical events and celebrations, including serving as a wireless telegraph transmitter during World War I. The tower has also been the site of numerous scientific experiments, particularly in the fields of meteorology, physics, and radio broadcasting.

The Eiffel Tower's status as a historic monument, its physical dimensions, and its unique architecture make it one of the most recognizable structures in the world. It continues to be a powerful symbol of France and is central to tourism in Paris.`,
      questions: [
        { id: "q28", question: "How has the Eiffel Tower been used in popular culture?", options: ["Only in French media", "Rarely featured", "In dozens of films and TV shows", "Exclusively in literature"] },
        { id: "q29", question: "What role did the Eiffel Tower play during World War I?", options: ["Military base", "Lookout point", "Wireless telegraph transmitter", "Refugee shelter"] },
        { id: "q30", question: "In which scientific fields has the Eiffel Tower been used for experiments?", options: ["Biology and chemistry", "Astronomy and geology", "Meteorology, physics, and radio broadcasting", "Archaeology and anthropology"] },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">IELTS Reading Practice</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="h-[calc(100vh-12rem)]">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Reading Passage</h2>
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="pr-4 space-y-6">
                  {sections.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                      <p className="mb-4">{section.content}</p>
                      {index < sections.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          <Card className="h-[calc(100vh-12rem)]">
            <CardContent className="p-6">
              <Tabs defaultValue="section1" className="h-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="section1">Section 1</TabsTrigger>
                  <TabsTrigger value="section2">Section 2</TabsTrigger>
                  <TabsTrigger value="section3">Section 3</TabsTrigger>
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