import { useEffect, useState } from 'react';
import './ScoresPage.css';

function ScoresPage() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('http://localhost:5050/api/cats/breed-stats');
        if (!res.ok) throw new Error('Erreur API');
        const data = await res.json();
        setStats(data);
      } catch (e) {
        setError('Impossible de charger les statistiques.');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <section className="scores-page">
      <h2>Scores par race</h2>
      <table className="scores-table">
        <thead>
          <tr>
            <th>Race</th>
            <th>Likes</th>
            <th>Dislikes</th>
            <th>Votes blancs</th>
            <th>Total votes</th>
            <th>% Likes</th>
            <th>% Dislikes</th>
            <th>% Blancs</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((row) => {
            const { breed_name, total_votes, upvotes, downvotes } = row;
            const blancs = total_votes - upvotes - downvotes;
            const pct = (n) => total_votes ? Math.round((n / total_votes) * 100) : 0;
            return (
              <tr key={row.breed_id}>
                <td>{breed_name}</td>
                <td>{upvotes}</td>
                <td>{downvotes}</td>
                <td>{blancs}</td>
                <td>{total_votes}</td>
                <td>{pct(upvotes)}%</td>
                <td>{pct(downvotes)}%</td>
                <td>{pct(blancs)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default ScoresPage;
