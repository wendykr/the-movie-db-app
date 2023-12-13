import React, { useEffect, useState } from 'react';
import './PersonPage.scss';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/Button/Button';

export const PersonPage = () => {
  const [person, setPerson] = useState([]);

  const { personId } = useParams();
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchPerson = async () => {
      if (!personId) {
        console.error("Invalid id:", personId);
        return;
      }

      const personResponse = await fetch(`https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}`);
      const personData = await personResponse.json();
      setPerson(personData);
    };

    fetchPerson();
  }, [apiKey, personId]);

  console.log(person);

  return (
    <div className="page personPage">
      <Button text="Zpět na seznam" />
      <div className="container personPage__container">
        <img
          className="personPage__image"
          src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
          alt={`Photo ${person.name}`}
          onError={(e) => {
            e.target.src = '/public/images/no-image-available.jpg';
          }}
        />
        <div className="personPage__text">
          <h1 className="personPage__name">{person.name}</h1>
          <p>{person.birthday}</p>
        </div>
      </div>
    </div>
  )
}