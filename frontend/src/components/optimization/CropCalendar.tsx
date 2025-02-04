import type React from "react"
import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import type { Soil, CalendarEvent } from "../../types/optimization"

interface CropCalendarProps {
  soil: Soil
  events: CalendarEvent[]
}

export const CropCalendar: React.FC<CropCalendarProps> = ({ soil, events }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  const getEventColor = (eventType: string) => {
    switch (eventType) {
      case "planting":
        return "bg-green-200 text-green-800"
      case "irrigation":
        return "bg-blue-200 text-blue-800"
      case "fertilization":
        return "bg-orange-200 text-orange-800"
      case "harvest":
        return "bg-yellow-200 text-yellow-800"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-green-600" />
        Calendrier des Cultures
      </h2>
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-200">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-medium">
          {currentMonth.toLocaleString("fr-FR", { month: "long", year: "numeric" })}
        </h3>
        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-200">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((day) => (
          <div key={day} className="text-center font-medium text-sm py-2">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="h-32 border border-gray-200 rounded-md"></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
          const dayEvents = events.filter((event) => new Date(event.date).toDateString() === date.toDateString())

          return (
            <div key={day} className="h-32 border border-gray-200 rounded-md p-1 overflow-y-auto">
              <div className="text-right text-sm mb-1">{day}</div>
              {dayEvents.map((event, eventIndex) => (
                <div
                  key={eventIndex}
                  className={`text-xs p-1 mb-1 rounded ${getEventColor(event.type)}`}
                  title={`${event.type}: ${event.description}`}
                >
                  {event.description}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

