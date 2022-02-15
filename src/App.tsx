import { useEffect, useState } from 'react';
import { SideBar, Content, Header } from './components';
import { api } from './services/api';
import './styles/global.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function App() {
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  
  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar onClick={handleClickButton} selectedGenreId={selectedGenreId} />
      <div className="container">
        <Header selectedGenre={selectedGenre} />
        <Content selectedGenreId={selectedGenreId} />
      </div>
    </div>
  )
}