import ProfileHeader from "./ProfileHeader";
import {
  MOCK_USER,
  MOCK_GAMES,
  MOCK_MOVIES,
  MOCK_SERIES,
} from "../../utils/mockData";

const user = MOCK_USER;
const games = MOCK_GAMES;
const movies = MOCK_MOVIES;
const series = MOCK_SERIES;

function Profile() {
  return (
    <div>
      <ProfileHeader
        user={user}
        games={games}
        movies={movies}
        series={series}
      />
    </div>
  );
}

export default Profile;
