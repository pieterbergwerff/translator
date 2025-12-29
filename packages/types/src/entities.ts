export interface User {
  id: string
  name: string
  email: string
  createdAt: Date
}

export interface Translation {
  id: string
  sourceText: string
  targetText: string
  sourceLang: string
  targetLang: string
  userId: string
  createdAt: Date
}
