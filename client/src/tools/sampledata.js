export const posts = [
  {
    id: 1,
    title: "Lowkey Drowning in Deadlines",
    text: "Okay, real talk—does anyone else feel like they're barely surviving this semester? Like, everyone's out here submitting stuff on time, acing quizzes, and I'm just trying to remember what day it is. 💀 If you've got tips for dealing with the chaos (or just wanna rant too), drop it here. No judgment, just vibes. We're all in this mess together, right? 😅",
    breadcrumbs: [
      { title: "UPD", link: "/college/upd" },
      { title: "Acads", link: "/" },
    ],
    subtopic: {
      id: "acads",
    },
    likesCount: 10,
    commentsCount: 100,
    dateCreated: "2024-11-07T00:00:00Z",
    author: {
      username: "meshuser1",
      college: {
        id: "upd",
      },
    },
    comments: [
      {
        id: 1,
        author: "User1",
        content: "This is a top-level comment.",
        dateCreated: "2024-11-07T00:00:00Z",
        likes: 5,
        replies: [
          {
            id: 2,
            author: "User2",
            content: "This is the first reply to the top-level comment.",
            dateCreated: "2024-11-07T00:00:00Z",
            likes: 3,
            replies: [],
          },
          {
            id: 3,
            author: "User3",
            content: "This is the second reply to the top-level comment.",
            dateCreated: "2024-11-07T00:00:00Z",
            likes: 2,
            replies: [],
          },
          {
            id: 4,
            author: "User4",
            content: "This is the third reply to the top-level comment.",
            dateCreated: "2024-11-07T00:00:00Z",
            likes: 1,
            replies: [],
          },
          {
            id: 5,
            author: "User5",
            content:
              "This is the fourth reply to the top-level comment. Initially hidden under 'Show More'.",
            dateCreated: "2024-11-07T00:00:00Z",
            likes: 0,
            replies: [],
          },
          {
            id: 6,
            author: "User6",
            content:
              "This is the fifth reply to the top-level comment. Initially hidden under 'Show More'.",
            dateCreated: "2024-11-07T00:00:00Z",
            likes: 4,
            replies: [],
          },
          {
            id: 7,
            author: "User7",
            content:
              "This is the sixth reply to the top-level comment. Initially hidden under 'Show More'.",
            dateCreated: "2024-11-07T00:00:00Z",
            likes: 2,
            replies: [],
          },
        ],
      },
      {
        id: 8,
        author: "User8",
        content: "This is another top-level comment with no replies.",
        dateCreated: "2024-11-07T00:00:00Z",
        likes: 2,
        replies: [],
      },
    ],
  },
  {
    id: 2,
    title: "Prof Ko, Stand-Up Comedian?",
    text: "Grabe si Sir/Ma’am kanina, akala mo open mic sa klase! 🤣 Yung banat niya: ‘Kapag late ka na nga, wag ka na magdala ng kape, di mo na kelangan ng props!’ ☕😂 Ano yung pinaka-memorable o nakakatawang hirit ng prof niyo? Spill the tea! (Safe space ‘to, promise. 😏)",
    breadcrumbs: [
      { title: "DLSU", link: "/college/dlsu" },
      { title: "Funny", link: "/" },
    ],
    subtopic: {
      id: "funny",
    },
    likesCount: 10,
    commentsCount: 100,
    hasImage: true,
    author: {
      username: "meshman333",
      college: {
        id: "dlsu",
      },
    },
    image: "https://picsum.photos/500/800",
    dateCreated: "2024-11-07T06:00:00Z",
  },
  {
    id: 3,
    title: "My Post C",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed diam sit amet velit vulputate hendrerit eget sed lacus. Curabitur dapibus consequat vestibulum. Donec ullamcorper eros ut justo pellentesque, id scelerisque quam aliquam. Ut sit amet felis sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris porta risus nisi, vel porta arcu suscipit in. Vivamus nec sapien a erat pretium tristique quis in ante. Etiam ut nunc a sapien hendrerit mollis. Etiam ultricies placerat neque. Quisque eleifend volutpat feugiat. Duis blandit est ut varius efficitur. Phasellus at imperdiet quam, quis euismod magna. Nunc mattis finibus turpis, vel condimentum metus imperdiet eu.",
    breadcrumbs: [{ title: "Breadcrumb A", link: "/" }],
    likesCount: 10,
    commentsCount: 100,
    dateCreated: "2024-11-07T04:00:00Z",
    isBlurred: true,
  },
  {
    id: 4,
    title: "My Post D",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed diam sit amet velit vulputate hendrerit eget sed lacus. Curabitur dapibus consequat vestibulum. Donec ullamcorper eros ut justo pellentesque, id scelerisque quam aliquam. Ut sit amet felis sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris porta risus nisi, vel porta arcu suscipit in. Vivamus nec sapien a erat pretium tristique quis in ante. Etiam ut nunc a sapien hendrerit mollis. Etiam ultricies placerat neque. Quisque eleifend volutpat feugiat. Duis blandit est ut varius efficitur. Phasellus at imperdiet quam, quis euismod magna. Nunc mattis finibus turpis, vel condimentum metus imperdiet eu.",
    breadcrumbs: [
      { title: "Breadcrumb A", link: "/" },
      { title: "Breadcrumb B", link: "/" },
    ],
    likesCount: 10,
    commentsCount: 100,
    hasImage: true,
    image: "https://picsum.photos/1100/600",
    dateCreated: "2024-11-07T00:00:00Z",
    isBlurred: true,
  },
  {
    id: 5,
    title: "My Post E",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed diam sit amet velit vulputate hendrerit eget sed lacus. Curabitur dapibus consequat vestibulum. Donec ullamcorper eros ut justo pellentesque, id scelerisque quam aliquam. Ut sit amet felis sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris porta risus nisi, vel porta arcu suscipit in. Vivamus nec sapien a erat pretium tristique quis in ante. Etiam ut nunc a sapien hendrerit mollis. Etiam ultricies placerat neque. Quisque eleifend volutpat feugiat. Duis blandit est ut varius efficitur. Phasellus at imperdiet quam, quis euismod magna. Nunc mattis finibus turpis, vel condimentum metus imperdiet eu.",
    breadcrumbs: [
      { title: "Breadcrumb A", link: "/" },
      { title: "Breadcrumb B", link: "/" },
      { title: "Breadcrumb C", link: "/" },
    ],
    likesCount: 10,
    commentsCount: 100,
    dateCreated: "2024-11-07T00:00:00Z",
  },
];

