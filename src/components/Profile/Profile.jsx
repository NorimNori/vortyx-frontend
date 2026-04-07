import ProfileHeader from "./ProfileHeader";
import {
  MOCK_USER,
  MOCK_GAMES,
  MOCK_MOVIES,
  MOCK_SERIES,
  MOCK_ACTIVITY,
} from "../../utils/mockData";
import StatsTab from "./StatsTab";
import { useState } from "react";
import CollectionTab from "./CollectionTab";
import ProfileTabs from "./ProfileTabs";

const user = MOCK_USER;
const games = MOCK_GAMES;
const movies = MOCK_MOVIES;
const series = MOCK_SERIES;
const activity = MOCK_ACTIVITY;

function Profile() {
  const [activeTab, setActiveTab] = useState("games");
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

      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="profile__tab-content" role="tabpanel">
        {activeTab === "games" && <CollectionTab items={games} type="game" />}
        {activeTab === "movies" && (
          <CollectionTab items={movies} type="movie" />
        )}
        {activeTab === "series" && (
          <CollectionTab items={series} type="series" />
        )}
        {activeTab === "stats" && (
          <StatsTab
            games={games}
            movies={movies}
            series={series}
            activity={activity}
          />
        )}
      </div>
    </div>
  );
}

export default Profile;
