import { useEffect, useState } from "react";
import { Datepicker } from "flowbite-react";
import { getHolidays, Holiday } from "../../services/api";
import { theme } from "./themeDatepicker";

interface DatepickerProps {
  id: string;
  labelDate?: string;
  labelTime?: string;
  onChange?: (value: { date: string; time: string | null }) => void;
}

const DatepickerComponent: React.FC<DatepickerProps> = ({
  id,
  labelDate,
  labelTime,
  onChange,
}) => {
  const [selectedTime, setSelectedTime] = useState<string | null>("14:00");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isHoliday, setIsHoliday] = useState<boolean>(false);
  const [holidayName, setHolidayName] = useState<string | null>(null);

  const times = ["12:00", "14:00", "16:30", "18:30", "20:00"];

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const data = await getHolidays();
        setHolidays(data);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      } finally {
        console.log(
          "Request to fetch holidays completed (either successfully or with error)."
        );
      }
    };
    fetchHolidays();
  }, []);

  const isHolidayOrSunday = (date: Date) => {
    const dayOfWeek = date.getDay();
    const dateStr = date.toISOString().split("T")[0];
    const holiday = holidays.find((holiday) => holiday.date === dateStr);

    if (holiday) {
      setHolidayName(holiday.name);
      return true;
    }

    if (dayOfWeek === 0) {
      setHolidayName(null);
      return true;
    }

    setHolidayName(null);
    return false;
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const isSpecialDay = isHolidayOrSunday(date);
      setIsHoliday(isSpecialDay);
    } else {
      setIsHoliday(false);
      setHolidayName(null);
    }

    onChange?.({
      date: date ? date.toISOString().split("T")[0] : "",
      time: selectedTime,
    });
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    onChange?.({
      date: selectedDate ? selectedDate.toISOString().split("T")[0] : "",
      time,
    });
  };

  return (
    <div className="flex flex-col justify-center my-2">
      {labelDate && (
        <label
          htmlFor="small-range"
          className=" font-sans block text-base font-normal text-text "
        >
          {labelDate}
        </label>
      )}
      <Datepicker
        id={id}
        showClearButton={false}
        showTodayButton={false}
        theme={theme}
        weekStart={1}
        value={selectedDate}
        onChange={handleDateChange}
        className=""
        inline
      />
      {selectedDate && isHoliday ? (
        <div
          className="flex items-center text-sm text-text rounded-lg"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3 text-secondary"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 1 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div className="flex flex-wrap">
            {holidayName ? `It is ${holidayName}.` : "It's a holiday!"}
          </div>
        </div>
      ) : (
        selectedDate && (
          <>
            <div className="flex">
              {labelTime && (
                <label
                  htmlFor="small-range"
                  className="font-sans block text-base font-normal text-text"
                >
                  {labelTime}
                </label>
              )}
            </div>

            <div className="flex flex-wrap gap-2 max-w-[300px]">
              {times.map((time) => (
                <button
                  key={time}
                  type="button"
                  className={`px-3 border py-2 text-sm font-medium rounded-lg bg-white ${
                    selectedTime === time
                      ? "border-primary "
                      : "border-secondary bg-gray-200 text-gray-900"
                  }`}
                  onClick={() => handleTimeClick(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default DatepickerComponent;