export const COURSE_GROUPS = [
  {
    id: 1,
    icon: "https://em-content.zobj.net/source/apple/391/closed-book_1f4d5.png",
    name: "Agriculture",
    description:
      "A field focusing on farming, crop science, livestock management, and sustainable agricultural practices.",
    followers: 1000,
  },
  {
    id: 2,
    icon: "https://em-content.zobj.net/source/apple/391/closed-book_1f4d5.png",
    name: "Architecture and Design",
    description:
      "A discipline that combines art and engineering to create functional, aesthetic, and innovative structures and spaces.",
    followers: 1000,
  },
  {
    id: 3,
    icon: "https://em-content.zobj.net/source/apple/391/closed-book_1f4d5.png",
    name: "Business",
    description:
      "A broad area covering entrepreneurship, management, finance, marketing, and organizational strategy.",
    followers: 1000,
  },
  {
    id: 4,
    icon: "https://em-content.zobj.net/source/apple/391/closed-book_1f4d5.png",
    name: "Education",
    description:
      "A field centered on teaching, curriculum development, educational psychology, and training future educators.",
    followers: 1000,
  },
  {
    id: 5,
    icon: "https://em-content.zobj.net/source/apple/391/closed-book_1f4d5.png",
    name: "Engineering",
    description:
      "A technical domain that applies science and mathematics to design and build machines, systems, and structures.",
    followers: 1000,
  },
  {
    id: 6,
    icon: "https://em-content.zobj.net/source/apple/391/closed-book_1f4d5.png",
    name: "Formal Sciences",
    description:
      "An abstract field that includes mathematics, logic, statistics, and computer science as foundational disciplines.",
    followers: 1000,
  },
  {
    id: 7,
    icon: "https://em-content.zobj.net/source/apple/391/closed-book_1f4d5.png",
    name: "Health Sciences",
    description:
      "A multidisciplinary area encompassing medicine, nursing, pharmacy, public health, and clinical research.",
    followers: 1000,
  },
  {
    id: 8,
    icon: "https://em-content.zobj.net/source/apple/391/closed-book_1f4d5.png",
    name: "Humanities",
    description:
      "A diverse field exploring human culture, history, language, literature, and philosophical thought.",
    followers: 1000,
  },
  {
    id: 9,
    icon: "https://em-content.zobj.net/source/apple/391/closed-book_1f4d5.png",
    name: "Media and Communication",
    description:
      "A domain focused on journalism, public relations, broadcasting, and the creation of media content.",
    followers: 1000,
  },
  {
    id: 10,
    icon: "https://em-content.zobj.net/source/apple/391/closed-book_1f4d5.png",
    name: "Natural Sciences",
    description:
      "A branch of science dealing with the study of the physical world, including biology, chemistry, and physics.",
    followers: 1000,
  },
  {
    id: 11,
    icon: "https://em-content.zobj.net/source/apple/391/closed-book_1f4d5.png",
    name: "Nutrition",
    description:
      "A specialized area examining diet, food science, and the role of nutrition in health and disease prevention.",
    followers: 1000,
  },
  {
    id: 12,
    icon: "https://em-content.zobj.net/source/apple/391/closed-book_1f4d5.png",
    name: "Public Administration",
    description:
      "A field focused on governance, public policy, and administrative practices in the public sector.",
    followers: 1000,
  },
  {
    id: 13,
    icon: "https://em-content.zobj.net/source/apple/391/closed-book_1f4d5.png",
    name: "Social Sciences",
    description:
      "An area studying human behavior, societies, and interactions through fields like sociology, psychology, and anthropology.",
    followers: 1000,
  },
  {
    id: 14,
    icon: "https://em-content.zobj.net/source/apple/391/closed-book_1f4d5.png",
    name: "Transportation",
    description:
      "A discipline covering transportation systems, logistics, and the planning of efficient movement for goods and people.",
    followers: 1000,
  },
];

