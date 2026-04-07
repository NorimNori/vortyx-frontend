import ProfileHeader from "./ProfileHeader";
import {
  MOCK_USER,
  MOCK_GAMES,
  MOCK_MOVIES,
  MOCK_SERIES,
  MOCK_ACTIVITY,
} from "../../utils/mockData";
import StatsTab from "./StatsTab";

const user = MOCK_USER;
const games = MOCK_GAMES;
const movies = MOCK_MOVIES;
const series = MOCK_SERIES;
const activity = MOCK_ACTIVITY;

function Profile() {
  return (
    <div>
      <ProfileHeader
        user={user}
        games={games}
        movies={movies}
        series={series}
      />

      <StatsTab
        games={games}
        movies={movies}
        series={series}
        activity={activity}
      />
    </div>
  );
}

export default Profile;
