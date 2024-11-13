-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PracticeTest" (
    "id" SERIAL NOT NULL,
    "testType" TEXT NOT NULL,
    "difficultyLevel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PracticeTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "practiceTestId" INTEGER NOT NULL,
    "questionType" TEXT NOT NULL,
    "questionText" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "sectionNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MultipleChoiceOption" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "optionText" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,

    CONSTRAINT "MultipleChoiceOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WritingTask" (
    "id" SERIAL NOT NULL,
    "practiceTestId" INTEGER NOT NULL,
    "taskNumber" INTEGER NOT NULL,
    "taskDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WritingTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpeakingTask" (
    "id" SERIAL NOT NULL,
    "practiceTestId" INTEGER NOT NULL,
    "partNumber" INTEGER NOT NULL,
    "taskDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpeakingTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTestAttempt" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "practiceTestId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "overallScore" DOUBLE PRECISION,

    CONSTRAINT "UserTestAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAnswer" (
    "id" SERIAL NOT NULL,
    "userTestAttemptId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "userAnswer" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,

    CONSTRAINT "UserAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WritingResponse" (
    "id" SERIAL NOT NULL,
    "userTestAttemptId" INTEGER NOT NULL,
    "writingTaskId" INTEGER NOT NULL,
    "responseText" TEXT NOT NULL,
    "wordCount" INTEGER NOT NULL,
    "score" DOUBLE PRECISION,

    CONSTRAINT "WritingResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpeakingResponse" (
    "id" SERIAL NOT NULL,
    "userTestAttemptId" INTEGER NOT NULL,
    "speakingTaskId" INTEGER NOT NULL,
    "audioFilePath" TEXT NOT NULL,
    "durationSeconds" INTEGER NOT NULL,
    "fluencyScore" DOUBLE PRECISION,
    "coherenceScore" DOUBLE PRECISION,
    "lexicalScore" DOUBLE PRECISION,
    "grammaticalScore" DOUBLE PRECISION,
    "pronunciationScore" DOUBLE PRECISION,
    "overallScore" DOUBLE PRECISION,

    CONSTRAINT "SpeakingResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_practiceTestId_fkey" FOREIGN KEY ("practiceTestId") REFERENCES "PracticeTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MultipleChoiceOption" ADD CONSTRAINT "MultipleChoiceOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WritingTask" ADD CONSTRAINT "WritingTask_practiceTestId_fkey" FOREIGN KEY ("practiceTestId") REFERENCES "PracticeTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeakingTask" ADD CONSTRAINT "SpeakingTask_practiceTestId_fkey" FOREIGN KEY ("practiceTestId") REFERENCES "PracticeTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTestAttempt" ADD CONSTRAINT "UserTestAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTestAttempt" ADD CONSTRAINT "UserTestAttempt_practiceTestId_fkey" FOREIGN KEY ("practiceTestId") REFERENCES "PracticeTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_userTestAttemptId_fkey" FOREIGN KEY ("userTestAttemptId") REFERENCES "UserTestAttempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WritingResponse" ADD CONSTRAINT "WritingResponse_userTestAttemptId_fkey" FOREIGN KEY ("userTestAttemptId") REFERENCES "UserTestAttempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WritingResponse" ADD CONSTRAINT "WritingResponse_writingTaskId_fkey" FOREIGN KEY ("writingTaskId") REFERENCES "WritingTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeakingResponse" ADD CONSTRAINT "SpeakingResponse_userTestAttemptId_fkey" FOREIGN KEY ("userTestAttemptId") REFERENCES "UserTestAttempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeakingResponse" ADD CONSTRAINT "SpeakingResponse_speakingTaskId_fkey" FOREIGN KEY ("speakingTaskId") REFERENCES "SpeakingTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
