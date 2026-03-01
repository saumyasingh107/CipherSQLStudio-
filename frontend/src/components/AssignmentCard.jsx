import { Link } from "react-router-dom";

const AssignmentCard = ({ assignment }) => {
  return (
    <article className="assignment-card">
      <div className="assignment-card__head">
        <h3 className="assignment-card__title">{assignment.title}</h3>
        <span className={`difficulty-badge difficulty-badge--${assignment.difficulty}`}>
          {assignment.difficulty}
        </span>
      </div>
      <p className="assignment-card__description">{assignment.description}</p>
      <Link className="assignment-card__cta" to={`/assignments/${assignment.id}`}>
        Start Attempt
      </Link>
    </article>
  );
};

export default AssignmentCard;

