CREATE TABLE questions (
  _id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category text NOT NULL,
  question text NOT NULL UNIQUE
);

CREATE TABLE questionnaires (
  _id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  category text,
  total_score float NOT NULL DEFAULT 0
);

CREATE TABLE answers (
  _id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  questionnaire_id integer REFERENCES questionnaires (_id) ON DELETE CASCADE,
  question_id integer REFERENCES questions (_id) ON DELETE CASCADE,
  score float NOT NULL
);

CREATE TABLE recommendations (
  _id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category text NOT NULL,
  protocol_step integer,
  overview text UNIQUE,
  details text UNIQUE
);

INSERT INTO questions (category, question) VALUES ('A', 'A feeling you''re constantly racing from one task to the next?');
INSERT INTO questions (category, question) VALUES ('A', 'Feeling wired yet tired?');
INSERT INTO questions (category, question) VALUES ('A', 'A struggle coming down before bedtime, or a second wind that keeps you up late?');
INSERT INTO questions (category, question) VALUES ('A', 'Difficulty falling asleep or disrupted sleep?');
INSERT INTO questions (category, question) VALUES ('A', 'A feeling of anxiety or nervousness - can''t stop worrying about things beyond your control?');
INSERT INTO questions (category, question) VALUES ('A', 'A quickness to feel anger or rage - frequent screaming or yelling?');
INSERT INTO questions (category, question) VALUES ('A', 'Memory lapses or feeling distracted, especially under duress?');
INSERT INTO questions (category, question) VALUES ('A', 'Sugar cravings (you need "a little something" after each meal, usually of the chocolate variety?');
INSERT INTO questions (category, question) VALUES ('A', 'Increase abdominal circumference, greater than 35 inches (the dreaded abdominal fat, or muffin top - not bloating)?');
INSERT INTO questions (category, question) VALUES ('A', 'Skin conditions such as eczema or thin skin (sometimes physiologically and psychologically)?');
INSERT INTO questions (category, question) VALUES ('A', 'Bone loss (perhaps your doctor uses scarier terms, such as osteopenia or osteoporosis)?');
INSERT INTO questions (category, question) VALUES ('A', 'High blood pressure or rapid heartbeat unrelated to those cute red shoes in the store window?');
INSERT INTO questions (category, question) VALUES ('A', 'High blood sugar (maybe your clinician has mentioned the words prediabetes or even diabetes or insulin resistance)? Shakiness between meals, also known as blood sugar instability?');
INSERT INTO questions (category, question) VALUES ('A', 'Indigestion, ulcers, or GERD (gastroesophageal reflux disease)?');
INSERT INTO questions (category, question) VALUES ('A', 'More difficulty recovering from physical injury than in the past?');
INSERT INTO questions (category, question) VALUES ('A', 'Unexplained pink to purple stretch marks on your belly or back?');
INSERT INTO questions (category, question) VALUES ('A', 'Irregular menstrual cycles?');
INSERT INTO questions (category, question) VALUES ('A', 'Decreased fertility?');
INSERT INTO questions (category, question) VALUES ('B', 'Fatigue or burnout (you use caffeine to bolster your energy, or fall asleep while reading or watching a movie)?');
INSERT INTO questions (category, question) VALUES ('B', 'Loss of stamina, particularly in the afternoon, from two to five?');
INSERT INTO questions (category, question) VALUES ('B', 'An atypical addiction to a negative point of view?');
INSERT INTO questions (category, question) VALUES ('B', 'Crying jags for no particular reason?');
INSERT INTO questions (category, question) VALUES ('B', 'Decreased problem-solving ability?');
INSERT INTO questions (category, question) VALUES ('B', 'Feeling stressed most of the time (everything seems harder than before, and you have trouble copying)? Decreased stress tolerance?');
INSERT INTO questions (category, question) VALUES ('B', 'Insomnia or difficulty staying asleep, especially between one and four in the morning?');
INSERT INTO questions (category, question) VALUES ('B', 'Low blood pressure (not always a good thing, since your blood pressure determines the correct amount of oxygen to send through your body, especially into your brain)?');
INSERT INTO questions (category, question) VALUES ('B', 'Postural hypotension (you stand up from lying down and feel dizzy)?');
INSERT INTO questions (category, question) VALUES ('B', 'Difficulty fighting infection (you catch every virus you meet, particularly respiratory)? Difficulty recovering from illness or surgery or healing wounds?');
INSERT INTO questions (category, question) VALUES ('B', 'Asthma? Bronchitis? Chronic cough? Allergies?');
INSERT INTO questions (category, question) VALUES ('B', 'Low or unstable blood sugar?');
INSERT INTO questions (category, question) VALUES ('B', 'Salt cravings?');
INSERT INTO questions (category, question) VALUES ('B', 'Excess sweating?');
INSERT INTO questions (category, question) VALUES ('B', 'Nausea, vomiting, or diarrhea? Or loose stool alternating with constipation?');
INSERT INTO questions (category, question) VALUES ('B', 'Muscle weakness, especially around the knee? Muscle or joint pain?');
INSERT INTO questions (category, question) VALUES ('B', 'Hemorrhoids or varicose veins?');
INSERT INTO questions (category, question) VALUES ('B', 'Your blood seems to pool easily, or your skin bruises easily?');
INSERT INTO questions (category, question) VALUES ('B', 'A thyroid problem that''s been treated, you feel better, and suddenly you feel palpitations or have rapid or irregular hearbeats (a sign of a low cortisol/low thyroid combo)?');

