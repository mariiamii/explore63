// import parks from '../data/parks';
import { useEffect, useState } from 'react';
// In {} b/c you're importing a named variable & must match the name exactly
import { OFFICIAL_PARK_CODES } from '../data/officialParkCodes';

// https://www.nps.gov/subjects/developer/get-started.htm
const API_KEY = '7f0pr8m8YsfxXwgobklJlc1uqiHJ8QVa2xczKo3v';

const Home = () => {
  // parks state is initialized as an empty array
  // setParks is the fn used to update that array & hold the filtered list of official national parks
  const [parks, setParks] = useState([]);
  // State to track loading status while fetching data
  const [loading, setLoading] = useState(true);

  function handleAddToBucketList(park) {
    console.log('Button clicked for:', park.fullName);

    console.log('park in EVENT HANDLER', park);
    const simplifiedPark = {
      id: park.id,
      fullName: park.fullName,
      states: park.states,
      description: park.description,
      image: park.images?.[0],
    };

    fetch('http://localhost:3001/bucketlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(simplifiedPark),
    })
      .then((res) => {
        console.log('Response:', res);
        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Successfully added to bucket list:', data);
      })
      .catch((error) => {
        console.error('POST failed:', error);
      });
  }

  // useEffect runs once when the component mounts
  useEffect(() => {
    // Define an async function to fetch and filter park data
    async function fetchParks() {
      try {
        // Make a GET request to the NPS API for up to 500 park units
        const res = await fetch(
          `https://developer.nps.gov/api/v1/parks?limit=500&api_key=${API_KEY}`
        );
        // res: the res JSON returned by fetch
        // .json(): parses the body of the res into a JS object
        const data = await res.json();

        // Filter the full list of 473 parks (data.data) to include only the 63 official National Parks
        // This checks if the park's code is in our official park codes list ('../data/officialParkCodes')
        const nationalParks = data.data.filter((park) =>
          OFFICIAL_PARK_CODES.includes(park.parkCode)
        );

        // console.log('Sample park:', nationalParks[0]);
        // Update state with the filtered parks and stop loading
        setParks(nationalParks);
        setLoading(false);
      } catch (error) {
        // Log any fetch or parsing errors and stop loading
        console.error('Error fetching parks:', error);
        setLoading(false);
      }
    }

    // Call the async fetch function
    fetchParks();
  }, []);

  if (loading) {
    return <p>Loading parks...</p>;
  }

  return (
    <div className='container'>
      <h1>Explore63 – National Park Bucket List</h1>
      <h2>All National Parks</h2>
      <div className='card-grid'>
        {parks.map((park) => (
          <div key={park.id} className='park-card'>
            <h3>
              {park.fullName} ({park.states})
            </h3>
            <img
              src={park.images[0].url}
              alt={park.images[0].altText || park.fullName}
              width='300'
            />
            <p>{park.description}</p>
            <button onClick={() => handleAddToBucketList(park)}>
              Add to Bucket List
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