export const COLLEGES = [
  {
    id: "admu",
    name: "ADMU",
    meshers: 2000,
    followers: 4000,
    color: "#003a6c",
    aboutText:
      "Ateneo de Manila University, established in 1859, is one of the Philippines' leading private educational institutions. Rooted in Jesuit tradition, Ateneo is known for its commitment to academic excellence, social justice, and the holistic development of its students. Located in Quezon City, Ateneo offers a wide range of programs from basic education to graduate studies. Its vibrant campus fosters a strong sense of community and a culture of service.",
    mainCampus:
      "Ateneo de Manila University, Katipunan Avenue, Loyola Heights, Quezon City, 1108 Metro Manila, Philippines",
    telephone: "+63 2 8426-6001",
    email: "info@ateneo.edu",
    website: "https://www.ateneo.edu",
  },

  {
    id: "dlsu",
    name: "DLSU",
    meshers: 2000,
    followers: 4000,
    color: "#00703c",
    aboutText:
      "De La Salle University (DLSU), founded in 1911, is a top-ranked private Catholic university in the Philippines. Guided by the Lasallian tradition of faith, service, and community, DLSU is committed to providing transformative education and innovative research. The university’s flagship campus is situated in Manila, offering a wide array of undergraduate and graduate programs across various disciplines.",
    mainCampus:
      "De La Salle University, 2401 Taft Avenue, Malate, Manila, 1004 Metro Manila, Philippines",
    telephone: "+63 2 8524-4611",
    email: "info@dlsu.edu.ph",
    website: "https://www.dlsu.edu.ph",
  },

  {
    id: "upd",
    name: "UPD",
    meshers: 2000,
    followers: 4000,
    color: "#7b1113",
    aboutText:
      "The University of the Philippines (UP) is the national university of the Philippines, recognized as the country’s premier institution of higher learning. Established in 1908, UP has a rich tradition of academic excellence and service to the nation. UP consists of a system of eight constituent universities located across the Philippines, with the flagship campus at UP Diliman in Quezon City. As of 2023, UP has over 60,000 students enrolled across its campuses, spanning undergraduate, graduate, and postgraduate programs.",
    mainCampus:
      "University of the Philippines Diliman Quezon Hall, Osmeña Avenue UP Diliman, Quezon City 1101 Metro Manila, Philippines",
    telephone: "+63 2 8981-8500",
    email: "info@up.edu.ph",
    website: "https://up.edu.ph",
  },

  {
    id: "ust",
    name: "UST",
    meshers: 2000,
    followers: 4000,
    color: "#fcbf15",
    aboutText:
      "The University of Santo Tomas (UST), established in 1611, is the oldest existing university in Asia and a prominent institution of higher learning in the Philippines. Renowned for its rich heritage and academic excellence, UST offers a diverse range of programs in the arts, sciences, and professional fields. Located in Manila, its iconic campus blends historical architecture with modern facilities to create a unique learning environment.",
    mainCampus:
      "University of Santo Tomas, España Boulevard, Sampaloc, Manila, 1008 Metro Manila, Philippines",
    telephone: "+63 2 3406-1611",
    email: "info@ust.edu.ph",
    website: "https://www.ust.edu.ph",
  },
];