INSERT INTO recommendations (category, protocol_step, overview, details) VALUES ('A', 1, 'Eat dark chocolate', 'The study showed, dark chocolate 40g per day for 2 weeks lowered cortisol levels.');
INSERT INTO recommendations (category, protocol_step, overview, details) VALUES ('A', 1, 'Limit alcohol', 'Alcohol raises cortisol, and the effect persists for longer than 24h for women. Avoid alcohol, or at least keep consumption to less than 3 glasses per week.');
INSERT INTO recommendations (category, protocol_step, overview, details) VALUES ('A', 1, 'Wean from caffeine', 'Caffeine directly induces higher production of cortisol. Avoid caffeine, or limit to the smallest dose of caffeine that supports your productivity.');
INSERT INTO recommendations (category, protocol_step, overview, details) VALUES ('A', 1, 'Get a massage', 'Study showed, 45-min session of deep tissue massage lowered cortisol and raised oxytocin. Repeat once a week to once to month');
INSERT INTO recommendations (category, protocol_step, overview, details) VALUES ('A', 1, 'Chanting daily', 'This form of meditation deactivates the vigilance centers of the brain, lowering cortisol.');
INSERT INTO recommendations (category, protocol_step, overview, details) VALUES ('A', 1, 'Have an orgasm', 'Within 60sec of orgasm, oxytocin, the hormone of love and bonding, floods your system. Oxytocin lowers cortisol.');
INSERT INTO recommendations (category, protocol_step, overview, details) VALUES ('A', 1, 'Vitamin B5', 'Take 500mg per day of Pantethine (B5).');
INSERT INTO recommendations (category, protocol_step, overview, details) VALUES ('A', 1, 'Vitamin C', 'Exercise that pushes you to maximum capacity, raises cortisol. Vitamin C at a dose of 1,500 mg per day has been shown to lower postrace cortisol in ultramarathoners. Note: in some people, this dose can cause loose stool.');
INSERT INTO recommendations (category, protocol_step, overview, details) VALUES ('A', 1, 'Phosphatidylserine (PS)', 'This supplement is an extract from the membrane of a cell, and has been shown to reduce cortisol levels. The optimal dose is 400-800 mg per day.');
INSERT INTO recommendations (category, protocol_step, overview, details) VALUES ('A', 1, 'Fish oil', 'Men and women who took 4,000 mg (4 grams) of fish oil a day for 6 weeks lowered morning cortisol to healthier levels and increased lean body mass. Choose a form of fish oil that has been third-party tested and free of mercury and other endocrine disruptors.');
INSERT INTO recommendations (category, protocol_step, overview, details) VALUES ('A', 1, 'L-theanine', 'A component of green tea, the amino acid L-theanine is thought to reduce stress without causing sedation. Dosage is 250-400 mg per day.');
INSERT INTO recommendations (category, protocol_step, overview, details) VALUES ('A', 1, 'L-lysine combined with L-arginine', 'Studies showed, taking 2.64 grams each of amino acids L-lysine and L-arginine for 1 week showed that the combo reduces salivary cortisol and anxiety.');
INSERT INTO recommendations (category, protocol_step, overview, details) VALUES ('A', 1, 'L-tyrosine', 'This amino acid at 1,000 mg per day has been shown to improve response to stress and improve working memory in a multitask environment. Take a dose on an empty stomach, first thing in the morning and/or before lunch. Taken later, it may interfere with sleep.');
INSERT INTO recommendations (category, protocol_step, overview, details) VALUES ('B', 1, 'Get some exercise', 'Active sports like African dance raise cortisol and mood. Exercise for 1h twice a week.');
INSERT INTO recommendations (category, protocol_step, overview, details) VALUES ('B', 1, 'Develop a modular mind-set', 'Take a problem and, rather than trying to solve the whole thing at once, break it down into component parts. The idea is to prevent stress and stop further depletion of your adrenal glands, which in turn leads to low cortisol.');
INSERT INTO recommendations (category, protocol_step, overview, details) VALUES ('B', 1, 'Vitamins C and B', 'Study showed that combination of vitamin C and vitamins B1 and B6 restored cortisol production and diurnal rhythm. Take vitamin C at 600-1,000 mg per day, plus a good vitamin B complex.');