export const projects = [
  {
    slug: "mindspace",
    title: "MindSpace - Student Wellness Application",
    period: ["Jul 2026", "Aug 2026"],
    role: "Developer",
    screenType: "mobile",
    description: "MindSpace is a mobile application designed to support university students' mental well-being through mood and stress tracking, AI-assisted guidance, wellness resources, and counselor services. Students can record daily check-ins, review their mood history, chat anonymously with counselors, and book appointments.",
    details: "Built with React Native and Expo, the application uses Firebase Authentication for registration and login, Cloud Firestore for application data and real-time chat, and Firebase Cloud Functions for server-side operations and AI requests. It includes an AI wellness chatbot, optional facial-emotion analysis through Hugging Face, and role-based access for students, counselors, and administrators.",
    features: "Mood and stress tracking · AI wellness chatbot · Optional facial-emotion analysis · Personalized wellness resources · Counselor chat · Appointment booking · Role-based access",
    note: "MindSpace provides general wellness support and does not replace professional diagnosis or treatment.",
    mark: "MS",
    accent: "from-[#595783] to-[#7773A3]",
    imageUrls: [
      "https://res.cloudinary.com/dgpiqnweu/image/upload/v1788976231/1.0.png",
      "https://res.cloudinary.com/dgpiqnweu/image/upload/v1788976231/3.png",
      "https://res.cloudinary.com/dgpiqnweu/image/upload/v1788976231/4.png",
      "https://res.cloudinary.com/dgpiqnweu/image/upload/v1788976232/9.png",
    ],
    extraImageUrls: [
      "/images/mindspace-architecture-1920x1440.png",
      "/images/mindspace-ai-workflow-1920x1440.png",
    ],
    technologies: ["React Native", "Expo", "TypeScript", "Tailwind CSS", "Firebase Auth", "Cloud Firestore", "Cloud Functions", "Hugging Face"],
    url: "https://github.com/DHARAKA-METH/Mind-Space",
    linkLabel: "View on GitHub",
  },
  // {
  //   slug: "jesa-2026",
  //   title: "J'pura Employability Skills Awards: JESA 2026",
  //   period: ["Jun 2026", "Jul 2026"],
  //   role: "Web Developer",
  //   screenType: "desktop",
  //   description: "Revamped and developed the JESA 2026 Award Registration Application by redesigning the registration workflow, identifying key application fields, implementing form validation with Zod, and integrating Firebase for data storage. Added automated email notifications using Resend and an admin dashboard to manage and monitor applications. Enhanced data accuracy, streamlined the user experience, and improved the efficiency of the award application process.",
  //   mark: "J6",
  //   accent: "from-[#C2410C] to-[#F97316]",
  //   imageUrls: [
  //     "https://res.cloudinary.com/dgpiqnweu/image/upload/v1788977110/jesaaaa.jpg",
  //     "https://res.cloudinary.com/dgpiqnweu/image/upload/v1788976989/ss3.jpg",
  //   ],
  //   extraImageUrls: [],
  //   technologies: ["Next.js", "TypeScript", "Firebase", "Zod", "Teamwork"],
  //   url: "https://jesa.lk",
  //   linkLabel: "Visit jesa.lk",
  // },
   {
    slug: "kazu",
    title: "Kazu - IoT Pet Tracking System",
    period: ["Oct 2025", "Dec 2025"],
    role: "Developer",
    screenType: "mobile",
    description: "Kazu combines a GPS-enabled IoT device with a Flutter mobile application to help pet owners monitor their pets' location and status in real time. Users can create an account, register a tracking device under their account, view their pet's location on a map, configure safe zones, and receive alerts.",
    details: "The device publishes location and sensor updates through an MQTT broker and stores tracking data in Firebase Realtime Database. The mobile app subscribes to MQTT messages for live updates and accesses stored data through Firebase. Firebase Authentication manages user accounts, Cloud Firestore stores user profiles and device ownership, and Google Maps SDK displays pet locations and safe zones.",
    features: "Account registration · Device registration and linking · Live location tracking · Pet status monitoring · Safe zones · Map view",
    mark: "KZ",
    accent: "from-[#315B7D] to-[#5188A9]",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80",
    imageUrls: [
      "https://res.cloudinary.com/dgpiqnweu/image/upload/v1788972675/01-sign-in-cropped.png",
      "https://res.cloudinary.com/dgpiqnweu/image/upload/v1788972677/02-dashboard-cropped.png",
      "https://res.cloudinary.com/dgpiqnweu/image/upload/v1788972675/03-pet-details-cropped.png",
      "https://res.cloudinary.com/dgpiqnweu/image/upload/v1788972675/04-safe-zone-cropped.png",
    ],
    extraImageUrls: [
      "/images/kazu-architecture-1920x1440.png",
      "/images/kazu-device-1920x1440.png",
    ],
    technologies: ["Flutter", "Dart", "IoT", "GPS", "Mobile Development", "Arduino", "MQTT"],
    url: "https://github.com/DHARAKA-METH/kazu",
    demoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    linkLabel: "View on GitHub",
  },
  {
    slug: "rescuepaws",
    title: "RescuePaws - Stray Dog Management System",
    period: ["Mar 2026", "Apr 2026"],
    role: "Developer",
    screenType: "desktop",
    description: "RescuePaws is a full-stack application developed as part of my learning journey to explore microservices architecture, Spring Boot, and Docker. It supports stray dog reporting and rescue coordination by allowing users to submit reports with locations and images, browse reported cases, and update their status.",
    details: "Built with Next.js and Java 17, the application separates authentication and dog management into Spring Boot microservices, each with its own MySQL database. Spring Cloud Gateway handles request routing and JWT validation, while Cloudinary stores uploaded images. Docker Compose manages the containerized deployment, and NGINX provides reverse proxying, load balancing, and rate limiting.",
    features: "Registration and login · JWT authentication · Dog reporting · Location and image uploads · Case browsing · Status updates · API rate limiting",
    mark: "RP",
    accent: "from-[#185E5B] to-[#2C8580]",
    imageUrls: [],
    extraImageUrls: ["/images/rescuepaws-architecture-adjusted-1920x1440.png"],
    technologies: ["Spring Boot", "Next.js", "Spring Cloud Gateway", "JWT", "MySQL", "Docker", "NGINX", "Cloudinary"],
    url: "https://github.com/DHARAKA-METH/RescuePaws",
    linkLabel: "View on GitHub",
  },

 
  {
    slug: "subscription-tracker-api",
    title: "Subscription Tracker API",
    period: ["Apr 2025", "May 2026"],
    role: "Backend Developer",
    screenType: "desktop",
    description: "Subscription Management System API that handles real users, real money, and real business logic. This API will authenticate users using JWTs, connect to a MongoDB database, and include models and schemas integrated with ORMs. The architecture will be structured to ensure scalability and seamless communication with the front end.",
    apiEndpoints: [
      {
        title: "Authentication",
        endpoints: [
          { method: "POST", path: "/sign-up", description: "Register a new account." },
          { method: "POST", path: "/sign-in", description: "Sign in to an existing account." },
          { method: "POST", path: "/sign-out", description: "Sign out." },
        ],
      },
      {
        title: "Subscriptions",
        endpoints: [
          { method: "GET", path: "/", description: "Retrieve all subscriptions." },
          { method: "GET", path: "/:id", description: "Retrieve a subscription by ID." },
          { method: "POST", path: "/", description: "Create a subscription." },
          { method: "DELETE", path: "/:id/delete", description: "Delete a subscription." },
          { method: "GET", path: "/user/:id", description: "Retrieve a user's subscriptions." },
          { method: "PUT", path: "/:id/cancel", description: "Cancel a subscription." },
        ],
      },
      {
        title: "Users",
        endpoints: [
          { method: "GET", path: "/", description: "Retrieve all users." },
          { method: "GET", path: "/:id", description: "Retrieve a user by ID." },
        ],
      },
      {
        title: "Reminder Workflow",
        endpoints: [
          { method: "POST", path: "/subscription/reminder", description: "Invoke the subscription reminder workflow." },
        ],
      },
      {
        title: "Planned Endpoints",
        endpoints: [
          { method: "PUT", path: "/:id", description: "Update a subscription." },
          { method: "GET", path: "/upcoming-renewals", description: "List upcoming subscription renewals." },
          { method: "POST", path: "/", description: "Create a user." },
          { method: "PUT", path: "/:id", description: "Update a user." },
          { method: "DELETE", path: "/:id", description: "Delete a user." },
        ],
      },
    ],
    fileStructure: `subscription-tracker-API/
|-- config/
|   |-- arcject.js
|   |-- env.js
|   |-- nodemailer.js
|   \-- upstash.js
|-- controllers/
|   |-- auth.contraller.js
|   |-- subscription.controller.js
|   |-- user.controller.js
|   \-- workflow.controller.js
|-- database/
|   \-- mongodb.js
|-- middlewares/
|   |-- arcjet.middlewares.js
|   |-- auth.middlewares.js
|   \-- error.middlewares.js
|-- models/
|   |-- subscription.model.js
|   |-- tokenBlackList.model.js
|   \-- user.model.js
|-- routes/
|   |-- auth.routes.js
|   |-- subscription.routes.js
|   |-- user.routes.js
|   \-- workflow.routes.js
|-- utils/
|   |-- email-template.js
|   \-- send-email.js
|-- .gitattributes
|-- .gitignore
|-- app.js
|-- package-lock.json
|-- package.json
\-- README.md`,
    mark: "ST",
    accent: "from-[#185E5B] to-[#2C8580]",
    imageUrls: [],
    extraImageUrls: [],
    technologies: ["Node.js", "Express.js", "MongoDB", "JWT", "Arcjet", "Upstash", "Nodemailer"],
    url: "https://github.com/DHARAKA-METH/subscription-tracker-API",
    linkLabel: "View on GitHub",
  },



  // {
  //   slug: "job-zone",
  //   title: "Job Zone",
  //   period: ["Dec 2025", "Jan 2026"],
  //   role: "Backend Developer",
  //   screenType: "desktop",
  //   description: "Contributed backend APIs for registration, authentication, job postings, and applications while maintaining data integrity, secure server-side logic, and reliable application performance.",
  //   apiEndpoints: [
  //     {
  //       title: "Authentication",
  //       endpoints: [
  //         { method: "POST", path: "/sign-up", description: "Register a student or company account." },
  //         { method: "POST", path: "/sign-in", description: "Sign in and receive a JWT." },
  //         { method: "POST", path: "/sign-out", description: "Sign out." },
  //       ],
  //     },
  //     {
  //       title: "Applications",
  //       endpoints: [
  //         { method: "GET", path: "/", description: "Retrieve applications based on the user's role." },
  //         { method: "GET", path: "/company", description: "Retrieve applications for the signed-in company's job postings." },
  //         { method: "GET", path: "/student", description: "Retrieve applications submitted by the signed-in student." },
  //         { method: "PATCH", path: "/company/:id", description: "Update an application's status after verifying company ownership." },
  //         { method: "GET", path: "/company/:applicationID", description: "Retrieve an individual application's details." },
  //       ],
  //     },
  //     {
  //       title: "Company Profile",
  //       endpoints: [
  //         { method: "GET", path: "/profile", description: "Retrieve the company profile." },
  //         { method: "PATCH", path: "/update-profile", description: "Update company profile details." },
  //       ],
  //     },
  //     {
  //       title: "Student Profile",
  //       endpoints: [
  //         { method: "GET", path: "/profile", description: "Retrieve the signed-in student's profile." },
  //         { method: "PATCH", path: "/update-profile", description: "Update student profile details. (Planned)" },
  //       ],
  //     },
  //   ],
  //   mark: "JZ",
  //   accent: "from-[#4B5563] to-[#6B7280]",
  //   imageUrls: [],
  //   extraImageUrls: [],
  //   technologies: ["Node.js", "Express.js", "REST APIs", "Authentication", "Database Design"],
  //   url: "https://github.com/CHATHURAsangeeth/job-zone",
  //   linkLabel: "View on GitHub",
  // },
  // {
  //   slug: "smart-tourist-platform",
  //   title: "SmartTouristPlatform",
  //   period: ["Jun  2026", "Jun  2026"],
  //   role: "Backend Developer",
  //   screenType: "desktop",
  //   description: "Contributed to the backend development of the Smart Tourist Platform using Spring Boot and a microservices architecture, with Nginx as an API gateway and JWT-based authentication. The platform connects tourists with verified tour guides and hotels, simplifies travel planning, and prevents booking conflicts.",
  //   mark: "RP",
  //   accent: "from-[#185E5B] to-[#2C8580]",
  //   imageUrls: [],
  //   extraImageUrls: [],
  //   technologies: ["Spring Boot", "Microservices", "MongoDB", "JWT", "NGINX"],
  //   url: "https://github.com/DHARAKA-METH/smart-tourist-platform/tree/develop/backend",
  //   linkLabel: "View on GitHub",
  // },

  // {
  //   slug: "hospital-management-system",
  //   title: "Mini Funtional Hospital Management System",
  //   period: ["Apr 2025", "May 2026"],
  //   role: "Developer",
  //   screenType: "desktop",
  //   description: "Build a modern and user-friendly Hospital Management System built using C# and MySQL, designed to simplify hospital operations. This application helps manage patients, doctors, appointments, and billing with a beautiful and WPF-based admin dashboard.",
  //   mark: "ST",
  //   accent: "from-[#185E5B] to-[#2C8580]",
  //   imageUrls: [],
  //   extraImageUrls: [],
  //   technologies: ["C#", "SQL"],
  //   url: "https://github.com/DHARAKA-METH/Project-black-bird.git",
  //   linkLabel: "View on GitHub",
  // },

];
