export const INITIAL_HOBBIES = [
  {
    id: 'cricket',
    name: 'Cricket',
    category: 'Outdoor Sports',
    tag: 'Bat & Ball',
    icon: '🏏',
    color: '#059669', // Emerald Green
    accent: '#34d399',
    badge: 'Precision & Strategy',
    description: 'Mastering the pitch: from classic straight drives to fast yorkers and match-winning tactical fielding.',
    weeklyGoalMinutes: 180,
    loggedMinutes: 135,
    streakDays: 4,
    stats: [
      { label: 'Matches Played', value: '18' },
      { label: 'Highest Score', value: '84*' },
      { label: 'Wickets Taken', value: '16' },
      { label: 'Fav Shot', value: 'Cover Drive' },
    ],
    skills: [
      { name: 'Front Foot Defense & Drives', level: 85 },
      { name: 'Outswing / Spin Grip', level: 75 },
      { name: 'Slip Catching Reflexes', level: 80 },
      { name: 'Power Hitting & Pull Shot', level: 70 },
    ],
    drills: [
      { id: 'c1', text: '30-minute shadow batting in front of mirror', completed: true },
      { id: 'c2', text: 'Target bowling drill (hitting single stump with 30 balls)', completed: true },
      { id: 'c3', text: 'High-catch & reaction drills with tennis ball', completed: false },
      { id: 'c4', text: 'Match simulation: chasing 8 runs per over in nets', completed: false },
    ],
    highlights: [
      'Hit a match-winning 42 off 22 balls in last weekend T20 club game.',
      'Perfected the wrist position for late outswing during net practice.',
      'Completed 50 slip catches drill without dropping any ball.',
    ],
  },
  {
    id: 'football',
    name: 'Football',
    category: 'Outdoor Sports',
    tag: 'The Beautiful Game',
    icon: '⚽',
    color: '#2563eb', // Royal Blue
    accent: '#60a5fa',
    badge: 'Agility & Teamwork',
    description: 'Fluid movement, sharp first touch, explosive sprint counter-attacks, and curling free-kicks into the top corner.',
    weeklyGoalMinutes: 150,
    loggedMinutes: 120,
    streakDays: 5,
    stats: [
      { label: 'Matches Won', value: '11' },
      { label: 'Goals Scored', value: '14' },
      { label: 'Key Assists', value: '9' },
      { label: 'Fav Position', value: 'Attacking Mid' },
    ],
    skills: [
      { name: 'First Touch & Ball Control', level: 90 },
      { name: 'Long Range Curve & Crossing', level: 80 },
      { name: 'Dribbling in Tight Spaces', level: 85 },
      { name: 'Match Stamina & Sprinting', level: 78 },
    ],
    drills: [
      { id: 'f1', text: '100 consecutive ball juggling challenge without drops', completed: true },
      { id: 'f2', text: 'Cone dribbling agility slalom (both feet)', completed: true },
      { id: 'f3', text: 'Penalty shootouts and curling free-kicks from 20 yards', completed: false },
      { id: 'f4', text: '5-a-side weekly turf tournament match', completed: false },
    ],
    highlights: [
      'Scored a long-range curling goal in top-right corner during Friday night match.',
      'Achieved a personal best of 165 uninterrupted juggles.',
      'Provided 3 key assists in 5v5 indoor tournament.',
    ],
  },
  {
    id: 'movie',
    name: 'Movies',
    category: 'Cinema & Arts',
    tag: 'Silver Screen',
    icon: '🎬',
    color: '#e11d48', // Crimson Red
    accent: '#fb7185',
    badge: 'Storytelling & Visuals',
    description: 'Exploring cinematic masterpieces, thought-provoking screenplays, unforgettable scores, and classic film analysis.',
    weeklyGoalMinutes: 240,
    loggedMinutes: 210,
    streakDays: 6,
    stats: [
      { label: 'Films Watched', value: '38' },
      { label: 'Favorite Genre', value: 'Sci-Fi / Thriller' },
      { label: 'Avg Rating', value: '4.8 ★' },
      { label: 'Popcorn Bowls', value: '26' },
    ],
    skills: [
      { name: 'Screenplay & Plot Deconstruction', level: 88 },
      { name: 'Cinematography & Color Grading', level: 92 },
      { name: 'Original Score & Sound Design', level: 85 },
      { name: 'Classic World Cinema Lore', level: 76 },
    ],
    drills: [
      { id: 'm1', text: 'Watch and write a spoiler-free review for Christopher Nolan’s Oppenheimer', completed: true },
      { id: 'm2', text: 'Film marathon: Classic mystery thriller weekend', completed: true },
      { id: 'm3', text: 'Analyze lighting and framing in Blade Runner 2049', completed: false },
      { id: 'm4', text: 'Explore Japanese Studio Ghibli animation series', completed: false },
    ],
    highlights: [
      'Watched Interstellar in IMAX 70mm re-release with mesmerizing audio.',
      'Curated an ultimate Top 25 Mind-Bending Sci-Fi Films list.',
      'Organized a cozy Friday night cinema projection gathering with friends.',
    ],
  },
  {
    id: 'song',
    name: 'Songs & Music',
    category: 'Audio & Rhythm',
    tag: 'Acoustic & Beats',
    icon: '🎵',
    color: '#8b5cf6', // Electric Purple
    accent: '#a78bfa',
    badge: 'Melody & Harmony',
    description: 'Vibrating with rhythm: acoustic guitar chords, exploring diverse global genres, vocal harmonies, and beat curation.',
    weeklyGoalMinutes: 210,
    loggedMinutes: 195,
    streakDays: 7,
    stats: [
      { label: 'Tracks Streamed', value: '254' },
      { label: 'Instruments', value: 'Guitar & Keys' },
      { label: 'Fav Genre', value: 'Lo-Fi / Rock' },
      { label: 'BPM Preference', value: '115 - 128' },
    ],
    skills: [
      { name: 'Acoustic Guitar Fingerpicking', level: 82 },
      { name: 'Ear Training & Pitch Identification', level: 78 },
      { name: 'Rhythm, Tempo & Beat Counting', level: 88 },
      { name: 'Playlist Curation & Vibe Matching', level: 95 },
    ],
    drills: [
      { id: 's1', text: 'Practice 20 minutes of chord transitions (Am-F-C-G)', completed: true },
      { id: 's2', text: 'Learn intro riff of "Hotel California" by ear', completed: true },
      { id: 's3', text: 'Vocal warmups and scale arpeggios on virtual piano', completed: false },
      { id: 's4', text: 'Build a 30-track late night chill beats playlist', completed: false },
    ],
    highlights: [
      'Mastered the fingerstyle acoustic arrangement for an acoustic classic.',
      'Logged 7 consecutive days of rhythm training and musical exploration.',
      'Discovered 14 new indie artists across neo-soul and acoustic folk genres.',
    ],
  },
];

