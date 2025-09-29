import { useEffect, useState } from 'react';

const BucketList = () => {
  const [bucketList, setBucketList] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleDelete(parkId) {
    fetch(`http://localhost:3001/bucketlist/${parkId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete');
        }
        // Update state to remove the deleted park
        setBucketList((prevList) =>
          prevList.filter((park) => park.id !== parkId)
        );
      })
      .catch((err) => console.error('Delete failed:', err));
  }

  // Fetch parks from local json-server bucket list
  useEffect(() => {
    fetch('http://localhost:3001/bucketlist')
      .then((res) => res.json())
      .then((data) => {
        setBucketList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching bucket list:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading bucket list...</p>;

  return (
    <div className='container'>
      <h2>My Bucket List</h2>
      {bucketList.length === 0 ? (
        <p>You haven't added any parks yet.</p>
      ) : (
        <div className='card-grid'>
          {bucketList.map((park) => (
            <div key={park.id} className='park-card'>
              <h3>
                {park.fullName} ({park.states})
              </h3>
              {park.image?.url && (
                <img
                  src={park.image.url}
                  alt={park.image.altText || park.fullName}
                  width='300'
                />
              )}
              <p>{park.description}</p>
              <button
                onClick={() => handleDelete(park.id)}
                className='delete-button'
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BucketList;
