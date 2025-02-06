"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { CallDuration, CallEntry } from "../utils/calculations"

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

interface EditEntryModalProps {
  entry: CallEntry
  onSave: (updatedEntry: CallEntry) => void
  onClose: () => void
}

export function EditEntryModal({ entry, onSave, onClose }: EditEntryModalProps) {
  const [day, setDay] = useState<string>(entry.day)
  const [duration, setDuration] = useState<CallDuration>(entry.duration)
  const [count, setCount] = useState(entry.count)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ day, duration, count })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Edit Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="day-select">Day</Label>
            <Select value={day} onValueChange={setDay}>
              <SelectTrigger id="day-select">
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                {DAYS_OF_WEEK.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration-select">Call Duration</Label>
            <Select
              value={duration.toString()}
              onValueChange={(value) => setDuration(Number.parseInt(value) as CallDuration)}
            >
              <SelectTrigger id="duration-select">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="call-count">Number of Calls</Label>
            <Input
              id="call-count"
              type="number"
              min="1"
              value={count}
              onChange={(e) => setCount(Number.parseInt(e.target.value) || 1)}
              placeholder="Number of calls"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 hover:bg-gray-300">
              Cancel
            </Button>
            <Button type="submit" className="bg-gray-900 text-white hover:bg-gray-700">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

