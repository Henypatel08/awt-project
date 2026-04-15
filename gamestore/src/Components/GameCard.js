import "./Card.css";

function GameCard({ name, price, image }) {
  return (
    <div className="game-card">
      <img src={image} alt={name} referrerPolicy="no-referrer" />
      <h3>{name}</h3>
      <p>{price}</p>
      <button>View Details</button>
    </div>
  );
}
export default GameCard;