export const BBPosts = [
  {
    id: 1,
    imageSrc: "https://picsum.photos/300/300",
    text: "Join this super cool and fun org now!",
  },
  {
    id: 2,
    imageSrc: "https://picsum.photos/400/400",
    text: "Bulletin B",
  },
  {
    id: 3,
    imageSrc: "https://picsum.photos/350/350",
    text: "Bulletin C",
  },
  {
    id: 4,
    imageSrc: "https://picsum.photos/450/450",
    text: "Bulletin D",
  },
];

export const THREADLINES = [
  {
    id: 1,
    title: "How can i find parking in UP?",
    imageSrc: "https://picsum.photos/320/320",
    impressions: 100,
  },
  {
    id: 2,
    title: "Pls help me with my schedule",
    imageSrc: "https://picsum.photos/420/320",
    impressions: 100,
  },
  {
    id: 3,
    title: "Does anyone know a good place to buy materials",
    imageSrc: "https://picsum.photos/520/320",
    impressions: 100,
  },
  {
    id: 4,
    title: "I love you D",
    imageSrc: "https://picsum.photos/380/320",
    impressions: 100,
  },
  {
    id: 5,
    title: "Pakyuuuuu",
    imageSrc: "https://picsum.photos/480/320",
    impressions: 100,
  },
];

