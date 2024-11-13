import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const questions = await prisma.questions.findMany({
        where: {
          practice_test: {
            test_type: 'reading'
          }
        },
        include: {
          multiple_choice_options: true
        }
      })
      res.status(200).json(questions)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching questions', error })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}