export const INITIAL_WATCHLIST = [
  { id: 1, title: 'Interstellar', genre: 'Sci-Fi / Adventure', year: 2014, rating: 5, status: 'Watched', notes: 'Masterpiece of Hans Zimmer score and emotional spacetime journey.' },
  { id: 2, title: 'Inception', genre: 'Sci-Fi / Heist', year: 2010, rating: 5, status: 'Watched', notes: 'Brilliant multi-layered dream architecture and pacing.' },
  { id: 3, title: 'Spirited Away', genre: 'Animation / Fantasy', year: 2001, rating: 5, status: 'Watched', notes: 'Visual poetry and breathtaking Miyazaki imagination.' },
  { id: 4, title: 'Dune: Part Two', genre: 'Sci-Fi / Epic', year: 2024, rating: 5, status: 'Watched', notes: 'Epic scale cinematography and sound design perfection.' },
  { id: 5, title: 'Whiplash', genre: 'Drama / Music', year: 2014, rating: 5, status: 'Watched', notes: 'Electrifying intensity about passion, jazz drums, and obsession.' },
  { id: 6, title: 'The Dark Knight', genre: 'Action / Crime', year: 2008, rating: 5, status: 'Watched', notes: 'Heath Ledger Joker remains the ultimate cinematic performance.' },
];

export const MOVIE_ROULETTE_DATABASE = [
  { title: 'Interstellar', mood: 'Mind-Bending', genre: 'Sci-Fi / Drama', director: 'Christopher Nolan', year: 2014, desc: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival.' },
  { title: 'Spider-Man: Into the Spider-Verse', mood: 'Visual Wonder', genre: 'Animation / Action', director: 'Bob Persichetti, Peter Ramsey', year: 2018, desc: 'Teen Miles Morales becomes the new Spider-Man and joins other Spider-Heroes from alternate universes.' },
  { title: 'Knives Out', mood: 'Whodunnit Mystery', genre: 'Mystery / Comedy', director: 'Rian Johnson', year: 2019, desc: 'A detective investigates the death of the patriarch of an eccentric, combative family.' },
  { title: 'Everything Everywhere All at Once', mood: 'Mind-Bending', genre: 'Sci-Fi / Action / Comedy', director: 'The Daniels', year: 2022, desc: 'A middle-aged Chinese immigrant gets swept up in an insane adventure across the multiverse.' },
  { title: 'Lagaan: Once Upon a Time in India', mood: 'Epic Sports Drama', genre: 'Sports / Drama', director: 'Ashutosh Gowariker', year: 2001, desc: 'Villagers in Victorian India bet their future on a game of cricket against ruthless British officers.' },
  { title: 'Goal! The Dream Begins', mood: 'Sports Inspirational', genre: 'Drama / Sports', director: 'Danny Cannon', year: 2005, desc: 'A talented young footballer gets his shot at European stardom at Newcastle United.' },
  { title: 'La La Land', mood: 'Heartwarming Musical', genre: 'Musical / Romance', director: 'Damien Chazelle', year: 2016, desc: 'While navigating their careers in Los Angeles, a pianist and an actress fall in love while chasing their dreams.' },
  { title: 'The Grand Budapest Hotel', mood: 'Aesthetic & Quirky', genre: 'Comedy / Adventure', director: 'Wes Anderson', year: 2014, desc: 'A legendary concierge at a famous European resort and his lobby boy become trusted friends amidst a theft.' },
];

export const SAMPLE_PLAYLISTS = [
  { id: 'pl1', title: 'Sunset Acoustic Chill', genre: 'Acoustic / Lo-Fi', bpm: 84, vibe: 'Warm & Relaxing', trackCount: 24 },
  { id: 'pl2', title: 'Stadium Anthems & Power Riffs', genre: 'Rock & Energy', bpm: 132, vibe: 'High Adrenaline', trackCount: 18 },
  { id: 'pl3', title: 'Cyberpunk Neon Beats', genre: 'Synthwave / Electronic', bpm: 120, vibe: 'Night Drive Glow', trackCount: 30 },
  { id: 'pl4', title: 'Coffeehouse Jazz & Piano', genre: 'Jazz / Classical', bpm: 90, vibe: 'Deep Focus Flow', trackCount: 22 },
];
