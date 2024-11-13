'use client'

import * as React from "react"
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import * as LabelPrimitive from "@radix-ui/react-label"
import * as SliderPrimitive from "@radix-ui/react-slider"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { Circle, Mic, StopCircle, RotateCcw, Play, Pause } from 'lucide-react'
import { cva, type VariantProps } from "class-variance-authority"

// Utility function
const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ')

// Button component
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

// Card component
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

// ScrollArea component
const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

// Tabs component
const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

// RadioGroup component
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

// Label component
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

// Slider component
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

// Progress component
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

// Separator component
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

// Textarea component
const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

// Home Page
function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">IELTS Prep Pro</h1>
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            <Link href="/practice/reading" className="text-gray-600 hover:text-blue-600">Reading</Link>
            <Link href="/practice/listening" className="text-gray-600 hover:text-blue-600">Listening</Link>
            <Link href="/practice/writing" className="text-gray-600 hover:text-blue-600">Writing</Link>
            <Link href="/practice/speaking" className="text-gray-600 hover:text-blue-600">Speaking</Link>
          </nav>
          <Button className="md:hidden">Menu</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="text-center py-12 md:py-24">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">Ace Your IELTS Exam</h2>
          <p className="text-xl text-gray-600 mb-8">Comprehensive preparation for all IELTS modules</p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Start Free Trial</Button>
        </section>

        <section className="py-12">
          <h3 className="text-3xl font-semibold text-center mb-8">Practice Modules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Reading", description: "Improve your reading comprehension skills" },
              { title: "Listening", description: "Enhance your listening abilities" },
              { title: "Writing", description: "Perfect your writing techniques" },
              { title: "Speaking", description: "Boost your speaking confidence" },
            ].map((module, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold mb-2">{module.title}</h4>
                  <p className="text-gray-600 mb-4">{module.description}</p>
                  <Link href={`/practice/${module.title.toLowerCase()}`}>
                    <Button className="w-full">Start Practice</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-12">
          <h3 className="text-3xl font-semibold text-center mb-8">Why Choose IELTS Prep Pro?</h3>
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
              <TabsTrigger value="features">Key Features</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="results">Success Stories</TabsTrigger>
            </TabsList>
            <TabsContent value="features">
              <Card>
                <CardContent className="p-6">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Comprehensive coverage of all IELTS modules</li>
                    <li>AI-powered speaking analysis</li>
                    <li>Personalized study plans</li>
                    <li>Regular mock tests and performance tracking</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="testimonials">
              <Card>
                <CardContent className="p-6">
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-4">
                      <p>"IELTS Prep Pro helped me achieve my target score. Highly recommended!" - Sarah L.</p>
                      <p>"The speaking practice with AI feedback was a game-changer for me." - Ahmed K.</p>
                      <p>"I improved my writing score from 6.5 to 7.5 using their techniques." - Maria G.</p>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="results">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p>Our students have achieved an average improvement of 1.5 bands.</p>
                    <p>95% of our students reach their target scores within 3 months.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 IELTS Prep Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

// Reading Practice Page
function ReadingPractice() {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: string}>({})
  const [currentSection, setCurrentSection] = useState(1)

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers(prev => ({...prev, [questionId]: answer}))
  }

  const sections = [
    {
      title: "Section 1",
      content: "The content for section 1 goes here...",
      questions: [
        { id: "q1", question: "Question 1", options: ["A", "B", "C", "D"] },
        { id: "q2", question: "Question 2", options: ["A", "B", "C", "D"] },
        // Add more questions as needed
      ]
    },
    {
      title: "Section 2",
      content: "The content for section 2 goes here...",
      questions: [
        { id: "q14", question: "Question 14", options: ["A", "B", "C", "D"] },
        { id: "q15", question: "Question 15", options: ["A", "B", "C", "D"] },
        // Add more questions as needed
      ]
    },
    {
      title: "Section 3",
      content: "The content for section 3 goes here...",
      questions: [
        { id: "q28", question: "Question 28", options: ["A", "B", "C", "D"] },
        { id: "q29", question: "Question 29", options: ["A", "B", "C", "D"] },
        // Add more questions as needed
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
                <div className="pr-4">
                  {sections[currentSection - 1].content}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          <Card className="h-[calc(100vh-12rem)]">
            <CardContent className="p-6">
              <Tabs defaultValue="section1" className="h-full" onValueChange={(value) => setCurrentSection(Number(value.replace('section', '')))}>
                <TabsList className="mb-4">
                  <TabsTrigger value="section1">Section 1</TabsTrigger>
                  <TabsTrigger value="section2">Section 2</TabsTrigger>
                  <TabsTrigger value="section3">Section 3</TabsTrigger>
                </TabsList>
                {sections.map((section, index) => (
                  <TabsContent key={index} value={`section${index + 1}`} className="h-[calc(100vh-20rem)]">
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
              </Tabs>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8 flex justify-between items-center">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
          <div className="flex items-center space-x-4">
            <span>Progress:</span>
            <Progress value={Object.keys(selectedAnswers).length / 40 * 100} className="w-[200px]" />
          </div>
          <Button>Submit Answers</Button>
        </div>
      </div>
    </div>
  )
}

// Listening Practice Page
function ListeningPractice() {
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

// Writing Practice Page
function WritingPractice() {
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

// Speaking Practice Page
function SpeakingPractice() {
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
      // This is a mock function. In a real application, you would send the audio to your AI service.
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate processing time
      setAnalysis({
        fluencyAndCoherence: Math.random() * 9,
        lexicalResource: Math.random() * 9,
        grammaticalRangeAndAccuracy: Math.random() * 9,
        pronunciation: Math.random() * 9,
        overallBand: (Math.random() * 4 + 5).toFixed(1), // Random score between 5.0 and 9.0
        feedback: "Your speaking demonstrates good fluency with some hesitations. Try to expand your vocabulary and work on your pronunciation of certain words. Overall, a solid performance!"
      })
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

export default function App() {
  return (
    <div>
      <HomePage />
      <ReadingPractice />
      <ListeningPractice />
      <WritingPractice />
      <SpeakingPractice />
    </div>
  )
}