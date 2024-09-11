import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from '../components/Spinner';
import { getGoals, reset } from "../features/goals/goalSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals);

  useEffect(() => {
    // Redirect to login if user is not present
    if (!user) {
      navigate('/login');
      return; // Ensure no further code runs in this effect if redirected
    }

    // Fetch goals if user is present
    dispatch(getGoals());

    // Cleanup on unmount
    return () => {
      dispatch(reset());
    };

  }, [user, navigate, dispatch]);

  // Display spinner while loading
  if (isLoading) {
    return <Spinner />;
  }

  // Display dashboard content
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal}/>
            ))}
          </div>
        ) : (<h3>You have not set any goals </h3>)}
      </section>
    </>
  );
}

export default Dashboard;