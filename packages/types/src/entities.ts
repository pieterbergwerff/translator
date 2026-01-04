export interface User {
  id: number
  name: string
  email: string
  createdAt: Date
}

export interface Translation {
  id: number
  sourceText: string
  targetText: string
  sourceLang: string
  targetLang: string
  userId: number
  createdAt: Date
}
