export const MOCK_USER = {
  _id: "mock-user-001",
  name: "Gamma",
  email: "gamma@vortyx.dev",
  createdAt: "2025-01-15T00:00:00.000Z",
};

export const ITEM_STATUS = {
  PLAYING: "playing",
  COMPLETED: "completed",
  BACKLOG: "backlog",
  DROPPED: "dropped",
};

export const STATUS_LABELS = {
  [ITEM_STATUS.PLAYING]: "Jugando",
  [ITEM_STATUS.COMPLETED]: "Completado",
  [ITEM_STATUS.BACKLOG]: "Backlog",
  [ITEM_STATUS.DROPPED]: "Abandonado",
};

export const MOCK_GAMES = [
  {
    _id: "g1",
    rawg_id: 3498,
    title: "Grand Theft Auto V",
    genre: "Acción",
    platform: "PC",
    status: ITEM_STATUS.COMPLETED,
    imageUrl: null,
    playtime: 48,
  },
  {
    _id: "g2",
    rawg_id: 58611,
    title: "Elden Ring",
    genre: "RPG",
    platform: "PS5",
    status: ITEM_STATUS.COMPLETED,
    imageUrl: null,
    playtime: 96,
  },
  {
    _id: "g3",
    rawg_id: 28,
    title: "Red Dead Redemption 2",
    genre: "Aventura",
    platform: "PC",
    status: ITEM_STATUS.PLAYING,
    imageUrl: null,
    playtime: 60,
  },
  {
    _id: "g4",
    rawg_id: 41494,
    title: "Hades",
    genre: "Roguelike",
    platform: "PC",
    status: ITEM_STATUS.BACKLOG,
    imageUrl: null,
    playtime: 20,
  },
  {
    _id: "g5",
    rawg_id: 4200,
    title: "Portal 2",
    genre: "Puzzle",
    platform: "PC",
    status: ITEM_STATUS.COMPLETED,
    imageUrl: null,
    playtime: 8,
  },
  {
    _id: "g6",
    rawg_id: 5679,
    title: "The Witcher 3",
    genre: "RPG",
    platform: "PC",
    status: ITEM_STATUS.BACKLOG,
    imageUrl: null,
    playtime: 100,
  },
  {
    _id: "g7",
    rawg_id: 12020,
    title: "Cyberpunk 2077",
    genre: "RPG",
    platform: "PC",
    status: ITEM_STATUS.DROPPED,
    imageUrl: null,
    playtime: 50,
  },
];

export const MOCK_MOVIES = [
  {
    _id: "m1",
    tmdb_id: 693134,
    title: "Dune: Part Two",
    genre: "Ciencia ficción",
    type: "movie",
    status: ITEM_STATUS.COMPLETED,
    imageUrl: null,
  },
  {
    _id: "m2",
    tmdb_id: 872585,
    title: "Oppenheimer",
    genre: "Drama",
    type: "movie",
    status: ITEM_STATUS.COMPLETED,
    imageUrl: null,
  },
  {
    _id: "m3",
    tmdb_id: 787699,
    title: "Wonka",
    genre: "Fantasía",
    type: "movie",
    status: ITEM_STATUS.BACKLOG,
    imageUrl: null,
  },
  {
    _id: "m4",
    tmdb_id: 678512,
    title: "Poor Things",
    genre: "Drama",
    type: "movie",
    status: ITEM_STATUS.COMPLETED,
    imageUrl: null,
  },
];

export const MOCK_SERIES = [
  {
    _id: "s1",
    tmdb_id: 126308,
    title: "Shogun",
    genre: "Drama histórico",
    type: "series",
    status: ITEM_STATUS.COMPLETED,
    imageUrl: null,
  },
  {
    _id: "s2",
    tmdb_id: 106379,
    title: "Fallout",
    genre: "Post-apocalíptico",
    type: "series",
    status: ITEM_STATUS.PLAYING,
    imageUrl: null,
  },
  {
    _id: "s3",
    tmdb_id: 100088,
    title: "The Last of Us",
    genre: "Drama",
    type: "series",
    status: ITEM_STATUS.COMPLETED,
    imageUrl: null,
  },
  {
    _id: "s4",
    tmdb_id: 136315,
    title: "The Bear",
    genre: "Comedia dramática",
    type: "series",
    status: ITEM_STATUS.BACKLOG,
    imageUrl: null,
  },
];

export const MOCK_ACTIVITY = Array.from({ length: 70 }, (_, i) => {
  const rand = Math.random();
  if (rand < 0.3) return 0;
  if (rand < 0.52) return 1;
  if (rand < 0.68) return 2;
  if (rand < 0.8) return 3;
  if (rand < 0.92) return 4;
  return 5;
});