export const SUBTOPICS = [
  {
    id: "funny",
    name: "Funny",
    description:
      "Bring laughter to campus with your funniest memes, jokes, and stories.",
    icon: "https://em-content.zobj.net/source/apple/391/face-with-tears-of-joy_1f602.png",
    rules: [
      {
        title: "Keep it Humorous",
        description:
          "Posts must aim to be funny, lighthearted, or entertaining. Non-humorous content may be removed.",
      },
      {
        title: "No Offensive Humor",
        description:
          "Jokes or content that promote hate speech, discrimination, or harm against any individual or group are not allowed.",
      },
      {
        title: "No Explicit Content",
        description:
          "Avoid posting content with explicit language, nudity, or graphic violence, as this is a student-friendly space.",
      },
      {
        title: "No Spam or Advertising",
        description:
          "Avoid posting irrelevant content, promotional materials, or clickbait under the guise of humor.",
      },
      {
        title: "No Overposting",
        description:
          "Limit posts to avoid flooding the subtopic. Let everyone have a chance to share their humor.",
      },
    ],
  },
  {
    id: "food",
    name: "Food",
    description:
      "From recipes to restaurant reviews, share everything delicious with fellow foodies.",
    icon: "https://em-content.zobj.net/source/apple/391/fork-and-knife-with-plate_1f37d-fe0f.png",
    rules: [
      {
        title: "Share Food-Related Content",
        description:
          "Posts should be about food, recipes, reviews, or dining experiences. Non-food-related posts will be removed.",
      },
      {
        title: "No Food Shaming",
        description:
          "Respect others' food preferences and choices. Avoid negative comments about personal tastes or cultural dishes.",
      },
      {
        title: "No Spam or Promotions",
        description:
          "Promotional content or ads for restaurants are not allowed unless approved by moderators.",
      },
      {
        title: "Avoid Explicit Content",
        description:
          "Posts should remain appropriate and not include graphic or inappropriate imagery.",
      },
      {
        title: "Original or Credited Content",
        description:
          "Prefer original posts. If sharing food photos or recipes from others, give proper credit.",
      },
    ],
  },
  {
    id: "acads",
    name: "Acads",
    description:
      "A space to share tips, resources, and support for navigating student life.",
    icon: "https://em-content.zobj.net/source/apple/391/books_1f4da.png",
    rules: [
      {
        title: "Stay On Topic",
        description:
          "Posts should focus on academic life, study tips, resources, or discussions related to learning.",
      },
      {
        title: "No Cheating Requests",
        description:
          "Do not post requests for exam answers, assignments, or other dishonest practices.",
      },
      {
        title: "Respect Privacy",
        description:
          "Avoid sharing identifiable information about professors, classmates, or academic staff.",
      },
      {
        title: "Be Supportive",
        description:
          "Encourage constructive and helpful advice. Avoid discouraging or unhelpful comments.",
      },
      {
        title: "No Spam or Irrelevant Posts",
        description:
          "Posts unrelated to academics or student life will be removed.",
      },
    ],
  },
  {
    id: "nsfw",
    name: "NSFW",
    description:
      "Explore mature content respectfully and responsibly, with anonymity.",
    icon: "https://em-content.zobj.net/source/apple/391/no-one-under-eighteen_1f51e.png",
    rules: [
      {
        title: "Mark Content Appropriately",
        description:
          "All posts must be labeled as NSFW and adhere to platform guidelines.",
      },
      {
        title: "Consent is Key",
        description:
          "Ensure all shared content respects privacy and consent. Non-consensual or exploitative content is strictly prohibited.",
      },
      {
        title: "No Illegal Content",
        description:
          "Posts must comply with local laws and community standards. Illegal content will be removed and reported.",
      },
      {
        title: "No Hate Speech or Harassment",
        description:
          "NSFW content must not promote discrimination, harassment, or harm toward any individual or group.",
      },
      {
        title: "Respect Anonymity",
        description:
          "Do not attempt to identify or reveal personal information of others.",
      },
    ],
  },
  {
    id: "opinions",
    name: "Opinions",
    description:
      "Speak your mind, debate, and share your thoughts in a respectful space.",
    icon: "https://em-content.zobj.net/source/apple/391/clown-face_1f921.png",
    rules: [
      {
        title: "Encourage Healthy Debate",
        description:
          "Discussions should remain respectful, even when opinions differ.",
      },
      {
        title: "No Personal Attacks",
        description:
          "Criticize ideas, not individuals. Avoid name-calling or hostility.",
      },
      {
        title: "Stay On Topic",
        description:
          "Posts should be relevant to the subtopic and avoid unrelated tangents.",
      },
      {
        title: "No Hate Speech",
        description:
          "Avoid discriminatory language or opinions that harm or marginalize others.",
      },
      {
        title: "Be Open-Minded",
        description:
          "Respect that others may have different perspectives, even if you disagree.",
      },
    ],
  },
  {
    id: "politics",
    name: "Politics",
    description:
      "Discuss the issues that matter while respecting diverse viewpoints.",
    icon: "https://em-content.zobj.net/source/apple/391/speaking-head_1f5e3-fe0f.png",
    rules: [
      {
        title: "Respect Different Opinions",
        description:
          "Political discussions should be respectful and free of personal attacks.",
      },
      {
        title: "Fact-Check Before Posting",
        description:
          "Ensure shared information is accurate and from reliable sources.",
      },
      {
        title: "No Hate Speech or Incitement",
        description:
          "Avoid posts that promote violence, hate, or discrimination.",
      },
      {
        title: "Stay Relevant",
        description:
          "Posts should relate to political topics that are significant or relevant to the audience.",
      },
      {
        title: "No Spam or Propaganda",
        description:
          "Avoid repetitive posts or content that aims to manipulate or mislead others.",
      },
    ],
  },
  {
    id: "sports",
    name: "Sports",
    description:
      "Cheer, debate, and share your passion for sports and games with fellow fans.",
    icon: "https://em-content.zobj.net/source/apple/391/people-wrestling_1f93c.png",
    rules: [
      {
        title: "Keep It Sports-Related",
        description:
          "Posts should focus on sports, athletes, games, or related events.",
      },
      {
        title: "Respect All Teams and Fans",
        description:
          "Avoid unnecessary trash talk or insults toward teams, players, or fans.",
      },
      {
        title: "No Spoilers Without Warnings",
        description:
          "When discussing recent games, include a spoiler warning if revealing game results.",
      },
      {
        title: "No Spam or Irrelevant Content",
        description:
          "Posts unrelated to sports or overly promotional content are not allowed.",
      },
      {
        title: "Be Inclusive",
        description:
          "Ensure discussions are welcoming to fans of all sports and skill levels.",
      },
    ],
  },
  {
    id: "orgs",
    name: "Orgs",
    description:
      "Highlight campus organization events, achievements, and opportunities for involvement.",
    icon: "https://em-content.zobj.net/source/apple/391/handshake_1f91d.png",
    rules: [
      {
        title: "Focus on Organization Activities",
        description:
          "Posts should highlight events, achievements, or news related to campus organizations.",
      },
      {
        title: "No Unauthorized Promotions",
        description:
          "Promoting unrelated businesses or external organizations is not allowed.",
      },
      {
        title: "Respect All Organizations",
        description:
          "Avoid negative comments or comparisons between campus groups.",
      },
      {
        title: "Stay Relevant",
        description:
          "Content should directly relate to campus or student organizations.",
      },
      {
        title: "Encourage Participation",
        description:
          "Posts should encourage student involvement and showcase positive aspects of organizational life.",
      },
    ],
  },
  {
    id: "confessions",
    name: "Confessions",
    description:
      "Share your secrets, stories, and truths anonymously in a judgment-free zone.",
    icon: "https://em-content.zobj.net/source/apple/391/shushing-face_1f92b.png",
    rules: [
      {
        title: "Respect Anonymity",
        description:
          "Do not reveal or speculate about the identity of the poster or subjects of the confession.",
      },
      {
        title: "No Hate Speech or Harassment",
        description:
          "Confessions must not target individuals or groups in a harmful or hateful way.",
      },
      {
        title: "No Illegal Content",
        description:
          "Avoid confessions that mention illegal activities or encourage others to break the law.",
      },
      {
        title: "Keep it Constructive",
        description:
          "Encourage responses that are supportive or helpful, not judgmental.",
      },
      {
        title: "Stay Within Community Guidelines",
        description:
          "Ensure all posts align with the platform's rules and standards.",
      },
    ],
  },
];
