'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const defaultSensitiveWords = [
  "abuse", "assault", "harassment", "exploitation", "trafficking", "violence", "murder", "torture", "neglect", "bullying",
  "corruption", "oppression", "racism", "sexism", "bigotry", "manipulation", "addiction", "self-harm", "suicide", "depression",
  "hate crime", "genocide"
]

export default function GuidelineCaptionGenerator() {
  const [sensitiveWords, setSensitiveWords] = useState<string[]>([])
  const [newWord, setNewWord] = useState('')
  const [caption, setCaption] = useState('')
  const [generatedCaption, setGeneratedCaption] = useState('')

  useEffect(() => {
    const storedWords = localStorage.getItem('sensitiveWords')
    if (storedWords) {
      setSensitiveWords(JSON.parse(storedWords))
    } else {
      setSensitiveWords(defaultSensitiveWords)
      localStorage.setItem('sensitiveWords', JSON.stringify(defaultSensitiveWords))
    }
  }, [])

  const updateLocalStorage = (words: string[]) => {
    localStorage.setItem('sensitiveWords', JSON.stringify(words))
  }

  const addWord = () => {
    if (newWord && !sensitiveWords.includes(newWord)) {
      const updatedWords = [...sensitiveWords, newWord]
      setSensitiveWords(updatedWords)
      updateLocalStorage(updatedWords)
      setNewWord('')
    }
  }

  const removeWord = (word: string) => {
    const updatedWords = sensitiveWords.filter(w => w !== word)
    setSensitiveWords(updatedWords)
    updateLocalStorage(updatedWords)
  }

  const generateCaption = () => {
    let newCaption = caption

    sensitiveWords.forEach(word => {
      const regex = new RegExp(word, 'gi')
      newCaption = newCaption.replace(regex, (match) => {
        return match.split('').map(char => {
          switch (char.toLowerCase()) {
            case 'a': return '@'
            case 'i': return '!'
            case 's': return '$'
            case 'o': return '0'
            case 'u': return '#'
            default: return char
          }
        }).join('')
      })
    })

    setGeneratedCaption(newCaption)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Guideline Caption Generator</h1>
      <Card>
        <CardHeader>
          <CardTitle>Generate Guideline-Friendly Caption</CardTitle>
          <CardDescription>Modify your caption to meet guidelines</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="newWord" className="block text-sm font-medium text-gray-700  mb-1">
              Add New Sensitive Word
            </label>
            <div className="flex space-x-2 lg:w-1/2">
              <Input
                id="newWord"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                placeholder="Enter a new sensitive word"
              />
              <Button onClick={addWord}>Add</Button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700  mb-1">
              Sensitive Words
            </label>
            <div className="flex flex-wrap gap-2">
              {sensitiveWords.map((word, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {word}
                  <button onClick={() => removeWord(word)} className="ml-2 text-xs">&times;</button>
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="caption" className="block text-sm font-medium text-gray-700  mb-1">
              Your Caption
            </label>
            <Textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Enter your caption here"
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={generateCaption}>Generate Caption</Button>
        </CardFooter>
      </Card>
      {generatedCaption && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Generated Caption</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{generatedCaption}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

