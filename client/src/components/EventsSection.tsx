import { useState, useEffect } from "react";
import axios from "axios";

const EventsSection = ({ year }: { year: string }) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [eventDates, setEventDates] = useState<string[]>([]);
  const [eventNames, setEventNames] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/get/events/${year}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [year]);

  useEffect(() => {
    if (data) {
      const dates: string[] = [];
      const names: string[] = [];
      Object.keys(data).forEach((yearKey) => {
        dates.push(data[yearKey].eventDate);
        names.push(data[yearKey].eventName);
      });
      setEventDates(dates);
      setEventNames(names);
    }
  }, [data]);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="section">
      <p>Date: {eventDates[2]}</p>
      <p>Name: {eventNames[2]}</p>
    </div>
  );
};

export default EventsSection;
