import React, { useEffect, useState } from 'react';
import './PersonPage.scss';
import { useParams } from 'react-router-dom';

export const PersonPage = () => {
  const [person, setPerson] = useState([]);
  const { personId } = useParams();
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const isLocalhost = window.location.href.startsWith('http://localhost') || window.location.href.startsWith('http://127.0.0.1');

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
      <div className="container personPage__container">
        <img
          className="personPage__image"
          src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
          alt={`Photo ${person.name}`}
          onError={(e) => {
            e.target.src = isLocalhost ? '/public/images/no-image-available.jpg' : '/images/no-image-available.jpg';
          }}
        />
        <div className="personPage__text">
          <h1 className="personPage__text--name">{person.name}</h1>
          <p>{person.birthday}</p>
        </div>
      </div>
    </div>
  );
};