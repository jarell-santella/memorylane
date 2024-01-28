import { useState, useEffect } from "react";
import axios from "axios";

interface TelevisionSectionProps {
  year: string;
}

const TelevisionSection: React.FC<TelevisionSectionProps> = ({ year }) => {
  const [tvShowData, setTvShowData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [tvShowReleaseDates, setTvShowReleaseDates] = useState<string[]>([]);
  const [tvShowTitles, setTvShowTitles] = useState<string[]>([]);
  const [tvShowImagePaths, setTvShowImagePaths] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/get/tvshow/${year}`)
      .then((response) => {
        setTvShowData(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [year]);

  useEffect(() => {
    if (tvShowData) {
      const releaseDates: string[] = [];
      const titles: string[] = [];
      const imagePaths: string[] = [];
      Object.keys(tvShowData).forEach((yearKey) => {
        releaseDates.push(tvShowData[yearKey].releaseDate);
        titles.push(tvShowData[yearKey].title);
        imagePaths.push(tvShowData[yearKey].imagePath);
      });
      setTvShowReleaseDates(releaseDates);
      setTvShowTitles(titles);
      setTvShowImagePaths(imagePaths);
    }
  }, [tvShowData]);

  if (error) return <div>Error loading data</div>;
  if (!tvShowData) return <div>Loading...</div>;

  return (
    <div className="section">
      <p>Date: {tvShowReleaseDates[2]}</p>
      <p>Name: {tvShowTitles[2]}</p>
      <p>Image Path: {tvShowImagePaths[2]}</p>
    </div>
  );
};

export default TelevisionSection;
